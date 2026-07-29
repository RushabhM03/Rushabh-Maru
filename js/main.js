document.addEventListener('DOMContentLoaded', () => {
    // Reveal Scroll Interaction Implementation
    const scrollElements = document.querySelectorAll('.card, .timeline-item, .sub-block');

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

    // Inject absolute basic visibility rules directly via inline assignment setup
    scrollElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Create a dynamic custom CSS class identifier runtime injection
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `.scrolled-in { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(styleSheet);

    window.addEventListener('scroll', () => { 
        handleScrollAnimation();
    });
    
    // Kickstart evaluation array
    handleScrollAnimation();

    // Theme toggle setup
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        themeToggle.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    };

    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
    });

});
