// Main JavaScript file
// Handles global functionality and page initialization

class SpikeApp {
    constructor() {
        this.isInitialized = false;
        this.intersectionObserver = null;
        this.heroSliderInterval = null;
        this.currentSlide = 0;
    }

    // Initialize the application
    async init() {
        if (this.isInitialized) return;

        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Initialize core functionality
            this.initializeNavigation();
            this.initializeScrollEffects();
            this.initializeBackToTop();
            this.initializeLazyLoading();
            this.initializeHeroSlider();
            this.initializeForms();
            this.loadPageSpecificContent();

            this.isInitialized = true;
            console.log('Spike Salon app initialized successfully');
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    // Navigation functionality
    initializeNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu   = document.getElementById('nav-menu');
        const header    = document.getElementById('header');
        const overlay   = document.getElementById('nav-overlay'); // optional overlay

        if (navToggle && navMenu) {
            // a11y
            navToggle.setAttribute('aria-controls', 'nav-menu');
            if (!navToggle.hasAttribute('aria-expanded')) {
                navToggle.setAttribute('aria-expanded', 'false');
            }

            const openMenu = (open) => {
                navToggle.setAttribute('aria-expanded', String(open));
                navToggle.classList.toggle('nav__toggle--active', open);
                navMenu.classList.toggle('nav__menu--active', open);
                document.body.classList.toggle('nav-open', open);
                if (overlay) {
                    overlay.classList.toggle('is-visible', open);
                    overlay.hidden = !open;
                }
            };

            // Toggle click (do not bubble to document)
            navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = navMenu.classList.contains('nav__menu--active');
                openMenu(!isOpen);
            });

            // Keep clicks inside the menu from closing it
            navMenu.addEventListener('click', (e) => e.stopPropagation());

            // Close on overlay tap
            if (overlay) {
                overlay.addEventListener('click', () => openMenu(false));
            }

            // Close on outside click
            document.addEventListener('click', () => {
                if (navMenu.classList.contains('nav__menu--active')) {
                    openMenu(false);
                }
            });

