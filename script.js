document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const body = document.body;
    const profileToggle = document.getElementById('profile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const backToTopBtn = document.getElementById('back-to-top');
    
    // Dynamic text elements for state-swapping
    const heroBadgeText = document.getElementById('hero-badge-text');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroBio = document.getElementById('hero-bio');
    const experienceSubtitle = document.getElementById('experience-subtitle');
    
    // Contact & Mail links
    const mailLink = document.getElementById('mail-link');
    const contactEmail = document.getElementById('contact-email');
    
    // SVG Elements
    const svgAvatarTie = document.getElementById('svg-avatar-tie');
    const svgOrbitRing = document.getElementById('svg-orbit-ring');

    // Text Content Data for States
    const contentData = {
        current: {
            badge: 'IIM Jammu · IPM Coordinator',
            subtitle: 'Coordinator, IPM Placement Committee at IIM Jammu',
            bio: 'I am a driven IPM (Integrated Programme in Management) student at the Indian Institute of Management Jammu. As Coordinator of the IPM Placement Committee, I bridge the gap between 200+ talented students and industry-leading recruiters, coordinating internship pipelines and professional seminars. Deeply curious about data analytics, marketing, and strategy, I leverage analytical insights to solve real-world challenges.',
            expSubtitle: 'Positions of Responsibility and Leadership initiatives in my academic journey.',
            emailText: 'aadirbenl@gmail.com',
            emailHref: 'mailto:aadirbenl@gmail.com',
            badgeIcon: 'fa-graduation-cap'
        },
        vision: {
            badge: 'IIM Bangalore MBA · Strategy Leader',
            subtitle: 'Senior Strategy Consultant & BCG Alumnus',
            bio: 'I am a Senior Associate Consultant at Boston Consulting Group (BCG) and an MBA graduate from IIM Bangalore. My expertise lies in high-stakes strategy and consulting, including financial modeling, market sizing, and transaction due diligence. With a track record of driving cross-functional growth and advisory, I transform complex data into enterprise-scale strategic outcomes.',
            expSubtitle: 'Consulting engagements, corporate advisory internships, and case championships.',
            emailText: 'aadirbenl@gmail.com',
            emailHref: 'mailto:aadirbenl@gmail.com',
            badgeIcon: 'fa-briefcase'
        }
    };

    // ==========================================================================
    // DUAL STATE TOGGLE LOGIC
    // ==========================================================================
    profileToggle.addEventListener('change', (e) => {
        const state = e.target.checked ? 'vision' : 'current';
        
        // Add transition classes for smooth text fading
        const elementsToFade = [heroBadgeText, heroSubtitle, heroBio, experienceSubtitle, contactEmail];
        elementsToFade.forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(10px)';
                el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            }
        });

        setTimeout(() => {
            if (state === 'vision') {
                body.classList.remove('mode-current');
                body.classList.add('mode-vision');
                
                // Swap text values
                updateTextContent('vision');
                
                // Update SVG elements
                if (svgAvatarTie) svgAvatarTie.style.opacity = '1';
                if (svgOrbitRing) {
                    svgOrbitRing.setAttribute('stroke', 'url(#avatar-grad-vision)');
                    svgOrbitRing.style.transform = 'rotate(180deg)';
                }
            } else {
                body.classList.remove('mode-vision');
                body.classList.add('mode-current');
                
                // Swap text values
                updateTextContent('current');
                
                // Update SVG elements
                if (svgAvatarTie) svgAvatarTie.style.opacity = '0';
                if (svgOrbitRing) {
                    svgOrbitRing.setAttribute('stroke', 'url(#avatar-grad-current)');
                    svgOrbitRing.style.transform = 'rotate(0deg)';
                }
            }
            
            // Fade text elements back in
            elementsToFade.forEach(el => {
                if (el) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
            });
        }, 300);
    });

    function updateTextContent(state) {
        const data = contentData[state];
        
        if (heroBadgeText) {
            heroBadgeText.innerHTML = `<i class="fas ${data.badgeIcon}"></i> ${data.badge}`;
        }
        if (heroSubtitle) heroSubtitle.textContent = data.subtitle;
        if (heroBio) heroBio.textContent = data.bio;
        if (experienceSubtitle) experienceSubtitle.textContent = data.expSubtitle;
        
        // Update contact emails
        if (mailLink) mailLink.setAttribute('href', data.emailHref);
        if (contactEmail) {
            contactEmail.innerHTML = `<a href="${data.emailHref}">${data.emailText}</a>`;
        }
    }

    // ==========================================================================
    // MOBILE NAVIGATION MENU
    // ==========================================================================
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // ==========================================================================
    // SMOOTH SCROLL SPY
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.scrollY + 150; // offset for nav bar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });

        // Toggle back to top button
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Back to top button action
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================================================
    // CONTACT FORM INTERACTION
    // ==========================================================================
    const contactForm = document.getElementById('portfolio-contact-form');
    const successAlert = document.getElementById('form-success-alert');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form data (for mock submission)
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;

            // Simple visual indicator of sending
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

            setTimeout(() => {
                // Fade out form
                contactForm.style.opacity = '0';
                
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    // Fade in success alert
                    successAlert.style.display = 'flex';
                    setTimeout(() => {
                        successAlert.style.opacity = '1';
                    }, 50);
                }, 300);

                console.log('Form Submitted: ', { name, email, subject, message });
            }, 1500);
        });
    }
});
