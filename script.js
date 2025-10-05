
        // Mobile Navigation Toggle with Animation
        const mobileToggle = document.getElementById('mobileToggle');
        const mobileNav = document.getElementById('mobileNav');
        const overlay = document.getElementById('overlay');

        mobileToggle.addEventListener('click', function () {
            mobileToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        overlay.addEventListener('click', function () {
            mobileToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close mobile nav when clicking on a link
        document.querySelectorAll('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', function () {
                mobileToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Testimonial Slider
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.slider-dot');
        let currentSlide = 0;

        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            currentSlide = (n + slides.length) % slides.length;

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        dots.forEach(dot => {
            dot.addEventListener('click', function () {
                showSlide(parseInt(this.getAttribute('data-slide')));
            });
        });

        // Auto slide change
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', function () {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
            } else {
                header.style.padding = '0';
                header.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
            }
        });

        // Auth Modal Functionality
        const authModal = document.getElementById('authModal');
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const mobileLoginBtn = document.getElementById('mobileLoginBtn');
        const mobileSignupBtn = document.getElementById('mobileSignupBtn');
        const closeModal = document.getElementById('closeModal');
        const authTabs = document.querySelectorAll('.auth-tab');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');

        // Open modal functions
        function openAuthModal(tab = 'login') {
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Set active tab
            authTabs.forEach(t => t.classList.remove('active'));
            document.querySelector(`.auth-tab[data-tab="${tab}"]`).classList.add('active');

            // Show correct form
            if (tab === 'login') {
                loginForm.style.display = 'block';
                signupForm.style.display = 'none';
            } else {
                loginForm.style.display = 'none';
                signupForm.style.display = 'block';
            }
        }

        // Event listeners for opening modal
        loginBtn.addEventListener('click', () => openAuthModal('login'));
        signupBtn.addEventListener('click', () => openAuthModal('signup'));
        mobileLoginBtn.addEventListener('click', () => {
            openAuthModal('login');
            mobileToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
        });
        mobileSignupBtn.addEventListener('click', () => {
            openAuthModal('signup');
            mobileToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
        });

        // Close modal
        closeModal.addEventListener('click', () => {
            authModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Switch between login and signup tabs
        authTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const tabName = this.getAttribute('data-tab');

                authTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                if (tabName === 'login') {
                    loginForm.style.display = 'block';
                    signupForm.style.display = 'none';
                } else {
                    loginForm.style.display = 'none';
                    signupForm.style.display = 'block';
                }
            });
        });

        // Form submission
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // In a real app, you would send this to your backend
            console.log('Login attempt:', { email, password });
            alert('Login functionality would connect to your backend in a real application.');

            // Close modal after "login"
            authModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // In a real app, you would send this to your backend
            console.log('Signup attempt:', { name, email, password });
            alert('Account creation would connect to your backend in a real application.');

            // Close modal after "signup"
            authModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Forgot password
        document.getElementById('forgotPassword').addEventListener('click', function (e) {
            e.preventDefault();
            alert('Password reset functionality would be implemented in a real application.');
        });
    