const progressText = document.getElementById("progress");
const progressBar = document.getElementById("loading-progress");
const loader = document.querySelector(".loader-container");
const hero = document.querySelector(".hero");

let progress = 0;

function updateLoader() {
  progress++;
  progressText.textContent = progress;
  progressBar.style.width = `${progress}%`;

  if (progress >= 100) {
    finishLoading();
    return;
  }

  setTimeout(updateLoader, 30);
}

function finishLoading() {
  setTimeout(() => {
    loader.classList.add("hide");
    document.body.classList.remove("loading");
    document.body.style.overflow = "auto";
  }, 700);
}

window.addEventListener("load", updateLoader);

window.history.scrollRestoration = "manual";
window.scrollTo(0, 0);

if (hero) {
  hero.addEventListener("mousemove", e => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty("--x", `${e.clientX - rect.left}px`);
    hero.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });

  hero.addEventListener("mouseleave", () => {
    hero.style.setProperty("--x", "50%");
    hero.style.setProperty("--y", "50%");
  });
}

let pixelTimer = 0;

document.addEventListener("mousemove", e => {
  const now = Date.now();
  if (now - pixelTimer < 35) return;
  pixelTimer = now;

  const pixel = document.createElement("div");
  pixel.className = "cursor-pixel";

  const size = Math.random() * 14 + 10;
  pixel.style.width = `${size}px`;
  pixel.style.height = `${size}px`;
  pixel.style.left = `${e.clientX}px`;
  pixel.style.top = `${e.clientY}px`;

  document.body.appendChild(pixel);

  setTimeout(() => {
    pixel.remove();
  }, 600);
});

const cursorPosition = document.getElementById("cursor-position");
const pageProgress = document.getElementById("page-progress");
const currentSection = document.getElementById("current-section");
const clock = document.getElementById("clock");

document.addEventListener("mousemove", e => {
  cursorPosition.textContent = `X: ${String(e.clientX).padStart(3, "0")} Y: ${String(e.clientY).padStart(3, "0")}`;
});

function updateProgress() {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  let progress = height > 0 ? scrollTop / height : 0;
  pageProgress.textContent = progress.toFixed(2);
}

window.addEventListener("scroll", updateProgress);

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

setInterval(updateClock, 1000);
updateClock();

const sections = [
  { id: "home", name: "01 Homepage" },
  { id: "about", name: "02 About" },
  { id: "contact", name: "03 Contact" },
  { id: "projects", name: "04 Projects" }
];

function updateSection() {
  let current = "01 Homepage";

  sections.forEach(section => {
    const element = document.getElementById(section.id);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2) {
        current = section.name;
      }
    }
  });

  currentSection.textContent = current;
}

window.addEventListener("scroll", updateSection);
updateSection();

document.addEventListener("DOMContentLoaded", () => {
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  const SCRAMBLE_DURATION = 400;

  // Scramble effect for experience roles
  const roles = document.querySelectorAll(".experience-role");
  roles.forEach(role => {
    const original = role.dataset.text || role.textContent;
    role.dataset.text = original;

    let animating = false;

    role.addEventListener("mouseenter", () => {
      if (animating) return;
      animating = true;

      const length = original.length;
      const startTime = performance.now();

      const scrambleFrame = now => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / SCRAMBLE_DURATION, 1);
        const resolvedCount = Math.floor(progress * length);

        let result = "";

        for (let i = 0; i < length; i++) {
          if (i < resolvedCount) {
            result += original[i];
          } else if (original[i] === " ") {
            result += " ";
          } else {
            const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
            result += randomChar;
          }
        }

        role.textContent = result;

        if (progress < 1) {
          requestAnimationFrame(scrambleFrame);
        } else {
          role.textContent = original;
          animating = false;
        }
      };

      requestAnimationFrame(scrambleFrame);
    });
  });

  // Scramble effect for competency titles
  const competencyTitles = document.querySelectorAll(".competency-title");
  competencyTitles.forEach(title => {
    const original = title.dataset.text || title.textContent;
    title.dataset.text = original;

    let animating = false;

    title.addEventListener("mouseenter", () => {
      if (animating) return;
      animating = true;

      const length = original.length;
      const startTime = performance.now();

      const scrambleFrame = now => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / SCRAMBLE_DURATION, 1);
        const resolvedCount = Math.floor(progress * length);

        let result = "";

        for (let i = 0; i < length; i++) {
          if (i < resolvedCount) {
            result += original[i];
          } else if (original[i] === " ") {
            result += " ";
          } else if (original[i] === "&" || original[i] === "-") {
            result += original[i];
          } else {
            const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
            result += randomChar;
          }
        }

        title.textContent = result;

        if (progress < 1) {
          requestAnimationFrame(scrambleFrame);
        } else {
          title.textContent = original;
          animating = false;
        }
      };

      requestAnimationFrame(scrambleFrame);
    });
  });

  // Scramble effect for contact values
  const contactValues = document.querySelectorAll(".contact-value");
  contactValues.forEach(value => {
    const original = value.dataset.text || value.textContent;
    value.dataset.text = original;

    let animating = false;

    value.addEventListener("mouseenter", () => {
      if (animating) return;
      animating = true;

      const length = original.length;
      const startTime = performance.now();

      const scrambleFrame = now => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / SCRAMBLE_DURATION, 1);
        const resolvedCount = Math.floor(progress * length);

        let result = "";

        for (let i = 0; i < length; i++) {
          if (i < resolvedCount) {
            result += original[i];
          } else if (original[i] === " ") {
            result += " ";
          } else if (original[i] === "@" || original[i] === "." || original[i] === "/" || original[i] === ":" || original[i] === "-" || original[i] === "+" || original[i] === "(" || original[i] === ")") {
            result += original[i];
          } else {
            const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
            result += randomChar;
          }
        }

        value.textContent = result;

        if (progress < 1) {
          requestAnimationFrame(scrambleFrame);
        } else {
          value.textContent = original;
          animating = false;
        }
      };

      requestAnimationFrame(scrambleFrame);
    });
  });
});

