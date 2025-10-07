
        // Toast Notification System
        function showToast(message, type = 'success', duration = 5000) {
            const toastContainer = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;

            const icons = {
                success: 'fas fa-check-circle',
                error: 'fas fa-exclamation-circle',
                info: 'fas fa-info-circle'
            };

            toast.innerHTML = `
                <div class="toast-icon">
                    <i class="${icons[type]}"></i>
                </div>
                <div class="toast-content">
                    <div class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
                    <div class="toast-message">${message}</div>
                </div>
                <button class="toast-close">
                    <i class="fas fa-times"></i>
                </button>
            `;

            toastContainer.appendChild(toast);

            // Animate in
            setTimeout(() => toast.classList.add('show'), 100);

            // Auto remove
            const autoRemove = setTimeout(() => {
                removeToast(toast);
            }, duration);

            // Manual close
            toast.querySelector('.toast-close').addEventListener('click', () => {
                clearTimeout(autoRemove);
                removeToast(toast);
            });

            function removeToast(toastElement) {
                toastElement.classList.remove('show');
                setTimeout(() => {
                    if (toastElement.parentNode) {
                        toastElement.parentNode.removeChild(toastElement);
                    }
                }, 300);
            }
        }

        // Mobile Navigation Toggle
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

        // Simple modal open/close functions
        function openAuthModal(tab = 'login') {
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Set active tab
            authTabs.forEach(t => {
                t.classList.remove('active');
            });

            const activeTab = document.querySelector(`.auth-tab[data-tab="${tab}"]`);
            if (activeTab) {
                activeTab.classList.add('active');
            }

            // Show correct form
            if (tab === 'login') {
                loginForm.style.display = 'block';
                signupForm.style.display = 'none';
            } else {
                loginForm.style.display = 'none';
                signupForm.style.display = 'block';
            }
        }

        function closeAuthModal() {
            authModal.classList.remove('active');
            document.body.style.overflow = '';
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
        closeModal.addEventListener('click', closeAuthModal);

        // Close modal when clicking outside
        authModal.addEventListener('click', function (e) {
            if (e.target === authModal) {
                closeAuthModal();
            }
        });

        // Switch between login and signup tabs
        authTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const tabName = this.getAttribute('data-tab');

                authTabs.forEach(t => {
                    t.classList.remove('active');
                });
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

            if (input && error) {
                input.classList.add('error');
                error.textContent = message;
                error.classList.add('show');
            }
        }

        function clearError(inputId, errorId) {
            const input = document.getElementById(inputId);
            const error = document.getElementById(errorId);

            if (input && error) {
                input.classList.remove('error');
                error.classList.remove('show');
            }
        }

        // Form submission
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            let isValid = true;

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

            if (isValid) {
                showToast('Login successful! Welcome back!', 'success');
                closeAuthModal();
                loginForm.reset();
            }
        });

        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            let isValid = true;

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

            if (isValid) {
                showToast('Account created successfully! Welcome to PlugxFlow!', 'success');
                closeAuthModal();
                signupForm.reset();
            }
        });

        // Forgot password
        document.getElementById('forgotPassword').addEventListener('click', function (e) {
            e.preventDefault();
            showToast('Password reset email sent! Check your inbox.', 'info');
        });

        // App Store and Play Store buttons
        document.querySelectorAll('.hero-buttons .btn, .cta-buttons .btn').forEach(button => {
            button.addEventListener('click', function () {
                if (this.textContent.includes('App Store')) {
                    showToast('Redirecting to App Store...', 'info');
                } else if (this.textContent.includes('Google Play') || this.textContent.includes('Play Store')) {
                    showToast('Redirecting to Google Play...', 'info');
                }
            });
        });

        // Pricing buttons
        document.querySelectorAll('.pricing-btn').forEach(button => {
            button.addEventListener('click', function () {
                const plan = this.closest('.pricing-card').querySelector('h3').textContent;
                showToast(`You selected the ${plan} plan! Redirecting to checkout...`, 'info');
            });
        });

        // Balance card buttons
        document.querySelectorAll('.balance-actions .btn').forEach(button => {
            button.addEventListener('click', function () {
                if (this.textContent.includes('Add Money')) {
                    showToast('Redirecting to add money page...', 'info');
                } else {
                    showToast('Opening financial report...', 'info');
                }
            });
        });

        // Keyboard navigation improvements
        document.addEventListener('keydown', function (e) {
            // Close modal on Escape key
            if (e.key === 'Escape' && authModal.classList.contains('active')) {
                closeAuthModal();
            }

            // Close mobile nav on Escape key
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    
