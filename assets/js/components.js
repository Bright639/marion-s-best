// Reusable UI Components
// This module contains functions to generate and manage common UI elements

class UIComponents {
    constructor() {
        this.activeModals = new Set();
        this.activeToasts = new Map();
        this.toastCounter = 0;
    }

    // Header component
    static generateHeader(activePage = '') {
        return `
            <nav class="nav container" role="navigation" aria-label="Main navigation">
                <div class="nav__brand">
                    <a href="index.html" class="nav__logo" aria-label="Spike Salon Home">
                        <span class="nav__logo-text">SPIKE SALON</span>
                        <span class="nav__logo-tagline">Barbershop & Spa</span>
                    </a>
                </div>
                
                <div class="nav__menu" id="nav-menu">
                    <ul class="nav__list" role="menubar">
                        <li class="nav__item" role="none">
                            <a href="index.html" class="nav__link ${activePage === 'home' ? 'nav__link--active' : ''}" role="menuitem">Home</a>
                        </li>
                        <li class="nav__item" role="none">
                            <a href="about.html" class="nav__link ${activePage === 'about' ? 'nav__link--active' : ''}" role="menuitem">About</a>
                        </li>
                        <li class="nav__item" role="none">
                            <a href="services.html" class="nav__link ${activePage === 'services' ? 'nav__link--active' : ''}" role="menuitem">Services</a>
                        </li>
                        <li class="nav__item" role="none">
                            <a href="packages.html" class="nav__link ${activePage === 'packages' ? 'nav__link--active' : ''}" role="menuitem">Packages</a>
                        </li>
                        <li class="nav__item" role="none">
                            <a href="blog.html" class="nav__link ${activePage === 'blog' ? 'nav__link--active' : ''}" role="menuitem">Blog</a>
                        </li>
                        <li class="nav__item" role="none">
                            <a href="contact.html" class="nav__link ${activePage === 'contact' ? 'nav__link--active' : ''}" role="menuitem">Contact</a>
                        </li>
                        <li class="nav__item" role="none">
                            <a href="faq.html" class="nav__link ${activePage === 'faq' ? 'nav__link--active' : ''}" role="menuitem">FAQs</a>
                        </li>
                    </ul>
                </div>
                
                <div class="nav__actions">
                    <a href="contact.html" class="btn btn--primary">Book Now</a>
                    <button class="nav__toggle" id="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
                        <span class="nav__toggle-icon"></span>
                    </button>
                </div>
            </nav>
        `;
    }

