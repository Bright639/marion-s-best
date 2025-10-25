// Data Loader Module
// Handles fetching and caching of JSON data
class DataLoader {
    constructor() {
        this.cache = new Map();
        this.baseURL = window.location.origin;
    }

    // Generic fetch with caching
    async fetchData(url, fallbackData = null) {
        try {
            // Check for admin overrides first
            const adminKey = url.replace('data/', '').replace('.json', '');
            const adminData = localStorage.getItem(`admin-${adminKey}`);
            if (adminData) {
                const parsedData = JSON.parse(adminData);
                this.cache.set(url, parsedData);
                return parsedData;
            }
            
            // Check cache first
            if (this.cache.has(url)) {
                return this.cache.get(url);
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Cache the data
            this.cache.set(url, data);
            
            return data;
        } catch (error) {
            console.warn(`Failed to load data from ${url}:`, error);
            
            // Return fallback data if provided
            if (fallbackData) {
                this.cache.set(url, fallbackData);
                return fallbackData;
            }
            
            throw error;
        }
    }

    // Site configuration
    async getSiteData() {
        const fallback = {
            name: "Spike Salon Barbershop & Spa",
            tagline: "Style for Him. Glam for Her",
            phone: "+254 741 097 004",
            whatsapp: "+254741097004",
            email: "info@spikesalon.com",
            address: "Kitui Town, Opposite Kasue Pharmacy",
            social: {
                tiktok: "Spike SBS",
                instagram: "Spike SBS"
            },
            hours: {
                weekdays: "8:00 AM - 8:00 PM",
                saturday: "8:00 AM - 8:00 PM",
                sunday: "Closed"
            },
            policies: {
                cancellation: "Cancellations must be made at least 24 hours in advance to avoid charges.",
                reschedule: "Rescheduling is allowed up to 2 hours before your appointment time.",
                deposit: "Some services require a 50% deposit to secure your booking."
            }
        };

        return await this.fetchData('data/site.json', fallback);
    }

    // Services data
    async getServices() {
        const fallback = [
            {
                id: "clean-shave",
                name: "Clean Shave",
                blurb: "Ultimate smooth shave by expert barbers.",
                duration: "30 min",
                price: 800,
                paymentType: "Pay on delivery",
                image: "assets/img/services/clean-shave.jpg",
                category: "Barbershop"
            },
            {
                id: "haircut-styling",
                name: "Haircut & Styling",
                blurb: "Modern cuts and styling for all hair types.",
                duration: "45 min",
                price: 1200,
                paymentType: "Pay on delivery",
                image: "assets/img/services/haircut.jpg",
                category: "Barbershop"
            },
            {
                id: "gel-application",
                name: "Gel Application",
                blurb: "Perfectly polished nails for every occasion.",
                duration: "30 min",
                price: 1000,
                paymentType: "50% deposit",
                image: "assets/img/services/gel.jpg",
                category: "Nails"
            },
            {
                id: "manicure",
                name: "Manicure",
                blurb: "Complete nail care and beautification.",
                duration: "45 min",
                price: 1500,
                paymentType: "50% deposit",
                image: "assets/img/services/manicure.jpg",
                category: "Nails"
            },
            {
                id: "pedicure",
                name: "Pedicure",
                blurb: "Relaxing foot care and nail treatment.",
                duration: "60 min",
                price: 2000,
                paymentType: "50% deposit",
                image: "assets/img/services/pedicure.jpg",
                category: "Nails"
            },
            {
                id: "deep-cleansing-facial",
                name: "Deep Cleansing Facial",
                blurb: "Purifying facial for clear, healthy skin.",
                duration: "60 min",
                price: 2500,
                paymentType: "50% deposit",
                image: "assets/img/services/facial.jpg",
                category: "Facials"
            },
            {
                id: "relaxation-massage",
                name: "Relaxation Massage",
                blurb: "Therapeutic massage to relieve stress and tension.",
                duration: "60 min",
                price: 3000,
                paymentType: "50% deposit",
                image: "assets/img/services/massage.jpg",
                category: "Massage"
            },
            {
                id: "eyelash-extensions",
                name: "Eyelash Extensions",
                blurb: "Beautiful, long-lasting lash extensions.",
                duration: "90 min",
                price: 4000,
                paymentType: "50% deposit",
                image: "assets/img/services/lashes.jpg",
                category: "Eyelash Extensions"
            },
            {
                id: "microblading",
                name: "Microblading",
                blurb: "Semi-permanent eyebrow enhancement.",
                duration: "120 min",
                price: 8000,
                paymentType: "50% deposit",
                image: "assets/img/services/microblading.jpg",
                category: "Microblading"
            },
            {
                id: "hair-washing",
                name: "Hair Washing & Treatment",
                blurb: "Professional hair care and conditioning.",
                duration: "30 min",
                price: 800,
                paymentType: "Pay on delivery",
                image: "assets/img/services/hair-wash.jpg",
                category: "Hairdressing"
            },
            {
                id: "dreadlocks-maintenance",
                name: "Dreadlocks Maintenance",
                blurb: "Professional dreadlock care and styling.",
                duration: "90 min",
                price: 2500,
                paymentType: "Pay on delivery",
                image: "assets/img/services/dreadlocks.jpg",
                category: "Dreadlocks"
            },
            {
                id: "steam-treatment",
                name: "Steam Treatment",
                blurb: "Relaxing steam therapy for skin rejuvenation.",
                duration: "30 min",
                price: 1500,
                paymentType: "50% deposit",
                image: "assets/img/services/steam.jpg",
                category: "Steaming"
            }
        ];

        return await this.fetchData('data/services.json', fallback);
    }

    // Packages data
    async getPackages() {
        const fallback = [
            {
                id: "clean-chic-beautiful",
                title: "Clean Chic & Beautiful",
                description: "Complete makeover package for the modern woman",
                includes: ["Hair styling", "Manicure", "Pedicure", "Facial treatment"],
                price: 8000,
                image: "assets/img/packages/clean-chic.jpg",
                duration: "4 hours",
                paymentType: "50% deposit"
            },
            {
                id: "monsieur-maketh",
                title: "Monsieur Maketh",
                description: "Premium grooming package for the distinguished gentleman",
                includes: ["Haircut & styling", "Clean shave", "Facial treatment", "Hair wash"],
                price: 5000,
                image: "assets/img/packages/monsieur.jpg",
                duration: "2.5 hours",
                paymentType: "50% deposit"
            },
            {
                id: "serenity-supreme",
                title: "Serenity Supreme",
                description: "Ultimate relaxation and wellness experience",
                includes: ["Full body massage", "Facial", "Steam treatment", "Manicure"],
                price: 10000,
                image: "assets/img/packages/serenity.jpg",
                duration: "5 hours",
                paymentType: "50% deposit"
            },
            {
                id: "shimmie-shine",
                title: "Shimmie & Shine",
                description: "Glamorous nail and beauty package",
                includes: ["Gel manicure", "Pedicure", "Nail art", "Hand & foot massage"],
                price: 6000,
                image: "assets/img/packages/shimmie.jpg",
                duration: "3 hours",
                paymentType: "50% deposit"
            },
            {
                id: "butterfly-belly",
                title: "Butterfly for My Belly",
                description: "Special pampering package for expecting mothers",
                includes: ["Prenatal massage", "Gentle facial", "Manicure", "Relaxation therapy"],
                price: 7500,
                image: "assets/img/packages/butterfly.jpg",
                duration: "3.5 hours",
                paymentType: "50% deposit"
            }
        ];

        return await this.fetchData('data/packages.json', fallback);
    }

    // Blog data
    async getBlogPosts() {
        const fallback = [
            {
                id: "summer-hair-trends-2024",
                slug: "summer-hair-trends-2024",
                title: "Top Summer Hair Trends for 2024",
                author: "Spike Salon Team",
                date: "2024-06-15",
                tags: ["Hair Trends", "Summer", "Styling"],
                excerpt: "Discover the hottest hair trends this summer and how to achieve them at Spike Salon.",
                contentHTML: "<p>Summer is here and it's time to refresh your look with the latest hair trends...</p>",
                image: "assets/img/blog/summer-trends.jpg"
            },
            {
                id: "nail-care-tips",
                slug: "nail-care-tips",
                title: "Essential Nail Care Tips for Healthy Nails",
                author: "Mary Kioko",
                date: "2024-05-20",
                tags: ["Nail Care", "Beauty Tips", "Health"],
                excerpt: "Learn how to maintain healthy, beautiful nails with these professional tips.",
                contentHTML: "<p>Healthy nails are the foundation of any good manicure...</p>",
                image: "assets/img/blog/nail-care.jpg"
            },
            {
                id: "barbershop-experience",
                slug: "barbershop-experience",
                title: "The Modern Barbershop Experience",
                author: "John Mutua",
                date: "2024-04-10",
                tags: ["Barbershop", "Men's Grooming", "Experience"],
                excerpt: "What makes a great barbershop experience in 2024?",
                contentHTML: "<p>The modern barbershop has evolved beyond just haircuts...</p>",
                image: "assets/img/blog/barbershop.jpg"
            }
        ];

        return await this.fetchData('data/blog.json', fallback);
    }

    // Get single blog post by slug
    async getBlogPost(slug) {
        const posts = await this.getBlogPosts();
        return posts.find(post => post.slug === slug);
    }

    // Gallery data
    async getGallery() {
        const fallback = {
            haircuts: [
                "assets/img/gallery/haircut-1.jpg",
                "assets/img/gallery/haircut-2.jpg",
                "assets/img/gallery/haircut-3.jpg"
            ],
            nails: [
                "assets/img/gallery/nails-1.jpg",
                "assets/img/gallery/nails-2.jpg",
                "assets/img/gallery/nails-3.jpg"
            ],
            spa: [
                "assets/img/gallery/spa-1.jpg",
                "assets/img/gallery/spa-2.jpg",
                "assets/img/gallery/spa-3.jpg"
            ]
        };

        return await this.fetchData('data/gallery.json', fallback);
    }

    // FAQs data
    async getFAQs() {
        const fallback = [
            {
                id: "booking-policy",
                question: "What is your booking policy?",
                answer: "Some services require a 50% deposit to secure your appointment. Cancellations must be made at least 24 hours in advance to avoid charges. Rescheduling is allowed up to 2 hours before your appointment time."
            },
            {
                id: "payment-methods",
                question: "What payment methods do you accept?",
                answer: "We accept cash, mobile money (M-Pesa), and bank transfers. For services requiring deposits, payment can be made via M-Pesa or bank transfer."
            },
            {
                id: "opening-hours",
                question: "What are your opening hours?",
                answer: "We are open Monday to Saturday from 8:00 AM to 8:00 PM. We are closed on Sundays. Please note that hours may vary during holidays."
            },
            {
                id: "location-parking",
                question: "Where are you located and is parking available?",
                answer: "We are located in Kitui Town, opposite Kasue Pharmacy. Street parking is available nearby, and we can provide directions if needed."
            },
            {
                id: "services-for-men",
                question: "Do you offer services for men?",
                answer: "Yes! We offer comprehensive barbershop services including haircuts, shaves, beard trimming, and grooming packages specifically designed for men."
            },
            {
                id: "hygiene-safety",
                question: "What hygiene and safety measures do you follow?",
                answer: "We maintain the highest hygiene standards with sterilized equipment, clean workstations, and professional sanitation practices. All tools are properly disinfected between clients."
            }
        ];

        return await this.fetchData('data/faqs.json', fallback);
    }

    // Clear cache (useful for development)
    clearCache() {
        this.cache.clear();
    }

    // Prefetch data for better performance
    async prefetchData() {
        try {
            await Promise.all([
                this.getSiteData(),
                this.getServices(),
                this.getPackages(),
                this.getBlogPosts(),
                this.getFAQs()
            ]);
        } catch (error) {
            console.warn('Some data failed to prefetch:', error);
        }
    }
}

// Create singleton instance
window.DataLoader = new DataLoader();

// Helper functions for common data operations
window.DataHelpers = {
    // Format price for display
    formatPrice(price) {
        return `KSH ${price.toLocaleString()}`;
    },

    // Format date
    formatDate(dateString, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        return new Date(dateString).toLocaleDateString('en-US', {
            ...defaultOptions,
            ...options
        });
    },

    // Get services by category
    async getServicesByCategory(category) {
        const services = await DataLoader.getServices();
        return services.filter(service => service.category === category);
    },

    // Get unique categories
    async getServiceCategories() {
        const services = await DataLoader.getServices();
        return [...new Set(services.map(service => service.category))];
    },

    // Search services
    async searchServices(query) {
        const services = await DataLoader.getServices();
        const lowerQuery = query.toLowerCase();
        
        return services.filter(service => 
            service.name.toLowerCase().includes(lowerQuery) ||
            service.blurb.toLowerCase().includes(lowerQuery) ||
            service.category.toLowerCase().includes(lowerQuery)
        );
    },

    // Get blog posts by tag
    async getBlogPostsByTag(tag) {
        const posts = await DataLoader.getBlogPosts();
        return posts.filter(post => post.tags.includes(tag));
    },

    // Get recent blog posts
    async getRecentBlogPosts(limit = 3) {
        const posts = await DataLoader.getBlogPosts();
        return posts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }
};

// Auto-prefetch data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.DataLoader.prefetchData();
});