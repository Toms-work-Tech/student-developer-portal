// Main Application
document.addEventListener('DOMContentLoaded', function() {
    // Sample Data (in a real app, this would come from your backend)
    const sampleStudents = [
        {
            id: 1,
            name: "John Doe",
            email: "john@student.com",
            password: "student123",
            role: "student",
            enrolledCourses: [1, 3],
            progress: {
                1: 35, // Course ID: Progress percentage
                3: 10
            }
        }
    ];

    const sampleDevelopers = [
        {
            id: 1,
            name: "Jane Smith",
            email: "jane@developer.com",
            password: "developer123",
            role: "developer",
            coursesTeaching: [1, 2],
            schedule: [
                {
                    courseId: 1,
                    date: "2023-06-15",
                    time: "14:00",
                    meetingLink: "https://meet.google.com/abc123"
                },
                {
                    courseId: 2,
                    date: "2023-06-16",
                    time: "10:00",
                    meetingLink: "https://meet.google.com/def456"
                }
            ]
        }
    ];

    const sampleCourses = [
        {
            id: 1,
            title: "JavaScript Fundamentals",
            description: "Learn the core concepts of JavaScript programming",
            category: "Programming",
            duration: "6 weeks",
            image: "https://source.unsplash.com/random/400x300/?javascript",
            lessons: [
                { id: 1, title: "Introduction to JS", duration: "30 min" },
                { id: 2, title: "Variables and Data Types", duration: "45 min" },
                { id: 3, title: "Functions", duration: "1 hour" }
            ]
        },
        {
            id: 2,
            title: "Web Design Principles",
            description: "Master the fundamentals of modern web design",
            category: "Design",
            duration: "4 weeks",
            image: "https://source.unsplash.com/random/400x300/?webdesign",
            lessons: [
                { id: 1, title: "Color Theory", duration: "30 min" },
                { id: 2, title: "Typography", duration: "45 min" }
            ]
        },
        {
            id: 3,
            title: "Python for Beginners",
            description: "Start your programming journey with Python",
            category: "Programming",
            duration: "8 weeks",
            image: "https://source.unsplash.com/random/400x300/?python",
            lessons: [
                { id: 1, title: "Python Setup", duration: "20 min" },
                { id: 2, title: "Basic Syntax", duration: "40 min" }
            ]
        }
    ];

    const sampleQuestions = [
        {
            id: 1,
            courseId: 1,
            studentId: 1,
            studentName: "John Doe",
            date: "2023-06-10 14:30",
            content: "I'm having trouble understanding how closures work in JavaScript. Can someone explain?",
            answers: [
                {
                    id: 1,
                    developerId: 1,
                    developerName: "Jane Smith",
                    date: "2023-06-10 15:45",
                    content: "Closures are functions that remember their lexical scope even when executed outside that scope. Think of them as functions with 'memory' of where they were defined."
                }
            ]
        }
    ];

    // DOM Elements
    const authContainer = document.getElementById('auth-container');
    const studentPortal = document.getElementById('student-portal');
    const developerPortal = document.getElementById('developer-portal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // Current User
    let currentUser = null;

    // Initialize Authentication Tabs
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            authForms.forEach(form => form.classList.remove('active'));
            document.getElementById(`${tabName}-form`).classList.add('active');
        });
    });

    // Login Functionality
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const role = document.getElementById('login-role').value;
        
        // Find user
        let user;
        if (role === 'student') {
            user = sampleStudents.find(u => u.email === email && u.password === password);
        } else {
            user = sampleDevelopers.find(u => u.email === email && u.password === password);
        }
        
        if (user) {
            currentUser = user;
            authContainer.style.display = 'none';
            
            if (role === 'student') {
                studentPortal.style.display = 'flex';
                loadStudentPortal();
            } else {
                developerPortal.style.display = 'flex';
                loadDeveloperPortal();
            }
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });

    // Signup Functionality
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const role = document.getElementById('signup-role').value;
        
        // In a real app, this would be an API call to your backend
        const newUser = {
            id: role === 'student' ? sampleStudents.length + 1 : sampleDevelopers.length + 1,
            name,
            email,
            password,
            role,
            enrolledCourses: [],
            progress: {}
        };
        
        if (role === 'student') {
            sampleStudents.push(newUser);
        } else {
            sampleDevelopers.push({
                ...newUser,
                coursesTeaching: [],
                schedule: []
            });
        }
        
        alert('Account created successfully! Please login.');
        document.querySelector('.auth-tab[data-tab="login"]').click();
        signupForm.reset();
    });

    // Load Student Portal
    function loadStudentPortal() {
        studentPortal.innerHTML = `
            <header class="portal-header">
                <h1>TechLearn Student Portal</h1>
                <div class="user-info">
                    <span>${currentUser.name}</span>
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=${encodeURIComponent('0A2463')}&color=fff" alt="User">
                    <button class="logout-btn">Logout</button>
                </div>
            </header>
            
            <div class="main-content">
                <nav class="sidebar">
                    <ul class="sidebar-nav">
                        <li><a href="#" class="active" data-section="dashboard"><i class="fas fa-home"></i> Dashboard</a></li>
                        <li><a href="#" data-section="courses"><i class="fas fa-graduation-cap"></i> My Courses</a></li>
                        <li><a href="#" data-section="available"><i class="fas fa-book-open"></i> Available Courses</a></li>
                        <li><a href="#" data-section="schedule"><i class="fas fa-calendar-alt"></i> Class Schedule</a></li>
                        <li><a href="#" data-section="questions"><i class="fas fa-question-circle"></i> Q&A Forum</a></li>
                    </ul>
                </nav>
                
                <div class="content-area" id="student-content">
                    <!-- Content will be loaded here -->
                </div>
            </div>
        `;
        
        // Load initial section
        loadStudentSection('dashboard');
        
        // Set up navigation
        const navLinks = studentPortal.querySelectorAll('.sidebar-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const section = this.getAttribute('data-section');
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Load section
                loadStudentSection(section);
            });
        });
        
        // Logout button
        studentPortal.querySelector('.logout-btn').addEventListener('click', logout);
    }

    // Load Student Sections
    function loadStudentSection(section) {
        const contentArea = document.getElementById('student-content');
        
        switch(section) {
            case 'dashboard':
                loadStudentDashboard(contentArea);
                break;
            case 'courses':
                loadStudentCourses(contentArea);
                break;
            case 'available':
                loadAvailableCourses(contentArea);
                break;
            case 'schedule':
                loadStudentSchedule(contentArea);
                break;
            case 'questions':
                loadStudentQuestions(contentArea);
                break;
            default:
                loadStudentDashboard(contentArea);
        }
    }

    function loadStudentDashboard(contentArea) {
        const enrolledCourses = sampleCourses.filter(course => 
            currentUser.enrolledCourses.includes(course.id)
        );
        
        const inProgressCourses = enrolledCourses.filter(course => 
            currentUser.progress[course.id] < 100
        );
        
        contentArea.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">My Learning Dashboard</h2>
                </div>
                <div class="welcome-message">
                    <p>Welcome back, ${currentUser.name}! Continue your learning journey.</p>
                </div>
                
                <div class="stats-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
                    <div class="stat-card" style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                        <h3 style="color: var(--gray); font-size: 0.9rem;">Enrolled Courses</h3>
                        <p style="font-size: 1.5rem; font-weight: 600; color: var(--primary);">${enrolledCourses.length}</p>
                    </div>
                    <div class="stat-card" style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                        <h3 style="color: var(--gray); font-size: 0.9rem;">Courses in Progress</h3>
                        <p style="font-size: 1.5rem; font-weight: 600; color: var(--primary);">${inProgressCourses.length}</p>
                    </div>
                    <div class="stat-card" style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                        <h3 style="color: var(--gray); font-size: 0.9rem;">Upcoming Classes</h3>
                        <p style="font-size: 1.5rem; font-weight: 600; color: var(--primary);">${getUpcomingClassesCount()}</p>
                    </div>
                </div>
                
                <h3 style="margin: 1.5rem 0 1rem;">Continue Learning</h3>
                <div class="courses-grid">
                    ${inProgressCourses.map(course => `
                        <div class="course-card">
                            <div class="course-image">
                                <img src="${course.image}" alt="${course.title}">
                            </div>
                            <h3 class="course-title">${course.title}</h3>
                            <p class="course-description">${course.description}</p>
                            <div class="course-meta">
                                <span>${course.duration}</span>
                                <span>${course.category}</span>
                            </div>
                            <div class="progress-container">
                                <div class="progress-label">
                                    <span>Progress</span>
                                    <span>${currentUser.progress[course.id]}%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${currentUser.progress[course.id]}%"></div>
                                </div>
                            </div>
                            <button class="btn btn-primary" style="margin-top: 1rem; width: 100%;" data-course="${course.id}">Continue</button>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Recent Activity</h2>
                </div>
                <div id="recent-activity">
                    ${generateRecentActivity()}
                </div>
            </div>
        `;
        
        // Add event listeners to continue buttons
        document.querySelectorAll('.btn[data-course]').forEach(btn => {
            btn.addEventListener('click', function() {
                const courseId = parseInt(this.getAttribute('data-course'));
                viewCourse(courseId);
            });
        });
    }

    function loadStudentCourses(contentArea) {
        const enrolledCourses = sampleCourses.filter(course => 
            currentUser.enrolledCourses.includes(course.id)
        );
        
        contentArea.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">My Courses</h2>
                </div>
                
                ${enrolledCourses.length > 0 ? `
                    <div class="courses-grid">
                        ${enrolledCourses.map(course => `
                            <div class="course-card">
                                <div class="course-image">
                                    <img src="${course.image}" alt="${course.title}">
                                </div>
                                <h3 class="course-title">${course.title}</h3>
                                <p class="course-description">${course.description}</p>
                                <div class="course-meta">
                                    <span>${course.duration}</span>
                                    <span>${course.category}</span>
                                </div>
                                <div class="progress-container">
                                    <div class="progress-label">
                                        <span>Progress</span>
                                        <span>${currentUser.progress[course.id]}%</span>
                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${currentUser.progress[course.id]}%"></div>
                                    </div>
                                </div>
                                <button class="btn btn-primary" style="margin-top: 1rem; width: 100%;" data-course="${course.id}">Continue</button>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <p>You haven't enrolled in any courses yet.</p>
                    <button class="btn btn-primary" id="browse-courses">Browse Available Courses</button>
                `}
            </div>
        `;
        
        // Add event listeners
        document.querySelectorAll('.btn[data-course]').forEach(btn => {
            btn.addEventListener('click', function() {
                const courseId = parseInt(this.getAttribute('data-course'));
                viewCourse(courseId);
            });
        });
        
        if (document.getElementById('browse-courses')) {
            document.getElementById('browse-courses').addEventListener('click', function() {
                studentPortal.querySelector('.sidebar-nav a[data-section="available"]').click();
            });
        }
    }

    function loadAvailableCourses(contentArea) {
        const availableCourses = sampleCourses.filter(course => 
            !currentUser.enrolledCourses.includes(course.id)
        );
        
        contentArea.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Available Courses</h2>
                </div>
                
                ${availableCourses.length > 0 ? `
                    <div class="courses-grid">
                        ${availableCourses.map(course => `
                            <div class="course-card">
                                <div class="course-image">
                                    <img src="${course.image}" alt="${course.title}">
                                </div>
                                <h3 class="course-title">${course.title}</h3>
                                <p class="course-description">${course.description}</p>
                                <div class="course-meta">
                                    <span>${course.duration}</span>
                                    <span>${course.category}</span>
                                </div>
                                <button class="btn btn-primary" style="margin-top: 1rem; width: 100%;" data-course="${course.id}">Enroll Now</button>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <p>No available courses at the moment. Check back later!</p>
                `}
            </div>
        `;
        
        // Add event listeners to enroll buttons
        document.querySelectorAll('.btn[data-course]').forEach(btn => {
            btn.addEventListener('click', function() {
                const courseId = parseInt(this.getAttribute('data-course'));
                enrollInCourse(courseId);
            });
        });
    }

    function loadStudentSchedule(contentArea) {
        // Get all classes for enrolled courses
        const allClasses = [];
        
        sampleDevelopers.forEach(dev => {
            dev.schedule.forEach(cls => {
                if (currentUser.enrolledCourses.includes(cls.courseId)) {
                    const course = sampleCourses.find(c => c.id === cls.courseId);
                    allClasses.push({
                        ...cls,
                        courseTitle: course.title,
                        developerName: dev.name
                    });
                }
            });
        });
        
        // Sort by date
        allClasses.sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));
        
        // Separate upcoming and past classes
        const now = new Date();
        const upcomingClasses = allClasses.filter(cls => new Date(`${cls.date} ${cls.time}`) > now);
        const pastClasses = allClasses.filter(cls => new Date(`${cls.date} ${cls.time}`) <= now);
        
        contentArea.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Class Schedule</h2>
                </div>
                
                <h3 style="margin: 1.5rem 0 1rem;">Upcoming Classes</h3>
                ${upcomingClasses.length > 0 ? `
                    ${upcomingClasses.map(cls => `
                        <div class="meeting-card">
                            <div class="meeting-info">
                                <h4>${cls.courseTitle}</h4>
                                <p>With ${cls.developerName}</p>
                                <p class="meeting-time">${formatDate(cls.date)} at ${cls.time}</p>
                            </div>
                            <div class="meeting-actions">
                                <a href="${cls.meetingLink}" target="_blank" class="join-btn">Join Class</a>
                            </div>
                        </div>
                    `).join('')}
                ` : `
                    <p>No upcoming classes scheduled.</p>
                `}
                
                <h3 style="margin: 1.5rem 0 1rem;">Past Classes</h3>
                ${pastClasses.length > 0 ? `
                    ${pastClasses.map(cls => `
                        <div class="meeting-card">
                            <div class="meeting-info">
                                <h4>${cls.courseTitle}</h4>
                                <p>With ${cls.developerName}</p>
                                <p class="meeting-time">${formatDate(cls.date)} at ${cls.time}</p>
                            </div>
                            <div class="meeting-actions">
                                <button class="btn" disabled>Completed</button>
                            </div>
                        </div>
                    `).join('')}
                ` : `
                    <p>No past classes to display.</p>
                `}
            </div>
        `;
    }

    function loadStudentQuestions(contentArea) {
        const userQuestions = sampleQuestions.filter(q => q.studentId === currentUser.id);
        const otherQuestions = sampleQuestions.filter(q => q.studentId !== currentUser.id && 
            currentUser.enrolledCourses.includes(q.courseId));
        
        contentArea.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Q&A Forum</h2>
                    <button class="btn btn-primary" id="ask-question">Ask Question</button>
                </div>
                
                <div id="questions-container">
                    <h3 style="margin: 1.5rem 0 1rem;">My Questions</h3>
                    ${userQuestions.length > 0 ? `
                        ${userQuestions.map(q => renderQuestion(q)).join('')}
                    ` : `
                        <p>You haven't asked any questions yet.</p>
                    `}
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Other Questions</h3>
                    ${otherQuestions.length > 0 ? `
                        ${otherQuestions.map(q => renderQuestion(q)).join('')}
                    ` : `
                        <p>No other questions to display.</p>
                    `}
                </div>
                
                <div id="question-form-container" style="display: none; margin-top: 2rem;">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Ask a New Question</h3>
                        </div>
                        <form id="new-question-form">
                            <div class="form-group">
                                <label for="question-course">Course</label>
                                <select id="question-course" required>
                                    <option value="">Select a course</option>
                                    ${sampleCourses.filter(c => currentUser.enrolledCourses.includes(c.id)).map(c => `
                                        <option value="${c.id}">${c.title}</option>
                                    `).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="question-content">Your Question</label>
                                <textarea id="question-content" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit Question</button>
                            <button type="button" class="btn" id="cancel-question" style="margin-left: 0.5rem;">Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        document.getElementById('ask-question').addEventListener('click', function() {
            document.getElementById('questions-container').style.display = 'none';
            document.getElementById('question-form-container').style.display = 'block';
        });
        
        document.getElementById('cancel-question').addEventListener('click', function() {
            document.getElementById('questions-container').style.display = 'block';
            document.getElementById('question-form-container').style.display = 'none';
        });
        
        document.getElementById('new-question-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const courseId = parseInt(document.getElementById('question-course').value);
            const content = document.getElementById('question-content').value;
            
            // In a real app, this would be an API call
            const newQuestion = {
                id: sampleQuestions.length + 1,
                courseId,
                studentId: currentUser.id,
                studentName: currentUser.name,
                date: new Date().toISOString(),
                content,
                answers: []
            };
            
            sampleQuestions.push(newQuestion);
            
            // Reset form
            this.reset();
            document.getElementById('questions-container').style.display = 'block';
            document.getElementById('question-form-container').style.display = 'none';
            
            // Reload questions
            loadStudentQuestions(contentArea);
        });
    }

    // Load Developer Portal
    function loadDeveloperPortal() {
        developerPortal.innerHTML = `
            <header class="portal-header">
                <h1>TechLearn Developer Portal</h1>
                <div class="user-info">
                    <span>${currentUser.name}</span>
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=${encodeURIComponent('FF6B35')}&color=fff" alt="User">
                    <button class="logout-btn">Logout</button>
                </div>
            </header>
            
            <div class="main-content">
                <nav class="sidebar">
                    <ul class="sidebar-nav">
                        <li><a href="#" class="active" data-section="dashboard"><i class="fas fa-home"></i> Dashboard</a></li>
                        <li><a href="#" data-section="classes"><i class="fas fa-chalkboard-teacher"></i> My Classes</a></li>
                        <li><a href="#" data-section="schedule"><i class="fas fa-calendar-alt"></i> Schedule</a></li>
                        <li><a href="#" data-section="questions"><i class="fas fa-question-circle"></i> Student Questions</a></li>
                    </ul>
                </nav>
                
                <div class="content-area" id="developer-content">
                    <!-- Content will be loaded here -->
                </div>
            </div>
        `;
        
        // Load initial section
        loadDeveloperSection('dashboard');
        
        // Set up navigation
        const navLinks = developerPortal.querySelectorAll('.sidebar-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const section = this.getAttribute('data-section');
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Load section
                loadDeveloperSection(section);
            });
        });
        
        // Logout button
        developerPortal.querySelector('.logout-btn').addEventListener('click', logout);
    }

    // Load Developer Sections
    function loadDeveloperSection(section) {
        const contentArea = document.getElementById('developer-content');
        
        switch(section) {
            case 'dashboard':
                loadDeveloperDashboard(contentArea);
                break;
            case 'classes':
                loadDeveloperClasses(contentArea);
                break;
            case 'schedule':
                loadDeveloperSchedule(contentArea);
                break;
            case 'questions':
                loadDeveloperQuestions(contentArea);
                break;
            default:
                loadDeveloperDashboard(contentArea);
        }
    }

    function loadDeveloperDashboard(contentArea) {
        const teachingCourses = sampleCourses.filter(course => 
            currentUser.coursesTeaching.includes(course.id)
        );
        
        // Get upcoming classes
        const upcomingClasses = currentUser.schedule.filter(cls => {
            const classDate = new Date(`${cls.date} ${cls.time}`);
            return classDate > new Date();
        });
        
        // Get unanswered questions
        const unansweredQuestions = sampleQuestions.filter(q => 
            currentUser.coursesTeaching.includes(q.courseId) && q.answers.length === 0
        );
        
        contentArea.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Teaching Dashboard</h2>
                </div>
                <div class="welcome-message">
                    <p>Welcome back, ${currentUser.name}! Here's your teaching overview.</p>
                </div>
                
                <div class="stats-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
                    <div class="stat-card" style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                        <h3 style="color: var(--gray); font-size: 0.9rem;">Courses Teaching</h3>
                        <p style="font-size: 1.5rem; font-weight: 600; color: var(--primary);">${teachingCourses.length}</p>
                    </div>
                    <div class="stat-card" style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                        <h3 style="color: var(--gray); font-size: 0.9rem;">Upcoming Classes</h3>
                        <p style="font-size: 1.5rem; font-weight: 600; color: var(--primary);">${upcomingClasses.length}</p>
                    </div>
                    <div class="stat-card" style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                        <h3 style="color: var(--gray); font-size: 0.9rem;">Unanswered Questions</h3>
                        <p style="font-size: 1.5rem; font-weight: 600; color: var(--primary);">${unansweredQuestions.length}</p>
                    </div>
                </div>
                
                <h3 style="margin: 1.5rem 0 1rem;">Upcoming Classes</h3>
                ${upcomingClasses.length > 0 ? `
                    ${upcomingClasses.map(cls => {
                        const course = sampleCourses.find(c => c.id === cls.courseId);
                        return `
                            <div class="meeting-card">
                                <div class="meeting-info">
                                    <h4>${course.title}</h4>
                                    <p class="meeting-time">${formatDate(cls.date)} at ${cls.time}</p>
                                </div>
                                <div class="meeting-actions">
                                    <a href="${cls.meetingLink}" target="_blank" class="join-btn">Start Class</a>
                                </div>
                            </div>
                        `;
                    }).join('')}
                ` : `
                    <p>No upcoming classes scheduled.</p>
                `}
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Recent Activity</h2>
                </div>
                <div id="recent-activity">
                    ${generateDeveloperActivity()}
                </div>
            </div>
        `;
    }

    function loadDeveloperClasses(contentArea) {
        const teachingCourses = sampleCourses.filter(course => 
            currentUser.coursesTeaching.includes(course.id)
        );
        
        contentArea.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">My Classes</h2>
                    <button class="btn btn-primary" id="add-class">Add New Class</button>
                </div>
                
                ${teachingCourses.length > 0 ? `
                    <div class="courses-grid">
                        ${teachingCourses.map(course => `
                            <div class="course-card">
                                <div class="course-image">
                                    <img src="${course.image}" alt="${course.title}">
                                </div>
                                <h3 class="course-title">${course.title}</h3>
                                <p class="course-description">${course.description}</p>
                                <div class="course-meta">
                                    <span>${course.duration}</span>
                                    <span>${course.category}</span>
                                </div>
                                <button class="btn btn-primary" style="margin-top: 1rem; width: 100%;" data-course="${course.id}">Manage Class</button>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <p>You're not teaching any classes yet.</p>
                `}
            </div>
            
            <div id="class-form-container" style="display: none; margin-top: 2rem;">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Add New Class</h3>
                    </div>
                    <form id="new-class-form">
                        <div class="form-group">
                            <label for="class-title">Class Title</label>
                            <input type="text" id="class-title" required>
                        </div>
                        <div class="form-group">
                            <label for="class-description">Description</label>
                            <textarea id="class-description" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="class-duration">Duration</label>
                            <input type="text" id="class-duration" required>
                        </div>
                        <div class="form-group">
                            <label for="class-category">Category</label>
                            <input type="text" id="class-category" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Create Class</button>
                        <button type="button" class="btn" id="cancel-class" style="margin-left: 0.5rem;">Cancel</button>
                    </form>
                </div>
            </div>
        `;
        
        // Add event listeners
        if (document.getElementById('add-class')) {
            document.getElementById('add-class').addEventListener('click', function() {
                document.getElementById('class-form-container').style.display = 'block';
            });
            
            document.getElementById('cancel-class').addEventListener('click', function() {
                document.getElementById('class-form-container').style.display = 'none';
            });
            
            document.getElementById('new-class-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const newCourse = {
                    id: sampleCourses.length + 1,
                    title: document.getElementById('class-title').value,
                    description: document.getElementById('class-description').value,
                    duration: document.getElementById('class-duration').value,
                    category: document.getElementById('class-category').value,
                    image: "https://source.unsplash.com/random/400x300/?coding",
                    lessons: []
                };
                
                sampleCourses.push(newCourse);
                currentUser.coursesTeaching.push(newCourse.id);
                
                // Reset form
                this.reset();
                document.getElementById('class-form-container').style.display = 'none';
                
                // Reload classes
                loadDeveloperClasses(contentArea);
            });
        }
    }

    function loadDeveloperSchedule(contentArea) {
        // Sort schedule by date
        const sortedSchedule = [...currentUser.schedule].sort((a, b) => 
            new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`)
        );
        
        contentArea.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Teaching Schedule</h2>
                    <button class="btn btn-primary" id="add-session">Schedule New Session</button>
                </div>
                
                ${sortedSchedule.length > 0 ? `
                    <h3 style="margin: 1.5rem 0 1rem;">Upcoming Sessions</h3>
                    ${sortedSchedule.map(session => {
                        const course = sampleCourses.find(c => c.id === session.courseId);
                        return `
                            <div class="meeting-card">
                                <div class="meeting-info">
                                    <h4>${course.title}</h4>
                                    <p class="meeting-time">${formatDate(session.date)} at ${session.time}</p>
                                </div>
                                <div class="meeting-actions">
                                    <a href="${session.meetingLink}" target="_blank" class="join-btn">Start Meeting</a>
                                    <button class="btn" data-session="${session.courseId}-${session.date}" style="margin-left: 0.5rem;">Cancel</button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                ` : `
                    <p>No teaching sessions scheduled.</p>
                `}
            </div>
            
            <div id="session-form-container" style="display: none; margin-top: 2rem;">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Schedule New Session</h3>
                    </div>
                    <form id="new-session-form">
                        <div class="form-group">
                            <label for="session-course">Course</label>
                            <select id="session-course" required>
                                <option value="">Select a course</option>
                                ${sampleCourses.filter(c => currentUser.coursesTeaching.includes(c.id)).map(c => `
                                    <option value="${c.id}">${c.title}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="session-date">Date</label>
                            <input type="date" id="session-date" required>
                        </div>
                        <div class="form-group">
                            <label for="session-time">Time</label>
                            <input type="time" id="session-time" required>
                        </div>
                        <div class="form-group">
                            <label for="session-link">Google Meet Link</label>
                            <input type="url" id="session-link" required placeholder="https://meet.google.com/abc-xyz">
                        </div>
                        <button type="submit" class="btn btn-primary">Schedule Session</button>
                        <button type="button" class="btn" id="cancel-session" style="margin-left: 0.5rem;">Cancel</button>
                    </form>
                </div>
            </div>
        `;
        
        // Add event listeners
        document.getElementById('add-session').addEventListener('click', function() {
            document.getElementById('session-form-container').style.display = 'block';
        });
        
        document.getElementById('cancel-session').addEventListener('click', function() {
            document.getElementById('session-form-container').style.display = 'none';
        });
        
        document.getElementById('new-session-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newSession = {
                courseId: parseInt(document.getElementById('session-course').value),
                date: document.getElementById('session-date').value,
                time: document.getElementById('session-time').value,
                meetingLink: document.getElementById('session-link').value
            };
            
            currentUser.schedule.push(newSession);
            
            // Reset form
            this.reset();
            document.getElementById('session-form-container').style.display = 'none';
            
            // Reload schedule
            loadDeveloperSchedule(contentArea);
        });
    }

    function loadDeveloperQuestions(contentArea) {
        const questionsToAnswer = sampleQuestions.filter(q => 
            currentUser.coursesTeaching.includes(q.courseId)
        );
        
        contentArea.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Student Questions</h2>
                </div>
                
                ${questionsToAnswer.length > 0 ? `
                    ${questionsToAnswer.map(q => {
                        const course = sampleCourses.find(c => c.id === q.courseId);
                        return `
                            <div class="question-card">
                                <div class="question-header">
                                    <div>
                                        <span class="question-author">${q.studentName}</span>
                                        <span>asked about </span>
                                        <span class="question-course">${course.title}</span>
                                    </div>
                                    <span class="question-date">${formatDateTime(q.date)}</span>
                                </div>
                                <div class="question-content">
                                    <p>${q.content}</p>
                                </div>
                                
                                ${q.answers.length > 0 ? `
                                    <div class="answers-container" style="margin-top: 1rem;">
                                        <h4 style="margin-bottom: 0.5rem;">Answers</h4>
                                        ${q.answers.map(a => `
                                            <div class="answer-card" style="background: #f8f9fa; padding: 1rem; border-radius: 5px; margin-bottom: 0.5rem;">
                                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                                    <span style="font-weight: 600;">${a.developerName}</span>
                                                    <span style="color: var(--gray); font-size: 0.8rem;">${formatDateTime(a.date)}</span>
                                                </div>
                                                <p>${a.content}</p>
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : ''}
                                
                                <form class="answer-form" data-question="${q.id}">
                                    <textarea placeholder="Write your answer..." required></textarea>
                                    <button type="submit" class="btn btn-primary">Post Answer</button>
                                </form>
                            </div>
                        `;
                    }).join('')}
                ` : `
                    <p>No student questions to display.</p>
                `}
            </div>
        `;
        
        // Add event listeners to answer forms
        document.querySelectorAll('.answer-form').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const questionId = parseInt(this.getAttribute('data-question'));
                const content = this.querySelector('textarea').value;
                
                // Find the question
                const question = sampleQuestions.find(q => q.id === questionId);
                
                if (question) {
                    question.answers.push({
                        id: question.answers.length + 1,
                        developerId: currentUser.id,
                        developerName: currentUser.name,
                        date: new Date().toISOString(),
                        content
                    });
                    
                    // Clear the textarea
                    this.querySelector('textarea').value = '';
                    
                    // Reload questions to show the new answer
                    loadDeveloperQuestions(contentArea);
                }
            });
        });
    }

    // Helper Functions
    function logout() {
        currentUser = null;
        studentPortal.style.display = 'none';
        developerPortal.style.display = 'none';
        authContainer.style.display = 'flex';
    }

    function enrollInCourse(courseId) {
        if (!currentUser.enrolledCourses.includes(courseId)) {
            currentUser.enrolledCourses.push(courseId);
            currentUser.progress[courseId] = 0;
            alert('Enrolled successfully!');
            loadStudentSection('courses');
        } else {
            alert('You are already enrolled in this course.');
        }
    }

    function viewCourse(courseId) {
        const course = sampleCourses.find(c => c.id === courseId);
        const progress = currentUser.progress[courseId] || 0;
        
        const contentArea = document.getElementById('student-content');
        contentArea.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">${course.title}</h2>
                    <span>${progress}% complete</span>
                </div>
                
                <div style="display: flex; gap: 2rem; margin-top: 1.5rem;">
                    <div style="flex: 1;">
                        <div class="course-image" style="height: 200px;">
                            <img src="${course.image}" alt="${course.title}">
                        </div>
                        <p style="margin-top: 1rem;">${course.description}</p>
                        
                        <div class="progress-container" style="margin-top: 1.5rem;">
                            <div class="progress-label">
                                <span>Overall Progress</span>
                                <span>${progress}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progress}%"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="flex: 1;">
                        <h3 style="margin-bottom: 1rem;">Course Content</h3>
                        <div class="lessons-list">
                            ${course.lessons.map((lesson, index) => `
                                <div class="lesson-item" style="padding: 1rem; border-bottom: 1px solid var(--gray); display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <h4 style="margin-bottom: 0.3rem;">Lesson ${index + 1}: ${lesson.title}</h4>
                                        <p style="color: var(--gray); font-size: 0.9rem;">${lesson.duration}</p>
                                    </div>
                                    <button class="btn btn-primary" data-lesson="${lesson.id}" data-course="${course.id}">Start</button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners to lesson buttons
        document.querySelectorAll('.btn[data-lesson]').forEach(btn => {
            btn.addEventListener('click', function() {
                const lessonId = parseInt(this.getAttribute('data-lesson'));
                const courseId = parseInt(this.getAttribute('data-course'));
                startLesson(courseId, lessonId);
            });
        });
    }

    function startLesson(courseId, lessonId) {
        // In a real app, this would track progress in the backend
        const course = sampleCourses.find(c => c.id === courseId);
        const totalLessons = course.lessons.length;
        const lessonsCompleted = Math.floor((currentUser.progress[courseId] / 100) * totalLessons);
        
        // Calculate new progress
        const newProgress = Math.min(100, Math.round(((lessonsCompleted + 1) / totalLessons) * 100));
        currentUser.progress[courseId] = newProgress;
        
        alert(`Starting Lesson ${lessonId} of Course ${courseId}. Your progress is now ${newProgress}%`);
        viewCourse(courseId);
    }

    function getUpcomingClassesCount() {
        let count = 0;
        
        sampleDevelopers.forEach(dev => {
            dev.schedule.forEach(cls => {
                if (currentUser.enrolledCourses.includes(cls.courseId)) {
                    const classDate = new Date(`${cls.date} ${cls.time}`);
                    if (classDate > new Date()) {
                        count++;
                    }
                }
            });
        });
        
        return count;
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function formatDateTime(dateTimeString) {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateTimeString).toLocaleDateString(undefined, options);
    }

    function generateRecentActivity() {
        // This would be more dynamic in a real app
        return `
            <ul style="list-style: none;">
                <li style="padding: 0.8rem 0; border-bottom: 1px solid var(--gray); display: flex; align-items: center; gap: 1rem;">
                    <i class="fas fa-book" style="color: var(--accent);"></i>
                    <span>You completed "Variables and Data Types" in JavaScript Fundamentals</span>
                </li>
                <li style="padding: 0.8rem 0; border-bottom: 1px solid var(--gray); display: flex; align-items: center; gap: 1rem;">
                    <i class="fas fa-question" style="color: var(--secondary);"></i>
                    <span>You asked a question about JavaScript closures</span>
                </li>
                <li style="padding: 0.8rem 0; display: flex; align-items: center; gap: 1rem;">
                    <i class="fas fa-chalkboard-teacher" style="color: var(--primary);"></i>
                    <span>Attended live class on Web Design Principles</span>
                </li>
            </ul>
        `;
    }

    function generateDeveloperActivity() {
        return `
            <ul style="list-style: none;">
                <li style="padding: 0.8rem 0; border-bottom: 1px solid var(--gray); display: flex; align-items: center; gap: 1rem;">
                    <i class="fas fa-chalkboard-teacher" style="color: var(--accent);"></i>
                    <span>You conducted a live session on JavaScript Fundamentals</span>
                </li>
                <li style="padding: 0.8rem 0; border-bottom: 1px solid var(--gray); display: flex; align-items: center; gap: 1rem;">
                    <i class="fas fa-question" style="color: var(--secondary);"></i>
                    <span>You answered a student question about Python syntax</span>
                </li>
                <li style="padding: 0.8rem 0; display: flex; align-items: center; gap: 1rem;">
                    <i class="fas fa-calendar-plus" style="color: var(--primary);"></i>
                    <span>Scheduled a new session for Web Design Principles</span>
                </li>
            </ul>
        `;
    }

    function renderQuestion(question) {
        const course = sampleCourses.find(c => c.id === question.courseId);
        return `
            <div class="question-card">
                <div class="question-header">
                    <div>
                        <span class="question-author">${question.studentName}</span>
                        <span>asked about </span>
                        <span class="question-course">${course.title}</span>
                    </div>
                    <span class="question-date">${formatDateTime(question.date)}</span>
                </div>
                <div class="question-content">
                    <p>${question.content}</p>
                </div>
                
                ${question.answers.length > 0 ? `
                    <div class="answers-container" style="margin-top: 1rem;">
                        <h4 style="margin-bottom: 0.5rem;">${question.answers.length} Answer${question.answers.length !== 1 ? 's' : ''}</h4>
                        ${question.answers.map(a => `
                            <div class="answer-card" style="background: #f8f9fa; padding: 1rem; border-radius: 5px; margin-bottom: 0.5rem;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                    <span style="font-weight: 600;">${a.developerName}</span>
                                    <span style="color: var(--gray); font-size: 0.8rem;">${formatDateTime(a.date)}</span>
                                </div>
                                <p>${a.content}</p>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <p style="color: var(--gray); font-style: italic;">No answers yet.</p>
                `}
            </div>
        `;
    }
});