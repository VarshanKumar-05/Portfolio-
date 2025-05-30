// script.js
        document.addEventListener('DOMContentLoaded', () => {
            // Preloader
            const preloader = document.getElementById('preloader');
            if (preloader) {
                window.addEventListener('load', () => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500); // Wait for transition to finish
                });
            }

            // Smooth Scroll Navigation
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }

                    // Close mobile nav if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        burgerMenu.classList.remove('toggle');
                    }
                });
            });

            // Mobile Navigation Toggle
            const burgerMenu = document.querySelector('.burger-menu');
            const navLinks = document.querySelector('.nav-links');

            if (burgerMenu && navLinks) {
                burgerMenu.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                    burgerMenu.classList.toggle('toggle'); // For burger icon animation
                });
            }

            // Dark/Light Theme Toggle
            const themeToggle = document.getElementById('theme-toggle');
            const body = document.body;

            if (themeToggle && body) {
                // Check for saved theme in localStorage
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme) {
                    body.classList.add(savedTheme);
                    if (savedTheme === 'dark-theme') {
                        themeToggle.checked = true;
                    }
                } else {
                    // Default to light theme if no preference saved
                    body.classList.add('light-theme');
                }

                themeToggle.addEventListener('change', () => {
                    if (themeToggle.checked) {
                        body.classList.remove('light-theme');
                        body.classList.add('dark-theme');
                        localStorage.setItem('theme', 'dark-theme');
                    } else {
                        body.classList.remove('dark-theme');
                        body.classList.add('light-theme');
                        localStorage.setItem('theme', 'light-theme');
                    }
                });
            }

            // Typewriter Animation for Hero Section
            const typewriterText = document.getElementById('typewriter-text');
            const skills = ['A Passionate Student of Artificial Intelligence'];
            let skillIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typingSpeed = 150; // milliseconds
            let deletingSpeed = 40;
            let delayBetweenSkills = 2000; // milliseconds

            function typeWriter() {
                if (!typewriterText) return; // Exit if element doesn't exist

                const currentSkill = skills[skillIndex];

                if (isDeleting) {
                    typewriterText.textContent = currentSkill.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typewriterText.textContent = currentSkill.substring(0, charIndex + 1);
                    charIndex++;
                }

                if (!isDeleting && charIndex === currentSkill.length) {
                    // Pause at end of word
                    typingSpeed = delayBetweenSkills;
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    skillIndex = (skillIndex + 1) % skills.length;
                    typingSpeed = 100; // Reset typing speed
                }

                setTimeout(typeWriter, isDeleting ? deletingSpeed : typingSpeed);
            }
            if (typewriterText) { // Only run if element exists
                typeWriter();
            }


            // Animated Progress Bars (Skills Section)
            const skillBars = document.querySelectorAll('.progress-bar');
            const skillsSection = document.getElementById('skills');

            const animateSkillBars = () => {
                skillBars.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-width') || '0%';
                    bar.style.width = '0%'; // Reset to 0 for animation
                    // Use a small timeout to ensure the reset takes effect before animating
                    setTimeout(() => {
                        bar.style.width = targetWidth; // Animate to target width
                    }, 50);
                });
            };

            // Observer to trigger animation when skills section is in view
            if (skillsSection) {
                const observerOptions = {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.5 // Trigger when 50% of the section is visible
                };

                const skillsObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateSkillBars();
                            observer.unobserve(entry.target); // Stop observing once animated
                        }
                    });
                }, observerOptions);

                skillsObserver.observe(skillsSection);
            }

            // Scroll-to-Top Button
            const scrollToTopBtn = document.getElementById('scrollToTopBtn');

            if (scrollToTopBtn) {
                window.addEventListener('scroll', () => {
                    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                        scrollToTopBtn.style.display = 'block';
                    } else {
                        scrollToTopBtn.style.display = 'none';
                    }
                });

                scrollToTopBtn.addEventListener('click', () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }

            // Contact Form Validation (Basic Example)
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');
                const subjectInput = document.getElementById('subject');
                const messageInput = document.getElementById('message');
                const nameError = document.getElementById('name-error');
                const emailError = document.getElementById('email-error');
                const subjectError = document.getElementById('subject-error');
                const messageError = document.getElementById('message-error');
                const formStatus = document.getElementById('form-status');

                const validateEmail = (email) => {
                    return String(email)
                        .toLowerCase()
                        .match(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        );
                };

                contactForm.addEventListener('submit', (e) => {
                    e.preventDefault(); // Prevent default form submission

                    let isValid = true;

                    // Name validation
                    if (nameInput.value.trim() === '') {
                        nameError.textContent = 'Name is required.';
                        nameError.style.display = 'block';
                        isValid = false;
                    } else {
                        nameError.style.display = 'none';
                    }

                    // Email validation
                    if (emailInput.value.trim() === '') {
                        emailError.textContent = 'Email is required.';
                        emailError.style.display = 'block';
                        isValid = false;
                    } else if (!validateEmail(emailInput.value.trim())) {
                        emailError.textContent = 'Please enter a valid email address.';
                        emailError.style.display = 'block';
                        isValid = false;
                    } else {
                        emailError.style.display = 'none';
                    }

                    // Subject validation
                    if (subjectInput.value.trim() === '') {
                        subjectError.textContent = 'Subject is required.';
                        subjectError.style.display = 'block';
                        isValid = false;
                    } else {
                        subjectError.style.display = 'none';
                    }

                    // Message validation
                    if (messageInput.value.trim() === '') {
                        messageError.textContent = 'Message is required.';
                        messageError.style.display = 'block';
                        isValid = false;
                    } else {
                        messageError.style.display = 'none';
                    }

                    if (isValid) {
                        // If validation passes, you can simulate sending the form data
                        // In a real application, you would use fetch() or XMLHttpRequest
                        // to send this data to a backend server (e.js., Node.js, Python Flask, PHP)
                        // which would then handle sending the email.
                        formStatus.textContent = 'Sending message...';
                        formStatus.style.color = 'var(--primary-color)';

                        // Simulate API call delay
                        setTimeout(() => {
                            formStatus.textContent = 'Message sent successfully!';
                            formStatus.style.color = 'green';
                            contactForm.reset(); // Clear the form
                        }, 2000);
                    } else {
                        formStatus.textContent = 'Please correct the errors above.';
                        formStatus.style.color = '#dc3545'; // Red for error status
                    }
                });
            }

            // Set current year in footer
            const currentYearSpan = document.getElementById('current-year');
            if (currentYearSpan) {
                currentYearSpan.textContent = new Date().getFullYear();
            }

            // Gemini API Integration: Project Description Enhancer
            const enhanceDescriptionButtons = document.querySelectorAll('.btn-enhance-desc');
            const descriptionModalOverlay = document.getElementById('descriptionModalOverlay');
            const closeModalBtn = document.getElementById('closeModalBtn');
            const modalProjectTitle = document.getElementById('modalProjectTitle');
            const enhancedDescriptionText = document.getElementById('enhancedDescriptionText');
            const modalLoadingSpinner = document.getElementById('modalLoadingSpinner');

            // Function to show the modal
            const showModal = () => {
                descriptionModalOverlay.classList.add('active');
            };

            // Function to hide the modal
            const hideModal = () => {
                descriptionModalOverlay.classList.remove('active');
                // Clear content when closing
                modalProjectTitle.textContent = '';
                enhancedDescriptionText.textContent = '';
                modalLoadingSpinner.style.display = 'none';
            };

            // Close modal when close button is clicked
            if (closeModalBtn) {
                closeModalBtn.addEventListener('click', hideModal);
            }

            // Close modal when clicking outside the content
            if (descriptionModalOverlay) {
                descriptionModalOverlay.addEventListener('click', (e) => {
                    if (e.target === descriptionModalOverlay) {
                        hideModal();
                    }
                });
            }

            // Add event listeners to all enhance description buttons
            enhanceDescriptionButtons.forEach(button => {
                button.addEventListener('click', async () => {
                    const projectTitle = button.dataset.projectTitle;
                    const projectTech = button.dataset.projectTech;
                    const projectDesc = button.dataset.projectDesc;

                    // Show modal and loading spinner
                    showModal();
                    modalProjectTitle.textContent = `${projectDesc}`;
                    enhancedDescriptionText.textContent = ''; // Clear previous content
                    modalLoadingSpinner.style.display = 'block'; // Show spinner

                    const prompt = `Given the following project details:
Title: ${projectTitle}
Technologies: ${projectTech}
Current Description: ${projectDesc}

Please generate a more detailed and engaging description for this project, suitable for a professional portfolio. Focus on the problem it solves, key features, and impact. Keep it concise, around 100-150 words.`;

                    let chatHistory = [];
                    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

                    const payload = { contents: chatHistory };
                    const apiKey = ""; // Leave this as-is; Canvas will provide the key at runtime.
                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                    try {
                        const response = await fetch(apiUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });

                        const result = await response.json();
                        if (result.candidates && result.candidates.length > 0 &&
                            result.candidates[0].content && result.candidates[0].content.parts &&
                            result.candidates[0].content.parts.length > 0) {
                            const text = result.candidates[0].content.parts[0].text;
                            enhancedDescriptionText.textContent = text;
                        } else {
                            enhancedDescriptionText.textContent = 'Failed to generate description. Please try again.';
                            console.error('Gemini API response structure unexpected:', result);
                        }
                    } catch (error) {
                        enhancedDescriptionText.textContent = 'Error generating description. Please check your network or try again later.';
                        console.error('Error calling Gemini API:', error);
                    } finally {
                        modalLoadingSpinner.style.display = 'none'; // Hide spinner
                    }
                });
            });
        });
    