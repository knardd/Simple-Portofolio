// Mobile Navigation Toggle
const burger = document.querySelector(".burger");
const nav = document.querySelector(".navbar ul");

if (burger && nav) {
  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    burger.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".navbar ul a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      burger.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!burger.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove("active");
      burger.classList.remove("active");
    }
  });
}
// Initialize EmailJS with Public Key
emailjs.init("qUx_1mjPbTh9NIERe");

// Form Submission Handler
const contactForm = document.querySelector(".contact-form");
const emailInput = document.getElementById("emailInput");
const emailError = document.getElementById("emailError");

// Validasi email - hanya domain terkenal yang diterima
function validateEmail(email) {
  const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "aol.com",
    "mail.com",
    "protonmail.com",
    "yandex.com",
  ];

  // Split email menjadi name dan domain
  const [name, domain] = email.toLowerCase().split("@");

  // Cek apakah ada name dan domain, serta domain ada di whitelist
  if (!name || !domain) return false;
  if (!allowedDomains.includes(domain)) return false;

  // Cek format name tidak boleh kosong
  return name.length > 0;
}

// Event listener untuk validasi real-time
if (emailInput) {
  emailInput.addEventListener("blur", () => {
    if (emailInput.value && !validateEmail(emailInput.value)) {
      emailInput.classList.add("error");
      emailError.textContent = "Format email tidak valid";
      emailError.style.display = "block";
    } else {
      emailInput.classList.remove("error");
      emailError.style.display = "none";
    }
  });

  emailInput.addEventListener("input", () => {
    emailInput.classList.remove("error");
    emailError.style.display = "none";
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validasi email sebelum kirim
    const email = emailInput.value;
    if (!validateEmail(email)) {
      emailInput.classList.add("error");
      emailError.textContent = "Format email tidak valid";
      emailError.style.display = "block";
      return;
    }

    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    // Loading state
    btn.textContent = "Mengirim...";
    btn.disabled = true;

    // Tambahkan waktu otomatis
    const now = new Date();
    const timeString = now.toLocaleString("id-ID", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Asia/Jakarta",
    });

    // Kirim email dengan tambahan parameter time
    emailjs
      .sendForm("service_dioadp3", "template_onvh1mr", contactForm, {
        time: timeString,
      })
      .then(
        function () {
          alert("Pesan berhasil terkirim! Terima kasih.");
          contactForm.reset();
          emailInput.classList.remove("error");
          emailError.style.display = "none";
          btn.textContent = originalText;
          btn.disabled = false;
        },
        function (error) {
          alert(
            "Gagal mengirim pesan. Silakan coba lagi.\n\nError: " + error.text
          );
          btn.textContent = originalText;
          btn.disabled = false;
        }
      );
  });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll Animation for Elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all portfolio items and doc cards
document.querySelectorAll(".portfolio-item, .doc-card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s, transform 0.6s";
  observer.observe(el);
});

// Add active state to navbar on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  }
});

// Certificate Modal Handler
const certificateModal = document.getElementById("certificateModal");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.getElementById("closeModal");
const modalOverlay = document.getElementById("modalOverlay");

// Open modal when clicking on certificate thumbnail
document.querySelectorAll(".certificate-thumbnail").forEach((img) => {
  img.addEventListener("click", () => {
    const fullSrc = img.getAttribute("data-full-src");
    modalImage.src = fullSrc;
    certificateModal.classList.add("active");
    document.body.classList.add("modal-open");
  });
});

// Close modal when clicking close button
closeBtn.addEventListener("click", () => {
  certificateModal.classList.remove("active");
  document.body.classList.remove("modal-open");
});

// Close modal when clicking on overlay
modalOverlay.addEventListener("click", () => {
  certificateModal.classList.remove("active");
  document.body.classList.remove("modal-open");
});

// Close modal when pressing Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && certificateModal.classList.contains("active")) {
    certificateModal.classList.remove("active");
    document.body.classList.remove("modal-open");
  }
});
