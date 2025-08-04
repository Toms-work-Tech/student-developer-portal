// ===== TECHLEARN PORTAL - PROFESSIONAL LEARNING PLATFORM =====
// Modern ES6+ Implementation with Advanced Features

class TechLearnPortal {
    constructor() {
        this.currentUser = null;
        this.isLoading = false;
        this.animationQueue = [];
        
        // Enhanced sample data with more realistic content
        this.sampleData = {
            students: [
                {
                    id: 1,
                    name: "Alex Chen",
                    email: "alex@student.com",
                    password: "student123",
                    role: "student",
                    avatar: "https://ui-avatars.com/api/?name=Alex+Chen&background=0ea5e9&color=fff&size=128",
                    enrolledCourses: [1, 3],
                    progress: { 1: 65, 3: 25 },
                    joinDate: "2024-01-15",
                    lastActive: new Date().toISOString(),
                    preferences: {
                        theme: "light",
                        notifications: true,
                        language: "en"
                    }
                }
            ],
            developers: [
                {
                    id: 1,
                    name: "Sarah Rodriguez",
                    email: "sarah@developer.com",
                    password: "developer123",
                    role: "developer",
                    avatar: "https://ui-avatars.com/api/?name=Sarah+Rodriguez&background=f59e0b&color=fff&size=128",
                    coursesTeaching: [1, 2],
                    expertise: ["JavaScript", "React", "Node.js", "Python"],
                    rating: 4.9,
                    studentsCount: 1247,
                    schedule: [
                        {
                            courseId: 1,
                            date: "2024-12-25",
                            time: "14:00",
                            meetingLink: "https://meet.google.com/abc-xyz-123",
                            title: "Advanced JavaScript Concepts"
                        },
                        {
                            courseId: 2,
                            date: "2024-12-26",
                            time: "10:00",
                            meetingLink: "https://meet.google.com/def-456-789",
                            title: "UI/UX Design Workshop"
                        }
                    ]
                }
            ],
            courses: [
                {
                    id: 1,
                    title: "Advanced JavaScript & ES6+",
                    description: "Master modern JavaScript with ES6+, async programming, and advanced concepts for professional development.",
                    category: "Programming",
                    level: "Advanced",
                    duration: "8 weeks",
                    price: "$299",
                    rating: 4.8,
                    studentsEnrolled: 2847,
                    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
                    tags: ["JavaScript", "ES6", "Async", "Professional"],
                    lessons: [
                        { id: 1, title: "Modern JavaScript Fundamentals", duration: "45 min", completed: false },
                        { id: 2, title: "Advanced Functions & Closures", duration: "60 min", completed: false },
                        { id: 3, title: "Async/Await & Promises", duration: "75 min", completed: false },
                        { id: 4, title: "Module Systems & Bundling", duration: "90 min", completed: false }
                    ]
                },
                {
                    id: 2,
                    title: "Modern UI/UX Design Systems",
                    description: "Learn to create scalable design systems using Figma, component libraries, and modern design principles.",
                    category: "Design",
                    level: "Intermediate",
                    duration: "6 weeks",
                    price: "$249",
                    rating: 4.9,
                    studentsEnrolled: 1923,
                    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
                    tags: ["UI/UX", "Figma", "Design Systems", "Prototyping"],
                    lessons: [
                        { id: 1, title: "Design System Fundamentals", duration: "40 min", completed: false },
                        { id: 2, title: "Component Architecture", duration: "55 min", completed: false },
                        { id: 3, title: "Responsive Design Patterns", duration: "70 min", completed: false }
                    ]
                },
                {
                    id: 3,
                    title: "Python for Data Science & AI",
                    description: "Comprehensive Python course covering data science, machine learning, and AI development with real projects.",
                    category: "Data Science",
                    level: "Beginner",
                    duration: "12 weeks",
                    price: "$399",
                    rating: 4.7,
                    studentsEnrolled: 3456,
                    image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=300&fit=crop",
                    tags: ["Python", "Data Science", "Machine Learning", "AI"],
                    lessons: [
                        { id: 1, title: "Python Fundamentals", duration: "35 min", completed: false },
                        { id: 2, title: "Data Structures & Algorithms", duration: "50 min", completed: false },
                        { id: 3, title: "NumPy & Pandas", duration: "65 min", completed: false },
                        { id: 4, title: "Machine Learning Basics", duration: "80 min", completed: false }
                    ]
                }
            ],
            questions: [
                {
                    id: 1,
                    courseId: 1,
                    studentId: 1,
                    studentName: "Alex Chen",
                    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    content: "I'm struggling with understanding closures in JavaScript. Could someone explain how they work in practical scenarios?",
                    tags: ["javascript", "closures", "fundamentals"],
                    votes: 5,
                    answers: [
                        {
                            id: 1,
                            developerId: 1,
                            developerName: "Sarah Rodriguez",
                            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                            content: "Great question! Closures are functions that have access to variables from their outer scope even after the outer function has returned. Here's a practical example: function createCounter() { let count = 0; return function() { return ++count; }; } The inner function 'closes over' the count variable.",
                            votes: 8,
                            isAccepted: true
                        }
                    ]
                }
            ]
        };

        this.init();
    }