// Toggle expand function for arrow buttons - closes previously opened
let activeExpandItem = null;

function toggleExpand(btn) {
  const currentItem = btn.closest('.experience-item');
  const currentContent = currentItem.querySelector('.expand-content');
  const currentArrow = btn.querySelector('.arrow-icon');
  
  if (activeExpandItem && activeExpandItem !== currentItem) {
    const prevContent = activeExpandItem.querySelector('.expand-content');
    const prevArrow = activeExpandItem.querySelector('.arrow-icon');
    
    if (prevContent) {
      prevContent.classList.remove('active');
    }
    if (prevArrow) {
      prevArrow.classList.remove('rotated');
    }
  }
  
  currentContent.classList.toggle('active');
  currentArrow.classList.toggle('rotated');
  
  if (currentContent.classList.contains('active')) {
    activeExpandItem = currentItem;
  } else {
    activeExpandItem = null;
  }
}

// LET'S TALK - Scroll controlled animation
const talkScroll = document.getElementById('talkScroll');
let talkScrollPosition = 0;
let lastScrollY = window.scrollY;
let isTalkSectionVisible = false;

function checkTalkVisibility() {
  const section = document.querySelector('.lets-talk');
  if (!section) return;
  
  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  isTalkSectionVisible = rect.top < windowHeight && rect.bottom > 0;
}

function updateTalkScroll() {
  if (!talkScroll) return;
  
  const currentScrollY = window.scrollY;
  const deltaY = currentScrollY - lastScrollY;
  lastScrollY = currentScrollY;
  
  if (isTalkSectionVisible) {
    talkScrollPosition += deltaY * 0.7;
    
    const scrollWidth = talkScroll.scrollWidth / 2;
    
    if (talkScrollPosition > scrollWidth) {
      talkScrollPosition -= scrollWidth;
    } else if (talkScrollPosition < 0) {
      talkScrollPosition += scrollWidth;
    }
    
    talkScroll.style.transform = `translateX(-${talkScrollPosition}px)`;
  }
}

// SEND ME A MESSAGE - Scroll controlled animation
const sendScroll = document.getElementById('sendScroll');
let sendScrollPosition = 0;
let lastSendScrollY = window.scrollY;
let isSendSectionVisible = false;

function checkSendVisibility() {
  const section = document.querySelector('.send-message');
  if (!section) return;
  
  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  isSendSectionVisible = rect.top < windowHeight && rect.bottom > 0;
}

function updateSendScroll() {
  if (!sendScroll) return;
  
  const currentScrollY = window.scrollY;
  const deltaY = currentScrollY - lastSendScrollY;
  lastSendScrollY = currentScrollY;
  
  if (isSendSectionVisible) {
    sendScrollPosition += deltaY * 0.7;
    
    const scrollWidth = sendScroll.scrollWidth / 2;
    
    if (sendScrollPosition > scrollWidth) {
      sendScrollPosition -= scrollWidth;
    } else if (sendScrollPosition < 0) {
      sendScrollPosition += scrollWidth;
    }
    
    sendScroll.style.transform = `translateX(-${sendScrollPosition}px)`;
  }
}

