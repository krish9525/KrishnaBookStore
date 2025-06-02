import { auth } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const errorMessage = document.getElementById('error-message');

// Book PDFs mapping
const bookPDFs = {
    "Principles of Corporate Finance": {
        readUrl: "principles-of-corporate-finance.pdf",
        downloadUrl: "principles-of-corporate-finance.pdf"
    },
    "Marketing Management": {
        readUrl: "marketing-management.pdf",
        downloadUrl: "marketing-management.pdf"
    },
    "Business Statistics": {
        readUrl: "business-statistics.pdf",
        downloadUrl: "business-statistics.pdf"
    },
    "Financial Accounting": {
        readUrl: "financial-accounting.pdf",
        downloadUrl: "financial-accounting.pdf"
    },
    "The Lean Startup": {
        readUrl: "lean-startup.pdf",
        downloadUrl: "lean-startup.pdf"
    },
    "Good to Great": {
        readUrl: "good-to-great.pdf",
        downloadUrl: "good-to-great.pdf"
    },
    "Principles of management": {
        readUrl: "principles-of-management.pdf",
        downloadUrl: "principles-of-management.pdf"
    },
    "Quality Management": {
        readUrl: "quality-management.pdf",
        downloadUrl: "quality-management.pdf"
    },
    "Constitutional Law": {
        readUrl: "constitutional-law.pdf",
        downloadUrl: "constitutional-law.pdf"
    },
    "Criminal Law": {
        readUrl: "criminal-law.pdf",
        downloadUrl: "criminal-law.pdf"
    },
    "Indian Constitutional Law": {
        readUrl: "indian-constitutional-law.pdf",
        downloadUrl: "indian-constitutional-law.pdf"
    },
    "Administrative Law": {
        readUrl: "administrative-law.pdf",
        downloadUrl: "administrative-law.pdf"
    },
    "Mechanical Engineering": {
        readUrl: "mechanical-engineering.pdf",
        downloadUrl: "mechanical-engineering.pdf"
    },
    "Electrical Engineering": {
        readUrl: "electrical-engineering.pdf",
        downloadUrl: "electrical-engineering.pdf"
    },
    "Mechanical Engineer Design": {
        readUrl: "mechanical-engineer-design.pdf",
        downloadUrl: "mechanical-engineer-design.pdf"
    },
    "Advanced ML": {
        readUrl: "advanced-ml.pdf",
        downloadUrl: "advanced-ml.pdf"
    },
    "Gray's Anatomy": {
        readUrl: "grays-anatomy.pdf",
        downloadUrl: "grays-anatomy.pdf"
    },
    "Robbins Pathology": {
        readUrl: "robbins-pathology.pdf",
        downloadUrl: "robbins-pathology.pdf"
    },
    "Pediatric Nursing": {
        readUrl: "pediatric-nursing.pdf",
        downloadUrl: "pediatric-nursing.pdf"
    },
    "Orthopaedics Essentials": {
        readUrl: "orthopaedics-essentials.pdf",
        downloadUrl: "orthopaedics-essentials.pdf"
    },
    "Physics for Scientists": {
        readUrl: "physics-for-scientists.pdf",
        downloadUrl: "physics-for-scientists.pdf"
    },
    "Organic Chemistry": {
        readUrl: "organic-chemistry.pdf",
        downloadUrl: "organic-chemistry.pdf"
    },
    "Advanced Physics": {
        readUrl: "advanced-physics.pdf",
        downloadUrl: "advanced-physics.pdf"
    },
    "Physical Chemistry": {
        readUrl: "physical-chemistry.pdf",
        downloadUrl: "physical-chemistry.pdf"
    },
    "Advanced Financial Accounting": {
        readUrl: "advanced-financial-accounting.pdf",
        downloadUrl: "advanced-financial-accounting.pdf"
    },
    "Human Resource Management": {
        readUrl: "human-resource-management.pdf",
        downloadUrl: "human-resource-management.pdf"
    },
    "Civil Procedure": {
        readUrl: "civil-procedure.pdf",
        downloadUrl: "civil-procedure.pdf"
    }
};

// Create modal for PDF viewer
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <iframe class="pdf-viewer" src="" frameborder="0"></iframe>
    </div>
`;
document.body.appendChild(modal);

// Close modal when clicking X
const closeModal = modal.querySelector('.close-modal');
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Function to open PDF viewer
function openPDFViewer(pdfUrl) {
    const iframe = modal.querySelector('.pdf-viewer');
    iframe.src = pdfUrl;
    modal.style.display = 'block';
}

// Function to handle download
function downloadPDF(pdfUrl, fileName) {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName || 'book.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Download started!');
}

// Add event listeners to all book cards
document.querySelectorAll('.book-card').forEach(card => {
    const title = card.querySelector('.book-title').textContent;
    
    // Create actions container
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'book-actions';
    
    // Create Read button
    const readBtn = document.createElement('button');
    readBtn.className = 'action-btn read-btn';
    readBtn.textContent = 'Read Book';
    
    // Create Download button
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'action-btn download-btn';
    downloadBtn.textContent = 'Download';
    
    // Check if we have PDF for this book
    if (bookPDFs[title]) {
        readBtn.addEventListener('click', () => {
            openPDFViewer(bookPDFs[title].readUrl);
        });
        
        downloadBtn.addEventListener('click', () => {
            downloadPDF(bookPDFs[title].downloadUrl, `${title}.pdf`);
        });
    } else {
        // If no PDF available, disable buttons and show tooltip
        readBtn.disabled = true;
        downloadBtn.disabled = true;
        readBtn.title = "PDF not available yet";
        downloadBtn.title = "PDF not available yet";
        readBtn.style.opacity = "0.6";
        downloadBtn.style.opacity = "0.6";
    }
    
    // Add buttons to actions container
    actionsDiv.appendChild(readBtn);
    actionsDiv.appendChild(downloadBtn);
    
    // Add actions container to book info
    const bookInfo = card.querySelector('.book-info');
    bookInfo.appendChild(actionsDiv);
});

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        if (window.location.pathname.includes('login.html') || 
            window.location.pathname.includes('signup.html')) {
            window.location.href = 'index.html';
        }
    } else {
        // User is signed out
        if (window.location.pathname.includes('index.html')) {
            window.location.href = 'login.html';
        }
    }
});

// Handle Login
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'index.html';
        } catch (error) {
            showError(error.message);
        }
    });
}

// Handle Signup
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validate passwords match
        if (password !== confirmPassword) {
            showError("Passwords don't match");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            window.location.href = 'index.html';
        } catch (error) {
            showError(error.message);
        }
    });
}

// Handle Logout
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        try {
            await signOut(auth);
            window.location.href = 'login.html';
        } catch (error) {
            showError(error.message);
        }
    });
}

// Utility function to show error messages
function showError(message) {
    if (errorMessage) {
        errorMessage.textContent = message;
        setTimeout(() => {
            errorMessage.textContent = '';
        }, 5000);
    }
}

// Toast notification function
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
} 
