
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

        // Form validation functions
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function validatePassword(password) {
            return password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
        }

        function showError(inputId, errorId, message) {
            const input = document.getElementById(inputId);
            const error = document.getElementById(errorId);

            input.classList.add('error');
            error.textContent = message;
            error.classList.add('show');
        }

        function clearError(inputId, errorId) {
            const input = document.getElementById(inputId);
            const error = document.getElementById(errorId);

            input.classList.remove('error');
            error.classList.remove('show');
        }

        function validateLoginForm() {
            let isValid = true;
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Validate email
            if (!validateEmail(email)) {
                showError('loginEmail', 'loginEmailError', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError('loginEmail', 'loginEmailError');
            }

            // Validate password
            if (password.length < 6) {
                showError('loginPassword', 'loginPasswordError', 'Password must be at least 6 characters');
                isValid = false;
            } else {
                clearError('loginPassword', 'loginPasswordError');
            }

            return isValid;
        }

        function validateSignupForm() {
            let isValid = true;
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validate name
            if (name.trim().length < 2) {
                showError('signupName', 'signupNameError', 'Please enter your full name');
                isValid = false;
            } else {
                clearError('signupName', 'signupNameError');
            }

            // Validate email
            if (!validateEmail(email)) {
                showError('signupEmail', 'signupEmailError', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError('signupEmail', 'signupEmailError');
            }

            // Validate password
            if (!validatePassword(password)) {
                showError('signupPassword', 'signupPasswordError', 'Password must be at least 8 characters with letters and numbers');
                isValid = false;
            } else {
                clearError('signupPassword', 'signupPasswordError');
            }

            // Validate confirm password
            if (password !== confirmPassword) {
                showError('confirmPassword', 'confirmPasswordError', 'Passwords do not match');
                isValid = false;
            } else {
                clearError('confirmPassword', 'confirmPasswordError');
            }

            return isValid;
        }

        // Real-time validation for signup form
        document.getElementById('signupPassword').addEventListener('input', function () {
            const password = this.value;
            if (password.length > 0 && !validatePassword(password)) {
                showError('signupPassword', 'signupPasswordError', 'Password must be at least 8 characters with letters and numbers');
            } else {
                clearError('signupPassword', 'signupPasswordError');
            }

            // Also validate confirm password if it has value
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (confirmPassword.length > 0 && password !== confirmPassword) {
                showError('confirmPassword', 'confirmPasswordError', 'Passwords do not match');
            } else if (confirmPassword.length > 0) {
                clearError('confirmPassword', 'confirmPasswordError');
            }
        });

        document.getElementById('confirmPassword').addEventListener('input', function () {
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = this.value;

            if (confirmPassword.length > 0 && password !== confirmPassword) {
                showError('confirmPassword', 'confirmPasswordError', 'Passwords do not match');
            } else {
                clearError('confirmPassword', 'confirmPasswordError');
            }
        });

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

            if (!validateLoginForm()) {
                return;
            }

            const email = document.getElementById('loginEmail').value;

            // In a real app, you would send this to your backend
            // Removed console.log with sensitive data
            console.log('Login attempt for:', email);
            alert('Login functionality would connect to your backend in a real application.');

            // Close modal after "login"
            authModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!validateSignupForm()) {
                return;
            }

            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;

            // In a real app, you would send this to your backend
            // Removed console.log with sensitive data
            console.log('Signup attempt for:', name, email);
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
    
