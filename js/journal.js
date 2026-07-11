// ===== Journal Page Specific JavaScript =====

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

document.addEventListener('DOMContentLoaded', function() {
    console.log('📓 Internship Journal page loaded');
    
    // Add class to body to hide default lines from style.css
    document.body.classList.add('journal-layout-active');
    
    // Apply scramble effect to responsibility titles
    applyScrambleEffect('.responsibility-title');
});

// Back to Top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Pause scrolling on hover
const scrollTrack = document.getElementById('journalScrollTrack');
if (scrollTrack) {
    scrollTrack.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    scrollTrack.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}