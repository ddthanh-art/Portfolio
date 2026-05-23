/* ============================================
   DO DUC THANH - Professional CV Website
   Main JavaScript
   ============================================
   
   Features:
   1. Loading Screen
   2. Scroll Progress Indicator
   3. Sticky Navigation
   4. Mobile Navigation Toggle
   5. Active Nav Link Highlighting
   6. Smooth Scrolling
   7. Hero Canvas Animation (Engineering Grid)
   8. Typing Effect
   9. Scroll Reveal Animations
   10. Animated Counters
   11. Skill Bars Animation
   12. Project Filter
   13. Gallery Lightbox
   14. Contact Form Handling
   15. Back to Top Button
   16. Current Year in Footer
   
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ============================================
       1. LOADING SCREEN
       ============================================ */
    const loader = document.getElementById('loader');

    window.addEventListener('load', function () {
        setTimeout(function () {
            loader.classList.add('hidden');
            // Allow scrolling after loader disappears
            document.body.style.overflow = '';
        }, 2200);
    });

    // Fallback: hide loader after 4 seconds max
    setTimeout(function () {
        if (!loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }, 4000);

    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    /* ============================================
       2. SCROLL PROGRESS INDICATOR
       ============================================ */
    const scrollProgress = document.getElementById('scrollProgress');

    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }

    /* ============================================
       3. STICKY NAVIGATION
       ============================================ */
    const navbar = document.getElementById('navbar');

    function handleNavScroll() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    /* ============================================
       4. MOBILE NAVIGATION TOGGLE
       ============================================ */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    /* ============================================
       5. ACTIVE NAV LINK HIGHLIGHTING
       ============================================ */
    const sections = document.querySelectorAll('section[id]');
    const navLinkElements = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinkElements.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* ============================================
       6. SMOOTH SCROLLING
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ============================================
       7. HERO CANVAS ANIMATION
       ============================================ */
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class for engineering grid effect
    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    Particle.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    };

    Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 176, ' + this.opacity + ')';
        ctx.fill();
    };

    // Create particles
    function createParticles() {
        particles = [];
        var count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
        for (var i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    createParticles();
    window.addEventListener('resize', createParticles);

    // Draw grid lines
    function drawGrid() {
        var gridSize = 80;
        ctx.strokeStyle = 'rgba(37, 99, 176, 0.06)';
        ctx.lineWidth = 1;

        // Vertical lines
        for (var x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Horizontal lines
        for (var y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }

    // Draw connections between nearby particles
    function drawConnections() {
        var maxDist = 150;
        for (var i = 0; i < particles.length; i++) {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    var opacity = (1 - dist / maxDist) * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(37, 99, 176, ' + opacity + ')';
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw engineering grid
        drawGrid();

        // Update and draw particles
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        // Draw connections
        drawConnections();

        animationId = requestAnimationFrame(animateCanvas);
    }

    animateCanvas();

    // Stop animation when not visible (performance)
    var heroSection = document.getElementById('hero');
    var heroObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                cancelAnimationFrame(animationId);
            } else {
                animateCanvas();
            }
        });
    }, { threshold: 0.1 });

    heroObserver.observe(heroSection);

    /* ============================================
       8. TYPING EFFECT
       ============================================ */
    var typingElement = document.getElementById('typingText');
    var typingTexts = [
        'Construction Engineer',
        'Project Management Specialist',
        'Construction Lecturer',
        'Site Supervision Engineer'
    ];
    var textIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typingSpeed = 80;

    function typeText() {
        var currentText = typingTexts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typingSpeed = 400;
        }

        setTimeout(typeText, typingSpeed);
    }

    // Start typing after loader
    setTimeout(typeText, 2500);

    /* ============================================
       9. SCROLL REVEAL ANIMATIONS
       ============================================ */
    var revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    /* ============================================
       10. ANIMATED COUNTERS
       ============================================ */
    var counters = document.querySelectorAll('.counter');
    var countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        counters.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-target'));
            var current = 0;
            var increment = Math.ceil(target / 60);
            var duration = 2000;
            var stepTime = duration / (target / increment);

            function updateCounter() {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                } else {
                    counter.textContent = current;
                    requestAnimationFrame(updateCounter);
                }
            }

            updateCounter();
        });

        countersAnimated = true;
    }

    // Observe hero stats for counter animation
    var statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        var statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    /* ============================================
       11. SKILL BARS ANIMATION
       ============================================ */
    var skillBars = document.querySelectorAll('.skill-bar-fill');
    var skillsAnimated = false;

    function animateSkillBars() {
        if (skillsAnimated) return;

        skillBars.forEach(function (bar, index) {
            var width = bar.getAttribute('data-width');
            setTimeout(function () {
                bar.style.width = width + '%';
            }, index * 100);
        });

        skillsAnimated = true;
    }

    var skillsSection = document.getElementById('skills');
    if (skillsSection) {
        var skillsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        skillsObserver.observe(skillsSection);
    }

    /* ============================================
       12. PROJECT FILTER
       ============================================ */
    var filterBtns = document.querySelectorAll('.filter-btn');
    var projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            // Update active button
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var filter = btn.getAttribute('data-filter');

            projectCards.forEach(function (card) {
                var category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // CSS animation keyframes for filter (injected via JS)
    var style = document.createElement('style');
    style.textContent = '@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }';
    document.head.appendChild(style);

    /* ============================================
       13. GALLERY LIGHTBOX
       ============================================ */
    var galleryItems = document.querySelectorAll('.gallery-item');
    var lightbox = document.getElementById('lightbox');
    var lightboxImage = document.getElementById('lightboxImage');
    var lightboxCaption = document.getElementById('lightboxCaption');
    var lightboxClose = document.querySelector('.lightbox-close');
    var lightboxPrev = document.querySelector('.lightbox-prev');
    var lightboxNext = document.querySelector('.lightbox-next');
    var currentGalleryIndex = 0;

    function openLightbox(index) {
        currentGalleryIndex = index;
        var item = galleryItems[index];
        var title = item.getAttribute('data-title') || 'Gallery Image';

        lightboxCaption.textContent = title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function prevLightbox() {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
        var item = galleryItems[currentGalleryIndex];
        lightboxCaption.textContent = item.getAttribute('data-title') || 'Gallery Image';
    }

    function nextLightbox() {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
        var item = galleryItems[currentGalleryIndex];
        lightboxCaption.textContent = item.getAttribute('data-title') || 'Gallery Image';
    }

    galleryItems.forEach(function (item, index) {
        item.addEventListener('click', function () {
            openLightbox(index);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevLightbox);
    lightboxNext.addEventListener('click', nextLightbox);

    // Close lightbox on background click
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function (e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevLightbox();
            if (e.key === 'ArrowRight') nextLightbox();
        }
    });

    /* ============================================
       14. CONTACT FORM HANDLING
       ============================================ */
    var contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        var name = document.getElementById('formName').value;
        var email = document.getElementById('formEmail').value;
        var subject = document.getElementById('formSubject').value;
        var message = document.getElementById('formMessage').value;

        // Simple validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show success message
        // In production, you would send this data to a server or email service
        showFormMessage('Thank you, ' + name + '! Your message has been sent successfully. I will get back to you soon.', 'success');
        contactForm.reset();
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFormMessage(msg, type) {
        // Remove existing message
        var existingMsg = document.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();

        var msgEl = document.createElement('div');
        msgEl.className = 'form-message';
        msgEl.style.cssText = 'padding: 16px; border-radius: 8px; margin-top: 16px; font-size: 0.9rem; font-weight: 500; text-align: center;';

        if (type === 'success') {
            msgEl.style.background = '#d4edda';
            msgEl.style.color = '#155724';
            msgEl.style.border = '1px solid #c3e6cb';
        } else {
            msgEl.style.background = '#f8d7da';
            msgEl.style.color = '#721c24';
            msgEl.style.border = '1px solid #f5c6cb';
        }

        msgEl.textContent = msg;
        contactForm.appendChild(msgEl);

        // Auto-remove after 5 seconds
        setTimeout(function () {
            if (msgEl.parentNode) {
                msgEl.remove();
            }
        }, 5000);
    }

    /* ============================================
       15. BACK TO TOP BUTTON
       ============================================ */
    var backToTop = document.getElementById('backToTop');

    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ============================================
       16. CURRENT YEAR IN FOOTER
       ============================================ */
    var yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ============================================
       SCROLL EVENT HANDLER
       (Combined for performance)
       ============================================ */
    var scrollTicking = false;

    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            requestAnimationFrame(function () {
                updateScrollProgress();
                handleNavScroll();
                updateActiveNavLink();
                handleBackToTop();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });

    // Initial calls
    handleNavScroll();
    updateScrollProgress();

    /* ============================================
       DOWNLOAD CV HANDLER
       ============================================ */
    var downloadBtn = document.getElementById('downloadCV');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function (e) {
            e.preventDefault();
            // In production, replace with actual CV file path
            // Example: window.location.href = 'assets/files/CV_DoDucThanh.pdf';
            alert('CV download functionality: Please replace this with your actual CV file path in the JavaScript code.\n\nPath: assets/files/CV_DoDucThanh.pdf');
        });
    }

}); // End DOMContentLoaded
