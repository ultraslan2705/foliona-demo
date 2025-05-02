// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Add active class to current navigation item
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });

    // Navbar shrink on scroll
    function navbarShrink() {
        const navbar = document.getElementById('mainNavbar');
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add('navbar-shrink');
        } else {
            navbar.classList.remove('navbar-shrink');
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', navbarShrink);

    // Call the function on page load
    navbarShrink();

    // Mobile Menu Toggle
    const mobileMenuToggler = document.querySelector('.navbar-toggler');
    const mobileMenuCollapse = document.querySelector('.navbar-collapse');
    const mobileMenuLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const bsCollapse = new bootstrap.Collapse(mobileMenuCollapse, {
        toggle: false
    });

    // Menüyü kapatma fonksiyonu
    function closeMenu() {
        if (mobileMenuCollapse.classList.contains('show')) {
            bsCollapse.hide();
        }
    }

    // Menü dışına tıklandığında kapatma
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 992 && 
            !mobileMenuCollapse.contains(e.target) && 
            !mobileMenuToggler.contains(e.target) &&
            mobileMenuCollapse.classList.contains('show')) {
            closeMenu();
        }
    });

    // ESC tuşuna basıldığında kapatma
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenuCollapse.classList.contains('show')) {
            closeMenu();
        }
    });

    // Menü linklerine tıklandığında kapatma
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                closeMenu();
            }
        });
    });

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = themeToggle.querySelector('.bi-sun-fill');
    const moonIcon = themeToggle.querySelector('.bi-moon-fill');

    // Check for system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const getStoredTheme = () => localStorage.getItem('theme');
    const getSystemTheme = () => prefersDarkScheme.matches ? 'dark' : 'light';
    
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            sunIcon.classList.add('d-none');
            moonIcon.classList.remove('d-none');
        } else {
            sunIcon.classList.remove('d-none');
            moonIcon.classList.add('d-none');
        }

        // Close mobile menu after theme change
        if (window.innerWidth < 992) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    };

    // Initialize theme
    const initTheme = () => {
        const storedTheme = getStoredTheme();
        const systemTheme = getSystemTheme();
        const theme = storedTheme || systemTheme;
        setTheme(theme);
    };

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!getStoredTheme()) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Initialize theme on page load
    initTheme();

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };

    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);
    // Call once on page load
    animateOnScroll();
}); 