            // Close on ESC for better accessibility
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('nav__menu--active')) {
                    openMenu(false);
                }
            });

            // Reset any mobile-open state when switching to desktop width
            const handleResize = () => {
                // If nav is visible as desktop (≥1024px per your CSS), ensure things are reset
                if (window.innerWidth >= 1024) {
                    openMenu(false);
                    document.body.style.overflow = '';
                }
            };
            window.addEventListener('resize', handleResize);
        }

        // Header scroll effect
        if (header) {
            let lastScrollY = window.scrollY;

            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;

                if (currentScrollY > 100) {
                    header.classList.add('header--scrolled');
                } else {
                    header.classList.remove('header--scrolled');
                }

                lastScrollY = currentScrollY;
            });
        }
    }

    // Scroll effects and animations
    initializeScrollEffects() {
        // Smooth scroll for anchor links
        document.addEventListener('click', (event) => {
            const target = event.target.closest('a[href^="#"]');
            if (target) {
                event.preventDefault();
                const targetId = target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });

        // Intersection Observer for fade-in animations
        if ('IntersectionObserver' in window) {
            this.intersectionObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('fade-in');
                            this.intersectionObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
            );

            // Observe elements for animation
            const animatedElements = document.querySelectorAll('.service-card, .testimonial, .feature, .blog-card');
            animatedElements.forEach(el => {
                this.intersectionObserver.observe(el);
            });
        }
    }

    // Back to top button
    initializeBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('back-to-top--visible');
            } else {
                backToTopBtn.classList.remove('back-to-top--visible');
            }
        });

        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Lazy loading for images
    initializeLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            // Observe all images with data-src
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Hero slider functionality
    initializeHeroSlider() {
        const slider = document.getElementById('hero-slider');
        if (!slider) return;

        const slides = slider.querySelectorAll('.hero__slide');
        const dots = document.querySelectorAll('.hero__dot');
        const prevBtn = document.getElementById('hero-prev');
        const nextBtn = document.getElementById('hero-next');

        if (slides.length === 0) return;

        // Auto-advance slider
        this.heroSliderInterval = setInterval(() => {
            this.nextSlide(slides, dots);
        }, 6000);

        // Manual navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                clearInterval(this.heroSliderInterval);
                this.prevSlide(slides, dots);
                this.restartSliderInterval(slides, dots);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                clearInterval(this.heroSliderInterval);
                this.nextSlide(slides, dots);
                this.restartSliderInterval(slides, dots);
            });
        }

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(this.heroSliderInterval);
                this.goToSlide(index, slides, dots);
                this.restartSliderInterval(slides, dots);
            });
        });

        // Pause on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(this.heroSliderInterval);
        });

        slider.addEventListener('mouseleave', () => {
            this.restartSliderInterval(slides, dots);
        });
    }

    nextSlide(slides, dots) {
        this.currentSlide = (this.currentSlide + 1) % slides.length;
        this.goToSlide(this.currentSlide, slides, dots);
    }

    prevSlide(slides, dots) {
        this.currentSlide = this.currentSlide === 0 ? slides.length - 1 : this.currentSlide - 1;
        this.goToSlide(this.currentSlide, slides, dots);
    }

    goToSlide(index, slides, dots) {
        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('hero__slide--active', i === index);
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('hero__dot--active', i === index);
        });

        this.currentSlide = index;
    }

    restartSliderInterval(slides, dots) {
        this.heroSliderInterval = setInterval(() => {
            this.nextSlide(slides, dots);
        }, 6000);
    }

    // Initialize forms
    initializeForms() {
        // Initialize booking form if present
        if (typeof BookingForm !== 'undefined') {
            BookingForm.initialize();
        }

        // Initialize contact form if present
        if (typeof ContactForm !== 'undefined') {
            ContactForm.initialize();
        }
    }

    // Load page-specific content
    async loadPageSpecificContent() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';

        // Clear DataLoader cache to ensure fresh data from localStorage
        if (window.DataLoader && window.DataLoader.cache) {
            window.DataLoader.cache.clear();
        }

        switch (page) {
            case 'index':
                await this.loadHomePage();
                break;
            case 'services':
                await this.loadServicesPage();
                break;
            case 'packages':
                await this.loadPackagesPage();
                break;
            case 'blog':
                await this.loadBlogPage();
                break;
            case 'post':
                await this.loadPostPage();
                break;
            case 'faq':
                await this.loadFAQPage();
                break;
            default:
                console.log(`No specific loader for page: ${page}`);
        }
    }

    // Home page specific functionality
    async loadHomePage() {
        try {
            // Load services preview
            const servicesContainer = document.getElementById('services-preview');
            if (servicesContainer) {
                const services = await window.DataLoader.getServices();
                const featuredServices = services.slice(0, 6); // Show first 6 services

                servicesContainer.innerHTML = featuredServices.map(service =>
                    UIComponents.generateServiceCard(service)
                ).join('');

                // Add event listeners for booking buttons
                this.attachBookingListeners(featuredServices);
            }
        } catch (error) {
            console.error('Error loading home page content:', error);
        }
    }

    // Services page functionality
    async loadServicesPage() {
        // This is handled in services.html inline script for now
        console.log('Services page loaded');
    }

    // Packages page functionality
    async loadPackagesPage() {
        try {
            const packagesContainer = document.getElementById('packages-grid');
            if (packagesContainer) {
                const packages = await window.DataLoader.getPackages();

                packagesContainer.innerHTML = packages.map(pkg =>
                    UIComponents.generatePackageCard(pkg)
                ).join('');

                // Add event listeners for booking buttons
                this.attachPackageBookingListeners(packages);
            }
        } catch (error) {
            console.error('Error loading packages:', error);
        }
    }

    // Blog page functionality
    async loadBlogPage() {
        try {
            const blogContainer = document.getElementById('blog-posts');
            if (blogContainer) {
                const posts = await window.DataLoader.getBlogPosts();

                blogContainer.innerHTML = posts.map(post =>
                    UIComponents.generateBlogCard(post)
                ).join('');
            }
        } catch (error) {
            console.error('Error loading blog posts:', error);
        }
    }

    // Single post page functionality
    async loadPostPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug') || window.location.hash.substring(1);

        if (!slug) {
            this.showPostNotFound();
            return;
        }

        try {
            const post = await window.DataLoader.getBlogPost(slug);
            if (!post) {
                this.showPostNotFound();
                return;
            }

            // Update page title
            document.title = `${post.title} - Spike Salon Blog`;

            // Load post content
            const postContainer = document.getElementById('post-content');
            if (postContainer) {
                postContainer.innerHTML = `
                    <article class="post">
                        <header class="post__header">
                            <div class="post__meta">
                                <span class="post__date">${DataHelpers.formatDate(post.date)}</span>
                                <span class="post__author">By ${post.author}</span>
                            </div>
                            <h1 class="post__title">${post.title}</h1>
                            <div class="post__tags">
                                ${post.tags.map(tag => `<span class="post__tag">${tag}</span>`).join('')}
                            </div>
                        </header>
                        <div class="post__image">
                            <img src="${post.image}" alt="${post.title}" loading="eager">
                        </div>
                        <div class="post__content">
                            ${post.contentHTML}
                        </div>
                    </article>
                `;
            }
        } catch (error) {
            console.error('Error loading post:', error);
            this.showPostNotFound();
        }
    }

    showPostNotFound() {
        const postContainer = document.getElementById('post-content');
        if (postContainer) {
            postContainer.innerHTML = UIComponents.generateErrorMessage(
                'Post not found. The requested blog post could not be loaded.',
                true
            );
        }
    }

    // FAQ page functionality
    async loadFAQPage() {
        try {
            const faqContainer = document.getElementById('faq-list');
            if (faqContainer) {
                const faqs = await window.DataLoader.getFAQs();

                faqContainer.innerHTML = faqs.map((faq, index) =>
                    UIComponents.generateFAQItem(faq, index)
                ).join('');

                // Initialize FAQ interactions
                this.initializeFAQs();
            }
        } catch (error) {
            console.error('Error loading FAQs:', error);
        }
    }

    // Initialize FAQ accordion functionality
    initializeFAQs() {
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                const answer = question.nextElementSibling;

                // Close all other FAQs
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== question) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherQuestion.parentElement.classList.remove('faq-item--active');
                        const otherAnswer = otherQuestion.nextElementSibling;
                        otherAnswer.style.maxHeight = null;
                    }
                });

                // Toggle current FAQ
                question.setAttribute('aria-expanded', (!isExpanded).toString());
                question.parentElement.classList.toggle('faq-item--active');

                if (!isExpanded) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = null;
                }
            });
        });
    }

    // Attach booking event listeners
    attachBookingListeners(services) {
        const bookButtons = document.querySelectorAll('.book-service');
        bookButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const serviceId = e.target.getAttribute('data-service-id');
                const service = services.find(s => s.id === serviceId);
                if (service) {
                    this.openBookingModal(service, false);
                }
            });
        });
    }

    // Attach package booking event listeners
    attachPackageBookingListeners(packages) {
        const bookButtons = document.querySelectorAll('.book-package');
        bookButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const packageId = e.target.getAttribute('data-package-id');
                const pkg = packages.find(p => p.id === packageId);
                if (pkg) {
                    this.openBookingModal(pkg, true);
                }
            });
        });
    }

    // Open booking modal
    openBookingModal(item, isPackage = false) {
        let modal = document.getElementById('booking-modal');

        if (!modal) {
            // Create modal if it doesn't exist
            modal = document.createElement('div');
            modal.id = 'booking-modal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal__overlay"></div>
                <div class="modal__content">
                    <div class="modal__header">
                        <h3 class="modal__title">Book ${isPackage ? 'Package' : 'Service'}</h3>
                        <button class="modal__close" id="close-booking-modal">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div class="modal__body" id="booking-form-container"></div>
                </div>
            `;
            document.body.appendChild(modal);

            // Add close event listeners
            modal.querySelector('#close-booking-modal').addEventListener('click', () => {
                this.closeBookingModal();
            });

            modal.querySelector('.modal__overlay').addEventListener('click', () => {
                this.closeBookingModal();
            });
        }

        // Generate and load form
        const formContainer = modal.querySelector('#booking-form-container');
        formContainer.innerHTML = BookingForm.generateForm(item, isPackage);
        BookingForm.initialize();

        // Show modal
        modal.classList.add('modal--active');
        document.body.classList.add('modal-open');
    }

    // Close booking modal
    closeBookingModal() {
        const modal = document.getElementById('booking-modal');
        if (modal) {
            modal.classList.remove('modal--active');
            document.body.classList.remove('modal-open');
        }
    }

    // Cleanup when page unloads
    cleanup() {
        if (this.heroSliderInterval) {
            clearInterval(this.heroSliderInterval);
        }

        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
    }
}

// Initialize app
const app = new SpikeApp();

// Start app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => app.cleanup());

// Make app