    // Footer component
    static async generateFooter() {
        try {
            const siteData = await window.DataLoader.getSiteData();
            
            return `
                <div class="footer__grid container">
                    <div class="footer__section">
                        <h3>Spike Salon</h3>
                        <p style="color: var(--brand-muted); font-size: var(--text-sm); margin-bottom: var(--space-4);">
                            ${siteData.tagline}
                        </p>
                        <p style="color: var(--brand-muted); font-size: var(--text-sm); line-height: var(--leading-relaxed);">
                            Premium barbershop and spa services in the heart of Kitui Town. 
                            Experience professional grooming and beauty treatments.
                        </p>
                    </div>
                    
                    <div class="footer__section">
                        <h3>Quick Links</h3>
                        <div class="footer__links">
                            <a href="about.html" class="footer__link">About Us</a>
                            <a href="services.html" class="footer__link">Services</a>
                            <a href="packages.html" class="footer__link">Packages</a>
                            <a href="blog.html" class="footer__link">Blog</a>
                            <a href="contact.html" class="footer__link">Book Appointment</a>
                            <a href="faq.html" class="footer__link">FAQs</a>
                        </div>
                    </div>
                    
                    <div class="footer__section">
                        <h3>Contact Info</h3>
                        <div class="footer__contact-item">
                            <svg class="footer__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span>${siteData.phone}</span>
                        </div>
                        <div class="footer__contact-item">
                            <svg class="footer__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>${siteData.address}</span>
                        </div>
                        <div class="footer__contact-item">
                            <svg class="footer__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="4"></circle>
                                <path d="M16 8v5a3 3 0 0 0 6 0v-5a10 10 0 1 0-12 0"></path>
                            </svg>
                            <span>${siteData.hours.weekdays} (Mon-Sat)</span>
                        </div>
                    </div>
                    
                    <div class="footer__section">
                        <h3>Follow Us</h3>
                        <div class="footer__social">
                            <a href="https://vm.tiktok.com/ZMStHKN1k/@${siteData.social.tiktok.replace(' ', '')}" 
                               class="footer__social-link" 
                               aria-label="Follow us on TikTok"
                               target="_blank" 
                               rel="noopener noreferrer">
                                <svg class="footer__social-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.05z"/>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/${siteData.social.instagram.replace(' ', '')}" 
                               class="footer__social-link" 
                               aria-label="Follow us on Instagram"
                               target="_blank" 
                               rel="noopener noreferrer">
                                <svg class="footer__social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                            <a href="https://wa.me/${siteData.whatsapp}" 
                               class="footer__social-link" 
                               aria-label="Contact us on WhatsApp"
                               target="_blank" 
                               rel="noopener noreferrer">
                                <svg class="footer__social-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="footer__bottom container">
                    <p class="footer__copyright">
                        © 2024 Spike Salon Barbershop & Spa. All rights reserved.
                    </p>
                    <div class="footer__policies">
                        <a href="#privacy" class="footer__policy-link">Privacy Policy</a>
                        <a href="#terms" class="footer__policy-link">Terms & Conditions</a>
                        <a href="faq.html" class="footer__policy-link">Help & FAQs</a>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error generating footer:', error);
            return '<div class="container"><p>Footer content unavailable</p></div>';
        }
    }

    // Service card component
    static generateServiceCard(service) {
        return `
            <div class="service-card" data-category="${service.category}">
                <div class="service-card__image">
                    <img src="${service.image}" alt="${service.name}" loading="lazy">
                    <div class="service-card__badge">${service.duration}</div>
                </div>
                <div class="service-card__content">
                    <h3 class="service-card__title">${service.name}</h3>
                    <p class="service-card__description">${service.blurb}</p>
                    <div class="service-card__meta">
                        <div class="service-card__price">KSH ${service.price.toLocaleString()}</div>
                        <div class="service-card__payment ${service.paymentType === '50% deposit' ? 'service-card__payment--deposit' : ''}">${service.paymentType}</div>
                    </div>
                    <button class="btn btn--primary btn--full-width book-service" data-service-id="${service.id}">Book Now</button>
                </div>
            </div>
        `;
    }

    // Package card component
    static generatePackageCard(pkg) {
        return `
            <div class="service-card">
                <div class="service-card__image">
                    <img src="${pkg.image}" alt="${pkg.title}" loading="lazy">
                    <div class="service-card__badge">${pkg.duration}</div>
                </div>
                <div class="service-card__content">
                    <h3 class="service-card__title">${pkg.title}</h3>
                    <p class="service-card__description">${pkg.description}</p>
                    <div class="package-includes">
                        <h4 style="font-size: var(--text-sm); font-weight: var(--font-semibold); margin-bottom: var(--space-2); color: var(--color-gray-700);">Includes:</h4>
                        <ul style="font-size: var(--text-sm); color: var(--color-gray-600); margin-bottom: var(--space-4);">
                            ${pkg.includes.map(item => `<li style="margin-bottom: var(--space-1);">• ${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="service-card__meta">
                        <div class="service-card__price">KSH ${pkg.price.toLocaleString()}</div>
                        <div class="service-card__payment service-card__payment--deposit">${pkg.paymentType}</div>
                    </div>
                    <button class="btn btn--primary btn--full-width book-package" data-package-id="${pkg.id}">Book Package</button>
                </div>
            </div>
        `;
    }

    // Blog post card component
    static generateBlogCard(post) {
        return `
            <article class="blog-card">
                <div class="blog-card__image">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                </div>
                <div class="blog-card__content">
                    <div class="blog-card__meta">
                        <span class="blog-card__date">${DataHelpers.formatDate(post.date)}</span>
                        <span class="blog-card__author">By ${post.author}</span>
                    </div>
                    <h3 class="blog-card__title">
                        <a href="post.html#${post.slug}">${post.title}</a>
                    </h3>
                    <p class="blog-card__excerpt">${post.excerpt}</p>
                    <div class="blog-card__tags">
                        ${post.tags.map(tag => `<span class="blog-card__tag">${tag}</span>`).join('')}
                    </div>
                    <a href="post.html#${post.slug}" class="btn btn--secondary">Read More</a>
                </div>
            </article>
        `;
    }

    // FAQ item component
    static generateFAQItem(faq, index) {
        return `
            <div class="faq-item">
                <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${index}">
                    <span class="faq-question__text">${faq.question}</span>
                    <svg class="faq-question__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                </button>
                <div class="faq-answer" id="faq-answer-${index}">
                    <div class="faq-answer__content">
                        <p>${faq.answer}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Toast notification
    showToast(message, type = 'success', duration = 5000) {
        const toastId = `toast-${++this.toastCounter}`;
        
        const icons = {
            success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>`,
            error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                     <circle cx="12" cy="12" r="10"></circle>
                     <line x1="15" y1="9" x2="9" y2="15"></line>
                     <line x1="9" y1="9" x2="15" y2="15"></line>
                   </svg>`,
            warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                       <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                       <line x1="12" y1="9" x2="12" y2="13"></line>
                       <line x1="12" y1="17" x2="12.01" y2="17"></line>
                     </svg>`
        };

        const toastHTML = `
            <div class="toast toast--${type}" id="${toastId}">
                <div class="toast__content">
                    <div class="toast__icon">${icons[type] || icons.success}</div>
                    <div class="toast__message">${message}</div>
                    <button class="toast__close" onclick="UIComponents.prototype.hideToast('${toastId}')" aria-label="Close notification">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        // Add toast to DOM
        document.body.insertAdjacentHTML('beforeend', toastHTML);
        const toastElement = document.getElementById(toastId);
        
        // Show toast with animation
        setTimeout(() => {
            toastElement.classList.add('toast--visible');
        }, 100);

        // Store reference
        this.activeToasts.set(toastId, toastElement);

        // Auto-hide after duration
        setTimeout(() => {
            this.hideToast(toastId);
        }, duration);

        return toastId;
    }

    // Hide toast
    hideToast(toastId) {
        const toast = this.activeToasts.get(toastId);
        if (toast) {
            toast.classList.remove('toast--visible');
            setTimeout(() => {
                toast.remove();
                this.activeToasts.delete(toastId);
            }, 300);
        }
    }

    // Loading state component
    static generateLoadingSpinner(text = 'Loading...') {
        return `
            <div class="loading">
                <div class="spinner"></div>
                <span>${text}</span>
            </div>
        `;
    }

    // Error message component
    static generateErrorMessage(message, showRetry = false) {
        return `
            <div class="error-message" style="text-align: center; padding: var(--space-8); color: var(--color-error);">
                <svg style="width: 48px; height: 48px; margin-bottom: var(--space-4);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                <p style="font-size: var(--text-lg); margin-bottom: var(--space-4);">${message}</p>
                ${showRetry ? '<button class="btn btn--secondary" onclick="location.reload()">Try Again</button>' : ''}
            </div>
        `;
    }
}

// Create global instance
window.UIComponents = new UIComponents();

// Initialize common components when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Load footer
    const footerElement = document.getElementById('footer');
    if (footerElement) {
        try {
            footerElement.innerHTML = await UIComponents.generateFooter();
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }
});