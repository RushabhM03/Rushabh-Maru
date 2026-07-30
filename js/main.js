document.addEventListener('DOMContentLoaded', () => {
    // Reveal Scroll Interaction Implementation for popped timeline tracking
    const scrollElements = document.querySelectorAll('.card, .timeline-item, .sub-block, .edu-timeline-item');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled-in');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });
    };

    // Style hooks configuration
    scrollElements.forEach(el => {
        if (!el.classList.contains('edu-timeline-item')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        }
    });

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `.scrolled-in:not(.edu-timeline-item) { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(styleSheet);

    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();

    // --- Dynamic Slider Engine Setup ---
    const track = document.getElementById('blogsTrack');
    const prevBtn = document.querySelector('[data-carousel-direction="previous"]');
    const nextBtn = document.querySelector('[data-carousel-direction="next"]');
    
    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;

        const getSlidesPerPage = () => window.innerWidth >= 768 ? 2 : 1;
        
        const updateSliderPosition = () => {
            // Cancel and reset track transforms if on a small screen layout size
            if (window.innerWidth < 768) {
                track.style.transform = 'none';
                return;
            }

            const slides = document.querySelectorAll('.blog-slide');
            const totalSlides = slides.length;
            const slidesPerPage = getSlidesPerPage();
            const maxIndex = Math.max(0, totalSlides - slidesPerPage);
            
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;

            const slideWidth = slides[0].getBoundingClientRect().width;
            const gap = 24; // Equivalent to 1.5rem gap
            const amountToMove = currentIndex * (slideWidth + gap);
            
            track.style.transform = `translateX(-${amountToMove}px)`;
        };

        nextBtn.addEventListener('click', () => {
            const totalSlides = document.querySelectorAll('.blog-slide').length;
            if (currentIndex < totalSlides - getSlidesPerPage()) {
                currentIndex++;
            } else {
                currentIndex = 0; // Infinity loop back
            }
            updateSliderPosition();
        });

        prevBtn.addEventListener('click', () => {
            const totalSlides = document.querySelectorAll('.blog-slide').length;
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = Math.max(0, totalSlides - getSlidesPerPage()); // Infinity loop forward
            }
            updateSliderPosition();
        });

        window.addEventListener('resize', updateSliderPosition);
    }

    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    };
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
    });
});