// Throttled scroll handler
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      checkTalkVisibility();
      updateTalkScroll();
      checkSendVisibility();
      updateSendScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// Initial checks
setTimeout(() => {
  checkTalkVisibility();
  checkSendVisibility();
}, 100);

// ===== FORM HANDLING (No Formspree - Direct Fetch) =====
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // Clear errors on input
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            const errorEl = document.getElementById(this.id + 'Error');
            if (errorEl) errorEl.textContent = '';
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate
        let isValid = true;
        
        if (!nameInput.value.trim()) {
            nameError.textContent = 'Name is required';
            nameInput.style.borderColor = '#ff6b6b';
            isValid = false;
        }
        
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Email is required';
            emailInput.style.borderColor = '#ff6b6b';
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            emailInput.style.borderColor = '#ff6b6b';
            isValid = false;
        }
        
        if (!messageInput.value.trim()) {
            messageError.textContent = 'Message is required';
            messageInput.style.borderColor = '#ff6b6b';
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Show loading
        btnText.textContent = 'Sending';
        btnLoader.style.display = 'block';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(form);
            
            const response = await fetch('https://formspree.io/f/mgojjzkp', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success - keep form entries!
                showCustomAlert('Message sent successfully!', 'success');
                btnText.textContent = 'Send →';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
                // Do NOT reset form - keep entries
            } else {
                const data = await response.json();
                if (data.errors) {
                    showCustomAlert('Error: ' + data.errors.map(e => e.message).join(', '), 'error');
                } else {
                    showCustomAlert('Something went wrong. Please try again.', 'error');
                }
                btnText.textContent = 'Send →';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            }
        } catch (error) {
            showCustomAlert('Network error. Please check your connection.', 'error');
            btnText.textContent = 'Send →';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});

// ===== CUSTOM ALERT SYSTEM =====
const customAlert = document.getElementById('customAlert');
const alertIcon = document.getElementById('alertIcon');
const alertMessage = document.getElementById('alertMessage');

function showCustomAlert(message, type) {
    closeCustomAlert(true);
    
    alertMessage.textContent = message;
    customAlert.className = 'custom-alert show ' + type;
    alertIcon.textContent = type === 'success' ? '✓' : '✕';
    
    if (window.alertTimeout) {
        clearTimeout(window.alertTimeout);
    }
    window.alertTimeout = setTimeout(() => {
        closeCustomAlert();
    }, 5000);
}

function closeCustomAlert(instant = false) {
    if (customAlert.classList.contains('show')) {
        if (instant) {
            customAlert.classList.remove('show', 'success', 'error', 'hiding');
        } else {
            customAlert.classList.add('hiding');
            setTimeout(() => {
                customAlert.classList.remove('show', 'success', 'error', 'hiding');
            }, 300);
        }
    }
    if (window.alertTimeout) {
        clearTimeout(window.alertTimeout);
        window.alertTimeout = null;
    }
}

// Close alert on click outside
document.addEventListener('click', function(e) {
    if (customAlert.classList.contains('show')) {
        if (!customAlert.contains(e.target)) {
            closeCustomAlert();
        }
    }
});
// Back to Top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
// ===== SCROLL ANIMATION SYSTEM (AOS-like) =====
(function() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    if (!animatedElements.length) return;
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,  // Lower threshold for better triggering
        rootMargin: '0px 0px -20px 0px'
    });
    
    // Observe all elements with data-aos
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Also check on load for elements already in view
    function checkVisibleOnLoad() {
        animatedElements.forEach(el => {
            if (!el.classList.contains('aos-animate')) {
                const rect = el.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                if (rect.top < windowHeight - 30) {
                    el.classList.add('aos-animate');
                }
            }
        });
    }
    
    window.addEventListener('load', checkVisibleOnLoad);
    // Also check after a short delay for any layout shifts
    setTimeout(checkVisibleOnLoad, 300);
    
    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            animatedElements.forEach(el => {
                if (!el.classList.contains('aos-animate')) {
                    const rect = el.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    if (rect.top < windowHeight - 30) {
                        el.classList.add('aos-animate');
                    }
                }
            });
        }, 200);
    });
    
    // Force check on scroll
    let scrollTimer;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            animatedElements.forEach(el => {
                if (!el.classList.contains('aos-animate')) {
                    const rect = el.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    if (rect.top < windowHeight - 30) {
                        el.classList.add('aos-animate');
                    }
                }
            });
        }, 100);
    });
})();