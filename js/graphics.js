// ===== Graphic Design Page Specific JavaScript =====

// ========== SCRAMBLE EFFECT ==========
function applyScrambleEffect(selector) {
    const elements = document.querySelectorAll(selector);
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    const SCRAMBLE_DURATION = 400;

    elements.forEach(el => {
        const original = el.dataset.text || el.textContent;
        el.dataset.text = original;

        let animating = false;

        el.addEventListener("mouseenter", () => {
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
                    } else if (original[i] === "&" || original[i] === "-" || original[i] === "." || original[i] === "'") {
                        result += original[i];
                    } else {
                        result += CHARS[Math.floor(Math.random() * CHARS.length)];
                    }
                }
                el.textContent = result;

                if (progress < 1) {
                    requestAnimationFrame(scrambleFrame);
                } else {
                    el.textContent = original;
                    animating = false;
                }
            };
            requestAnimationFrame(scrambleFrame);
        });
    });
}

// ========== TOGGLE GALLERY (Accordion – auto collapse previous) ==========
// (Kept in case you reuse this on other pages)
function toggleGallery(header) {
    const currentGroup = header.parentElement;
    const allGroups = document.querySelectorAll('.gallery-group');
    
    const isExpanded = currentGroup.classList.contains('expanded');
    
    allGroups.forEach(group => {
        group.classList.remove('expanded');
    });
    
    if (!isExpanded) {
        currentGroup.classList.add('expanded');
    }
}

// ========== SCROLL GALLERY ==========
// (Kept in case you reuse this on other pages)
function scrollGallery(btn, direction) {
    const group = btn.closest('.gallery-group');
    const container = group.querySelector('.gallery-scroll-container');
    if (!container) return;
    
    const firstImg = container.querySelector('img');
    if (!firstImg) return;
    
    const imgWidth = firstImg.offsetWidth;
    const gap = 14;
    const scrollAmount = (imgWidth + gap) * 4 * direction;
    
    container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

// ========== LIGHTBOX ==========
let lightboxImages = [];
let currentImageIndex = 0;

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const image = document.getElementById('lightboxImage');
    const counter = document.getElementById('lightboxCounter');

    // Collect ALL images from the page
    lightboxImages = [];

    // 1. Bloom Café Feature Images
    document.querySelectorAll('.feature-image img').forEach(img => {
        if (img.src) lightboxImages.push(img.src);
    });

    // 2. Additional Works
    document.querySelectorAll('.extra-item img').forEach(img => {
        if (img.src) lightboxImages.push(img.src);
    });

    // 3. Logo Gallery
    document.querySelectorAll('.logo-item img').forEach(img => {
        if (img.src) lightboxImages.push(img.src);
    });

    // 4. (Fallback) Any other images that might be on the page
    document.querySelectorAll('.graphics-layout img').forEach(img => {
        // avoid duplicates – check if already added
        if (img.src && !lightboxImages.includes(img.src)) {
            lightboxImages.push(img.src);
        }
    });

    if (lightboxImages.length === 0) return;

    // Clamp index to valid range
    if (index >= lightboxImages.length) index = 0;
    if (index < 0) index = 0;

    currentImageIndex = index;
    image.src = lightboxImages[currentImageIndex];
    counter.textContent = `${currentImageIndex + 1} / ${lightboxImages.length}`;

    lightbox.classList.add('active');
    document.body.classList.add('lightbox-open');
    updateArrows();
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.classList.remove('lightbox-open');
}

function changeImage(direction) {
    const newIndex = currentImageIndex + direction;
    if (newIndex < 0 || newIndex >= lightboxImages.length) return;

    currentImageIndex = newIndex;
    document.getElementById('lightboxImage').src = lightboxImages[currentImageIndex];
    document.getElementById('lightboxCounter').textContent =
        `${currentImageIndex + 1} / ${lightboxImages.length}`;

    updateArrows();
}

function updateArrows() {
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (lightboxImages.length <= 1) {
        prevBtn.style.visibility = 'hidden';
        nextBtn.style.visibility = 'hidden';
        return;
    }

    prevBtn.style.visibility = currentImageIndex === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = currentImageIndex === lightboxImages.length - 1 ? 'hidden' : 'visible';
}

// ========== KEYBOARD SUPPORT ==========
document.addEventListener('keydown', function(e) {
    if (!document.getElementById('lightbox').classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
});

// ========== CLICK OUTSIDE TO CLOSE ==========
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
});

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Graphic Design page loaded');

    document.body.classList.add('graphics-layout-active');

    // --- Apply scramble effect (if any elements exist) ---
    applyScrambleEffect('.deliverable-title'); // keeps old pages working
    applyScrambleEffect('.feature-content h3'); // optional – can remove if not needed

    // --- Click listeners for ALL images on the page ---

    // 1. Bloom Café Feature Images
    document.querySelectorAll('.feature-image img').forEach((img, index) => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            const allImages = document.querySelectorAll('.feature-image img, .extra-item img, .logo-item img');
            const idx = Array.from(allImages).indexOf(this);
            openLightbox(idx);
        });
    });

    // 2. Additional Works
    document.querySelectorAll('.extra-item img').forEach((img, index) => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            const allImages = document.querySelectorAll('.feature-image img, .extra-item img, .logo-item img');
            const idx = Array.from(allImages).indexOf(this);
            openLightbox(idx);
        });
    });

    // 3. Logo Gallery
    document.querySelectorAll('.logo-item img').forEach((img, index) => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            const allImages = document.querySelectorAll('.feature-image img, .extra-item img, .logo-item img');
            const idx = Array.from(allImages).indexOf(this);
            openLightbox(idx);
        });
    });

    // --- Auto-expand any existing galleries (for pages that use them) ---
    document.querySelectorAll('.graphics-gallery .gallery-group:first-child').forEach(group => {
        group.classList.add('expanded');
    });
});

// ========== BACK TO TOP ==========
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}