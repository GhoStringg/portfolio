// ===== Digital Asset Page Specific JavaScript =====

// Generalized scramble effect function
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

// ========== TOGGLE GALLERY (Collapse/Expand) ==========
// ========== TOGGLE GALLERY (Accordion - auto collapse previous) ==========
function toggleGallery(header) {
    const currentGroup = header.parentElement;
    const allGroups = document.querySelectorAll('.gallery-group');
    
    // Check if the clicked group is already expanded
    const isExpanded = currentGroup.classList.contains('expanded');
    
    // Collapse all groups
    allGroups.forEach(group => {
        group.classList.remove('expanded');
    });
    
    // If the clicked group wasn't expanded, expand it
    if (!isExpanded) {
        currentGroup.classList.add('expanded');
    }
}

// ========== SCROLL GALLERY (Left/Right Navigation) ==========
function scrollGallery(btn, direction) {
    const group = btn.closest('.gallery-group');
    const container = group.querySelector('.gallery-scroll-container');
    if (!container) return;
    
    const firstImg = container.querySelector('img');
    if (!firstImg) return;
    
    // Get width of one image including gap
    const imgWidth = firstImg.offsetWidth;
    const gap = 14; // matches CSS gap
    const scrollAmount = (imgWidth + gap) * 4 * direction; // scroll 4 images at a time
    
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

    lightboxImages = [];
    document.querySelectorAll('.gallery-scroll-track img').forEach(img => {
        lightboxImages.push(img.src);
    });

    if (lightboxImages.length === 0) return;

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

    prevBtn.style.visibility = currentImageIndex === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = currentImageIndex === lightboxImages.length - 1 ? 'hidden' : 'visible';
}

// Keyboard support
document.addEventListener('keydown', function(e) {
    if (!document.getElementById('lightbox').classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
});

// Click outside image to close
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
});

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Digital Asset Design page loaded');

    document.body.classList.add('digital-layout-active');

    // Apply scramble effect to deliverable titles
    applyScrambleEffect('.deliverable-title');

    // Click listeners for gallery images (lightbox)
    document.querySelectorAll('.gallery-scroll-track img').forEach((img, index) => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            // Find the index of this image within all gallery images
            const allImages = document.querySelectorAll('.gallery-scroll-track img');
            const idx = Array.from(allImages).indexOf(this);
            openLightbox(idx);
        });
    });

    // Auto-expand first gallery by default
    const firstGroup = document.querySelector('.gallery-group');
    if (firstGroup) {
        firstGroup.classList.add('expanded');
    }
});

// Back to Top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}