    // ===== INITIALIZATION =====
    async init() {
        try {
            await this.showLoadingScreen();
            this.setupEventListeners();
            this.setupPasswordToggles();
            this.setupFormValidation();
            await this.hideLoadingScreen();
            this.showToast('Welcome to TechLearn Portal! 🚀', 'info');
        } catch (error) {
            console.error('Initialization error:', error);
            this.showToast('Failed to initialize application', 'error');
        }
    }

    // ===== LOADING SCREEN =====
    showLoadingScreen() {
        return new Promise(resolve => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.remove('hidden');
                setTimeout(resolve, 2000); // Simulate loading time
            } else {
                resolve();
            }
        });
    }

    hideLoadingScreen() {
        return new Promise(resolve => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    resolve();
                }, 500);
            } else {
                resolve();
            }
        });
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Auth tab switching
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchAuthTab(e.target.dataset.tab));
        });

        // Form submissions
        document.getElementById('login-form')?.addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('signup-form')?.addEventListener('submit', (e) => this.handleSignup(e));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

        // Window resize handler
        window.addEventListener('resize', this.debounce(() => this.handleResize(), 250));
    }

    // ===== PASSWORD TOGGLE FUNCTIONALITY =====
    setupPasswordToggles() {
        document.querySelectorAll('.password-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const targetId = e.target.closest('.password-toggle').dataset.target;
                const passwordInput = document.getElementById(targetId);
                const icon = e.target.closest('.password-toggle').querySelector('i');
                
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    icon.className = 'fas fa-eye-slash';
                } else {
                    passwordInput.type = 'password';
                    icon.className = 'fas fa-eye';
                }
            });
        });
    }

    // ===== FORM VALIDATION =====
    setupFormValidation() {
        // Real-time validation
        document.querySelectorAll('input[type="email"]').forEach(input => {
            input.addEventListener('blur', (e) => this.validateEmail(e.target));
        });

        document.querySelectorAll('input[type="password"]').forEach(input => {
            input.addEventListener('input', (e) => {
                if (e.target.id.includes('signup')) {
                    this.validatePasswordStrength(e.target);
                }
            });
        });
    }

    validateEmail(input) {
        const email = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorElement = document.getElementById(`${input.id}-error`);
        
        if (!email) {
            this.showFieldError(input, errorElement, 'Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            this.showFieldError(input, errorElement, 'Please enter a valid email address');
            return false;
        } else {
            this.hideFieldError(input, errorElement);
            return true;
        }
    }

    validatePasswordStrength(input) {
        const password = input.value;
        const strengthIndicator = document.getElementById('password-strength');
        
        if (!strengthIndicator) return;

        const strength = this.calculatePasswordStrength(password);
        const colors = ['#ef4444', '#f59e0b', '#10b981', '#059669'];
        const widths = ['25%', '50%', '75%', '100%'];
        
        strengthIndicator.style.setProperty('--strength-width', widths[strength]);
        strengthIndicator.style.setProperty('--strength-color', colors[strength]);
    }

    calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        return Math.max(0, strength - 1);
    }

    showFieldError(input, errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        input.style.borderColor = 'var(--error)';
    }

    hideFieldError(input, errorElement) {
        if (errorElement) {
            errorElement.classList.remove('show');
        }
        input.style.borderColor = 'var(--gray-200)';
    }

    // ===== AUTHENTICATION =====
    switchAuthTab(tabName) {
        // Update active tab
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        // Show corresponding form
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.toggle('active', form.id === `${tabName}-form`);
        });
    }

    async handleLogin(e) {
        e.preventDefault();
        
        if (this.isLoading) return;
        this.isLoading = true;

        const formData = new FormData(e.target);
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const role = document.getElementById('login-role').value;

        // Validate form
        if (!this.validateLoginForm(email, password, role)) {
            this.isLoading = false;
            return;
        }

        try {
            // Simulate API call
            await this.simulateNetworkDelay();
            
            const user = this.authenticateUser(email, password, role);
            
            if (user) {
                this.currentUser = user;
                this.currentUser.lastActive = new Date().toISOString();
                
                await this.transitionToPortal(role);
                this.showToast(`Welcome back, ${user.name}! 🎉`, 'success');
                this.trackUserActivity('login', { role, timestamp: new Date().toISOString() });
            } else {
                this.showToast('Invalid credentials. Please check your email and password.', 'error');
                this.shakeElement(document.querySelector('.auth-card'));
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showToast('Login failed. Please try again.', 'error');
        } finally {
            this.isLoading = false;
        }
    }

    async handleSignup(e) {
        e.preventDefault();
        
        if (this.isLoading) return;
        this.isLoading = true;

        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const role = document.getElementById('signup-role').value;
        const termsAccepted = document.getElementById('terms-agreement').checked;

        // Validate form
        if (!this.validateSignupForm(name, email, password, role, termsAccepted)) {
            this.isLoading = false;
            return;
        }

        try {
            // Simulate API call
            await this.simulateNetworkDelay();
            
            const newUser = this.createUser(name, email, password, role);
            
            this.showToast('Account created successfully! Please sign in.', 'success');
            this.switchAuthTab('login');
            document.getElementById('signup-form').reset();
            
            // Pre-fill login form
            document.getElementById('login-email').value = email;
            document.getElementById('login-role').value = role;
            
        } catch (error) {
            console.error('Signup error:', error);
            this.showToast('Account creation failed. Please try again.', 'error');
        } finally {
            this.isLoading = false;
        }
    }

    validateLoginForm(email, password, role) {
        let isValid = true;

        if (!email) {
            this.showFieldError(
                document.getElementById('login-email'),
                document.getElementById('login-email-error'),
                'Email is required'
            );
            isValid = false;
        }

        if (!password) {
            this.showFieldError(
                document.getElementById('login-password'),
                document.getElementById('login-password-error'),
                'Password is required'
            );
            isValid = false;
        }

        if (!role) {
            this.showToast('Please select your account type', 'warning');
            isValid = false;
        }

        return isValid;
    }

    validateSignupForm(name, email, password, role, termsAccepted) {
        let isValid = true;

        if (!name || name.length < 2) {
            this.showFieldError(
                document.getElementById('signup-name'),
                document.getElementById('signup-name-error'),
                'Name must be at least 2 characters'
            );
            isValid = false;
        }

        if (!this.validateEmail(document.getElementById('signup-email'))) {
            isValid = false;
        }

        if (!password || password.length < 6) {
            this.showFieldError(
                document.getElementById('signup-password'),
                document.getElementById('signup-password-error'),
                'Password must be at least 6 characters'
            );
            isValid = false;
        }

        if (!role) {
            this.showToast('Please select your account type', 'warning');
            isValid = false;
        }

        if (!termsAccepted) {
            this.showToast('Please accept the Terms of Service', 'warning');
            isValid = false;
        }

        return isValid;
    }

    authenticateUser(email, password, role) {
        const users = role === 'student' ? this.sampleData.students : this.sampleData.developers;
        return users.find(user => user.email === email && user.password === password);
    }

    createUser(name, email, password, role) {
        const users = role === 'student' ? this.sampleData.students : this.sampleData.developers;
        const newUser = {
            id: users.length + 1,
            name,
            email,
            password,
            role,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${role === 'student' ? '0ea5e9' : 'f59e0b'}&color=fff&size=128`,
            joinDate: new Date().toISOString(),
            lastActive: new Date().toISOString(),
            preferences: {
                theme: 'light',
                notifications: true,
                language: 'en'
            }
        };

        if (role === 'student') {
            newUser.enrolledCourses = [];
            newUser.progress = {};
        } else {
            newUser.coursesTeaching = [];
            newUser.schedule = [];
            newUser.expertise = [];
            newUser.rating = 0;
            newUser.studentsCount = 0;
        }

        users.push(newUser);
        return newUser;
    }

    async transitionToPortal(role) {
        const authContainer = document.getElementById('auth-container');
        const portalContainer = document.getElementById(`${role}-portal`);

        // Fade out auth container
        authContainer.style.opacity = '0';
        authContainer.style.transform = 'translateY(-20px)';
        
        await this.delay(300);
        
        authContainer.style.display = 'none';
        portalContainer.style.display = 'flex';
        
        // Load portal content
        if (role === 'student') {
            this.loadStudentPortal();
        } else {
            this.loadDeveloperPortal();
        }
        
        // Fade in portal
        portalContainer.style.opacity = '0';
        portalContainer.style.transform = 'translateY(20px)';
        
        await this.delay(50);
        
        portalContainer.style.transition = 'all 0.5s ease-out';
        portalContainer.style.opacity = '1';
        portalContainer.style.transform = 'translateY(0)';
    }

    // ===== STUDENT PORTAL =====
    loadStudentPortal() {
        const portal = document.getElementById('student-portal');
        portal.innerHTML = this.generateStudentPortalHTML();
        this.setupStudentPortalEvents();
        this.loadStudentSection('dashboard');
    }

    generateStudentPortalHTML() {
        return `
            <header class="portal-header">
                <h1>TechLearn Student Portal</h1>
                <div class="user-info">
                    <span class="user-name">${this.currentUser.name}</span>
                    <img src="${this.currentUser.avatar}" alt="User Avatar" class="user-avatar">
                    <button class="logout-btn" id="logout-btn">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </header>
            
            <div class="main-content">
                <nav class="sidebar">
                    <ul class="sidebar-nav">
                        <li><a href="#" class="nav-link active" data-section="dashboard">
                            <i class="fas fa-chart-line"></i> Dashboard
                        </a></li>
                        <li><a href="#" class="nav-link" data-section="courses">
                            <i class="fas fa-graduation-cap"></i> My Courses
                        </a></li>
                        <li><a href="#" class="nav-link" data-section="available">
                            <i class="fas fa-book-open"></i> Browse Courses
                        </a></li>
                        <li><a href="#" class="nav-link" data-section="schedule">
                            <i class="fas fa-calendar-alt"></i> Schedule
                        </a></li>
                        <li><a href="#" class="nav-link" data-section="questions">
                            <i class="fas fa-question-circle"></i> Q&A Forum
                        </a></li>
                        <li><a href="#" class="nav-link" data-section="achievements">
                            <i class="fas fa-trophy"></i> Achievements
                        </a></li>
                        <li><a href="#" class="nav-link" data-section="settings">
                            <i class="fas fa-cog"></i> Settings
                        </a></li>
                    </ul>
                </nav>
                
                <main class="content-area" id="student-content">
                    <!-- Content will be loaded here -->
                </main>
            </div>
        `;
    }

    setupStudentPortalEvents() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.closest('.nav-link').dataset.section;
                this.navigateToSection(section, 'student');
            });
        });

        // Logout
        document.getElementById('logout-btn')?.addEventListener('click', () => this.logout());
    }

    navigateToSection(section, userType) {
        // Update active nav
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.section === section);
        });

        // Load section content
        if (userType === 'student') {
            this.loadStudentSection(section);
        } else {
            this.loadDeveloperSection(section);
        }

        // Track navigation
        this.trackUserActivity('navigation', { section, userType, timestamp: new Date().toISOString() });
    }

    loadStudentSection(section) {
        const contentArea = document.getElementById('student-content');
        
        // Add loading state
        contentArea.innerHTML = '<div class="loading-placeholder">Loading...</div>';
        
        setTimeout(() => {
            switch(section) {
                case 'dashboard':
                    contentArea.innerHTML = this.generateStudentDashboard();
                    this.setupDashboardEvents();
                    break;
                case 'courses':
                    contentArea.innerHTML = this.generateStudentCourses();
                    this.setupCoursesEvents();
                    break;
                case 'available':
                    contentArea.innerHTML = this.generateAvailableCourses();
                    this.setupAvailableCoursesEvents();
                    break;
                case 'schedule':
                    contentArea.innerHTML = this.generateStudentSchedule();
                    break;
                case 'questions':
                    contentArea.innerHTML = this.generateStudentQuestions();
                    this.setupQuestionsEvents();
                    break;
                case 'achievements':
                    contentArea.innerHTML = this.generateAchievements();
                    break;
                case 'settings':
                    contentArea.innerHTML = this.generateSettings();
                    this.setupSettingsEvents();
                    break;
                default:
                    contentArea.innerHTML = this.generateStudentDashboard();
            }
            
            // Animate content in
            this.animateContentIn(contentArea);
        }, 300);
    }

    generateStudentDashboard() {
        const enrolledCourses = this.getEnrolledCourses();
        const inProgressCourses = enrolledCourses.filter(course => 
            this.currentUser.progress[course.id] > 0 && this.currentUser.progress[course.id] < 100
        );
        const upcomingClasses = this.getUpcomingClasses();
        const recentActivity = this.generateRecentActivity();

        return `
            <div class="dashboard-grid">
                <div class="card welcome-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-rocket"></i>
                            Welcome back, ${this.currentUser.name}!
                        </h2>
                    </div>
                    <p class="welcome-message">Ready to continue your learning journey? You're doing great!</p>
                    <div class="quick-stats">
                        <div class="stat-item">
                            <i class="fas fa-book"></i>
                            <span class="stat-number">${enrolledCourses.length}</span>
                            <span class="stat-label">Courses</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-clock"></i>
                            <span class="stat-number">${upcomingClasses.length}</span>
                            <span class="stat-label">Upcoming</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-trophy"></i>
                            <span class="stat-number">${this.calculateCompletedCourses()}</span>
                            <span class="stat-label">Completed</span>
                        </div>
                    </div>
                </div>

                <div class="card progress-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-chart-line"></i>
                            Learning Progress
                        </h3>
                    </div>
                    <div class="progress-overview">
                        ${inProgressCourses.map(course => `
                            <div class="course-progress-item">
                                <div class="course-info">
                                    <h4>${course.title}</h4>
                                    <span class="progress-text">${this.currentUser.progress[course.id]}% Complete</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${this.currentUser.progress[course.id]}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="card upcoming-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-calendar"></i>
                            Upcoming Classes
                        </h3>
                    </div>
                    <div class="upcoming-classes">
                        ${upcomingClasses.length > 0 ? upcomingClasses.map(cls => `
                            <div class="class-item">
                                <div class="class-time">
                                    <i class="fas fa-clock"></i>
                                    ${this.formatDateTime(cls.date, cls.time)}
                                </div>
                                <div class="class-info">
                                    <h4>${cls.title}</h4>
                                    <p>with ${cls.instructorName}</p>
                                </div>
                                <a href="${cls.meetingLink}" target="_blank" class="join-btn btn-sm">Join</a>
                            </div>
                        `).join('') : '<p class="no-data">No upcoming classes scheduled.</p>'}
                    </div>
                </div>

                <div class="card activity-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-history"></i>
                            Recent Activity
                        </h3>
                    </div>
                    <div class="activity-feed">
                        ${recentActivity}
                    </div>
                </div>
            </div>
        `;
    }

    // ===== DEVELOPER PORTAL =====
    loadDeveloperPortal() {
        const portal = document.getElementById('developer-portal');
        portal.innerHTML = this.generateDeveloperPortalHTML();
        this.setupDeveloperPortalEvents();
        this.loadDeveloperSection('dashboard');
    }

    generateDeveloperPortalHTML() {
        return `
            <header class="portal-header">
                <h1>TechLearn Instructor Portal</h1>
                <div class="user-info">
                    <div class="user-details">
                        <span class="user-name">${this.currentUser.name}</span>
                        <span class="user-role">Instructor</span>
                    </div>
                    <img src="${this.currentUser.avatar}" alt="User Avatar" class="user-avatar">
                    <button class="logout-btn" id="logout-btn">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </header>
            
            <div class="main-content">
                <nav class="sidebar">
                    <ul class="sidebar-nav">
                        <li><a href="#" class="nav-link active" data-section="dashboard">
                            <i class="fas fa-chart-pie"></i> Dashboard
                        </a></li>
                        <li><a href="#" class="nav-link" data-section="courses">
                            <i class="fas fa-chalkboard-teacher"></i> My Courses
                        </a></li>
                        <li><a href="#" class="nav-link" data-section="students">
                            <i class="fas fa-users"></i> Students
                        </a></li>
                        <li><a href="#" class="nav-link" data-section="schedule">
                            <i class="fas fa-calendar-check"></i> Schedule
                        </a></li>
                        <li><a href="#" class="nav-link" data-section="questions">
                            <i class="fas fa-comments"></i> Q&A
                        </a></li>
                        <li><a href="#" class="nav-link" data-section="analytics">
                            <i class="fas fa-analytics"></i> Analytics
                        </a></li>
                        <li><a href="#" class="nav-link" data-section="settings">
                            <i class="fas fa-cog"></i> Settings
                        </a></li>
                    </ul>
                </nav>
                
                <main class="content-area" id="developer-content">
                    <!-- Content will be loaded here -->
                </main>
            </div>
        `;
    }

    setupDeveloperPortalEvents() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.closest('.nav-link').dataset.section;
                this.navigateToSection(section, 'developer');
            });
        });

        // Logout
        document.getElementById('logout-btn')?.addEventListener('click', () => this.logout());
    }

    loadDeveloperSection(section) {
        const contentArea = document.getElementById('developer-content');
        
        // Add loading state
        contentArea.innerHTML = '<div class="loading-placeholder">Loading...</div>';
        
        setTimeout(() => {
            switch(section) {
                case 'dashboard':
                    contentArea.innerHTML = this.generateDeveloperDashboard();
                    this.setupDeveloperDashboardEvents();
                    break;
                case 'courses':
                    contentArea.innerHTML = this.generateDeveloperCourses();
                    this.setupDeveloperCoursesEvents();
                    break;
                case 'students':
                    contentArea.innerHTML = this.generateStudentsOverview();
                    break;
                case 'schedule':
                    contentArea.innerHTML = this.generateDeveloperSchedule();
                    this.setupScheduleEvents();
                    break;
                case 'questions':
                    contentArea.innerHTML = this.generateDeveloperQuestions();
                    this.setupDeveloperQuestionsEvents();
                    break;
                case 'analytics':
                    contentArea.innerHTML = this.generateAnalytics();
                    this.setupAnalyticsEvents();
                    break;
                case 'settings':
                    contentArea.innerHTML = this.generateSettings();
                    this.setupSettingsEvents();
                    break;
                default:
                    contentArea.innerHTML = this.generateDeveloperDashboard();
            }
            
            // Animate content in
            this.animateContentIn(contentArea);
        }, 300);
    }

    generateDeveloperDashboard() {
        const teachingCourses = this.getTeachingCourses();
        const upcomingClasses = this.getUpcomingClasses();
        const unansweredQuestions = this.getUnansweredQuestions();
        const totalStudents = this.getTotalStudents();

        return `
            <div class="dashboard-grid">
                <div class="card instructor-welcome">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-chalkboard-teacher"></i>
                            Instructor Dashboard
                        </h2>
                    </div>
                    <p class="welcome-message">Welcome back, ${this.currentUser.name}! Here's your teaching overview.</p>
                    <div class="instructor-stats">
                        <div class="stat-card">
                            <i class="fas fa-book-open stat-icon"></i>
                            <div class="stat-content">
                                <span class="stat-number">${teachingCourses.length}</span>
                                <span class="stat-label">Active Courses</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-users stat-icon"></i>
                            <div class="stat-content">
                                <span class="stat-number">${totalStudents}</span>
                                <span class="stat-label">Total Students</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-star stat-icon"></i>
                            <div class="stat-content">
                                <span class="stat-number">${this.currentUser.rating || 4.9}</span>
                                <span class="stat-label">Rating</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-question-circle stat-icon"></i>
                            <div class="stat-content">
                                <span class="stat-number">${unansweredQuestions.length}</span>
                                <span class="stat-label">Pending Q&A</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card quick-actions">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-bolt"></i>
                            Quick Actions
                        </h3>
                    </div>
                    <div class="action-buttons">
                        <button class="btn btn-primary action-btn" data-action="create-course">
                            <i class="fas fa-plus"></i>
                            Create Course
                        </button>
                        <button class="btn btn-secondary action-btn" data-action="schedule-class">
                            <i class="fas fa-calendar-plus"></i>
                            Schedule Class
                        </button>
                        <button class="btn btn-primary action-btn" data-action="view-analytics">
                            <i class="fas fa-chart-bar"></i>
                            View Analytics
                        </button>
                    </div>
                </div>

                <div class="card upcoming-sessions">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-calendar-check"></i>
                            Upcoming Sessions
                        </h3>
                    </div>
                    <div class="sessions-list">
                        ${upcomingClasses.length > 0 ? upcomingClasses.map(session => `
                            <div class="session-item">
                                <div class="session-time">
                                    <i class="fas fa-clock"></i>
                                    ${this.formatDateTime(session.date, session.time)}
                                </div>
                                <div class="session-info">
                                    <h4>${session.title}</h4>
                                    <p>${this.getCourseTitle(session.courseId)}</p>
                                </div>
                                <a href="${session.meetingLink}" target="_blank" class="btn btn-primary btn-sm">Start Class</a>
                            </div>
                        `).join('') : '<p class="no-data">No upcoming sessions scheduled.</p>'}
                    </div>
                </div>
            </div>
        `;
    }

    // ===== UTILITY FUNCTIONS =====
    getEnrolledCourses() {
        return this.sampleData.courses.filter(course => 
            this.currentUser.enrolledCourses?.includes(course.id)
        );
    }

    getTeachingCourses() {
        return this.sampleData.courses.filter(course => 
            this.currentUser.coursesTeaching?.includes(course.id)
        );
    }

    getUpcomingClasses() {
        const now = new Date();
        const classes = [];
        
        this.sampleData.developers.forEach(dev => {
            dev.schedule?.forEach(session => {
                const sessionDate = new Date(`${session.date} ${session.time}`);
                if (sessionDate > now) {
                    classes.push({
                        ...session,
                        instructorName: dev.name
                    });
                }
            });
        });
        
        return classes.sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));
    }

    getUnansweredQuestions() {
        return this.sampleData.questions.filter(q => 
            this.currentUser.coursesTeaching?.includes(q.courseId) && q.answers.length === 0
        );
    }

    getTotalStudents() {
        return this.currentUser.studentsCount || Math.floor(Math.random() * 1000) + 500;
    }

    calculateCompletedCourses() {
        if (!this.currentUser.progress) return 0;
        return Object.values(this.currentUser.progress).filter(progress => progress === 100).length;
    }

    getCourseTitle(courseId) {
        const course = this.sampleData.courses.find(c => c.id === courseId);
        return course ? course.title : 'Unknown Course';
    }

    formatDateTime(date, time) {
        const dateObj = new Date(`${date} ${time}`);
        return dateObj.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    generateRecentActivity() {
        const activities = [
            { icon: 'fas fa-play', text: 'Completed "Advanced Functions" lesson', time: '2 hours ago' },
            { icon: 'fas fa-question', text: 'Asked a question in JavaScript course', time: '1 day ago' },
            { icon: 'fas fa-trophy', text: 'Earned "Quick Learner" badge', time: '2 days ago' },
            { icon: 'fas fa-star', text: 'Rated course 5 stars', time: '3 days ago' }
        ];

        return activities.map(activity => `
            <div class="activity-item">
                <i class="${activity.icon} activity-icon"></i>
                <div class="activity-content">
                    <p>${activity.text}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }

    // ===== TOAST NOTIFICATIONS =====
    showToast(message, type = 'info', duration = 4000) {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        toastContainer.appendChild(toast);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.removeToast(toast);
        });

        // Auto remove
        setTimeout(() => {
            if (toast.parentNode) {
                this.removeToast(toast);
            }
        }, duration);
    }

    getToastIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    removeToast(toast) {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    // ===== ANIMATIONS =====
    animateContentIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.5s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    shakeElement(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }

    // ===== LOGOUT =====
    async logout() {
        try {
            this.trackUserActivity('logout', { 
                sessionDuration: Date.now() - new Date(this.currentUser.lastActive).getTime(),
                timestamp: new Date().toISOString()
            });

            // Fade out current portal
            const activePortal = document.querySelector('.portal-container[style*="flex"]');
            if (activePortal) {
                activePortal.style.opacity = '0';
                activePortal.style.transform = 'translateY(-20px)';
                await this.delay(300);
                activePortal.style.display = 'none';
            }

            // Reset state
            this.currentUser = null;
            
            // Show auth container
            const authContainer = document.getElementById('auth-container');
            authContainer.style.display = 'flex';
            authContainer.style.opacity = '0';
            authContainer.style.transform = 'translateY(20px)';
            
            await this.delay(50);
            
            authContainer.style.transition = 'all 0.5s ease-out';
            authContainer.style.opacity = '1';
            authContainer.style.transform = 'translateY(0)';
            
            // Clear forms
            document.querySelectorAll('form').forEach(form => form.reset());
            
            this.showToast('Successfully logged out. See you soon! 👋', 'info');
            
        } catch (error) {
            console.error('Logout error:', error);
            this.showToast('Logout failed. Please try again.', 'error');
        }
    }

    // ===== KEYBOARD SHORTCUTS =====
    handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'k':
                    e.preventDefault();
                    this.openSearchModal();
                    break;
                case 'l':
                    e.preventDefault();
                    if (this.currentUser) this.logout();
                    break;
            }
        }
        
        if (e.key === 'Escape') {
            this.closeModals();
        }
    }

    // ===== UTILITY METHODS =====
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    simulateNetworkDelay() {
        return this.delay(Math.random() * 1000 + 500);
    }

    trackUserActivity(action, data) {
        // In a real app, this would send analytics to your backend
        console.log('User Activity:', { action, data, user: this.currentUser?.id });
    }

    handleResize() {
        // Handle responsive behavior
        const sidebar = document.querySelector('.sidebar');
        const isMobile = window.innerWidth <= 768;
        
        if (sidebar) {
            sidebar.classList.toggle('mobile', isMobile);
        }
    }

    openSearchModal() {
        // Implementation for search functionality
        this.showToast('Search feature coming soon! 🔍', 'info');
    }

    closeModals() {
        // Close any open modals
        document.querySelectorAll('.modal.show').forEach(modal => {
            modal.classList.remove('show');
        });
    }

    // ===== PLACEHOLDER METHODS FOR FUTURE IMPLEMENTATION =====
    setupDashboardEvents() {
        // Setup dashboard-specific events
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.closest('.action-btn').dataset.action;
                this.handleQuickAction(action);
            });
        });
    }

    setupCoursesEvents() {
        // Setup courses-specific events
    }

    setupAvailableCoursesEvents() {
        // Setup available courses events
    }

    setupQuestionsEvents() {
        // Setup Q&A events
    }

    setupSettingsEvents() {
        // Setup settings events
    }

    setupDeveloperDashboardEvents() {
        // Setup developer dashboard events
        this.setupDashboardEvents(); // Reuse common dashboard events
    }

    setupDeveloperCoursesEvents() {
        // Setup developer courses events
    }

    setupScheduleEvents() {
        // Setup schedule events
    }

    setupDeveloperQuestionsEvents() {
        // Setup developer Q&A events
    }

    setupAnalyticsEvents() {
        // Setup analytics events
    }

    handleQuickAction(action) {
        switch(action) {
            case 'create-course':
                this.showToast('Course creation feature coming soon! 📚', 'info');
                break;
            case 'schedule-class':
                this.showToast('Class scheduling feature coming soon! 📅', 'info');
                break;
            case 'view-analytics':
                this.navigateToSection('analytics', 'developer');
                break;
            default:
                this.showToast('Feature coming soon!', 'info');
        }
    }

    // Placeholder methods for content generation
    generateStudentCourses() {
        return '<div class="placeholder">Student Courses - Coming Soon!</div>';
    }

    generateAvailableCourses() {
        return '<div class="placeholder">Available Courses - Coming Soon!</div>';
    }

    generateStudentSchedule() {
        return '<div class="placeholder">Schedule - Coming Soon!</div>';
    }

    generateStudentQuestions() {
        return '<div class="placeholder">Q&A Forum - Coming Soon!</div>';
    }

    generateAchievements() {
        return '<div class="placeholder">Achievements - Coming Soon!</div>';
    }

    generateSettings() {
        return '<div class="placeholder">Settings - Coming Soon!</div>';
    }

    generateDeveloperCourses() {
        return '<div class="placeholder">Developer Courses - Coming Soon!</div>';
    }

    generateStudentsOverview() {
        return '<div class="placeholder">Students Overview - Coming Soon!</div>';
    }

    generateDeveloperSchedule() {
        return '<div class="placeholder">Developer Schedule - Coming Soon!</div>';
    }

    generateDeveloperQuestions() {
        return '<div class="placeholder">Developer Q&A - Coming Soon!</div>';
    }

    generateAnalytics() {
        return '<div class="placeholder">Analytics - Coming Soon!</div>';
    }
}

// ===== INITIALIZE APPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
    window.techLearnPortal = new TechLearnPortal();
});

// ===== CSS ANIMATIONS (Add to stylesheet) =====
const additionalStyles = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
}

@keyframes slideOutRight {
    to {
        opacity: 0;
        transform: translateX(100%);
    }
}

.loading-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    color: var(--gray-500);
    font-size: var(--text-lg);
}

.placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    background: var(--white);
    border-radius: var(--radius-xl);
    color: var(--gray-500);
    font-size: var(--text-xl);
    font-weight: 600;
}

.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-6);
}

.welcome-card .quick-stats {
    display: flex;
    gap: var(--space-4);
    margin-top: var(--space-4);
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-3);
    background: var(--gray-50);
    border-radius: var(--radius);
}

.stat-number {
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--primary);
}

.stat-label {
    font-size: var(--text-sm);
    color: var(--gray-600);
}

.instructor-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--space-4);
    margin-top: var(--space-4);
}

.stat-card {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4);
    background: var(--gray-50);
    border-radius: var(--radius-lg);
    transition: all var(--transition-base);
}

.stat-card:hover {
    background: var(--gray-100);
    transform: translateY(-2px);
}

.stat-icon {
    font-size: var(--text-xl);
    color: var(--secondary);
}

.action-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-top: var(--space-4);
}

.action-btn {
    flex: 1;
    min-width: 150px;
}

.toast {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
}

.toast-content {
    display: flex;
    align-items: center;
    gap: var(--space-2);
}

.toast-close {
    background: none;
    border: none;
    color: var(--gray-400);
    cursor: pointer;
    padding: var(--space-1);
    border-radius: var(--radius-sm);
    transition: color var(--transition-base);
}

.toast-close:hover {
    color: var(--gray-600);
}

.activity-feed {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
}

.activity-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3);
    background: var(--gray-50);
    border-radius: var(--radius);
}

.activity-icon {
    color: var(--secondary);
    font-size: var(--text-lg);
}

.activity-content p {
    margin: 0;
    font-weight: 500;
}

.activity-time {
    font-size: var(--text-sm);
    color: var(--gray-500);
}

.no-data {
    text-align: center;
    color: var(--gray-500);
    font-style: italic;
    padding: var(--space-4);
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);