// Forms Module
// Handles form generation, validation, and submission
class BookingForm {
    constructor() {
        this.currentService = null;
        this.currentPackage = null;
        this.formData = {};
    }

    // Generate booking form HTML
    static generateForm(serviceOrPackage, isPackage = false) {
        const itemName = serviceOrPackage.name || serviceOrPackage.title;
        const itemPrice = serviceOrPackage.price;
        const itemDuration = serviceOrPackage.duration;
        const paymentType = serviceOrPackage.paymentType;
        
        return `
            <form id="booking-form" class="booking-form" novalidate>
                <div class="service-info" style="background: var(--color-gray-50); padding: var(--space-4); border-radius: var(--rounded-lg); margin-bottom: var(--space-6);">
                    <h4 style="margin-bottom: var(--space-2); color: var(--brand-primary);">${itemName}</h4>
                    <div style="display: flex; gap: var(--space-4); font-size: var(--text-sm); color: var(--color-gray-600);">
                        <span><strong>Duration:</strong> ${itemDuration}</span>
                        <span><strong>Price:</strong> KSH ${itemPrice.toLocaleString()}</span>
                        <span><strong>Payment:</strong> ${paymentType}</span>
                    </div>
                </div>

                <div class="form__row">
                    <div class="form__group">
                        <label for="client-name" class="form__label form__label--required">Full Name</label>
                        <input type="text" id="client-name" name="name" class="form__input" required aria-describedby="name-error">
                        <div class="form__error" id="name-error"></div>
                    </div>

                    <div class="form__group">
                        <label for="client-phone" class="form__label form__label--required">Phone Number</label>
                        <input type="tel" id="client-phone" name="phone" class="form__input" placeholder="+254..." required aria-describedby="phone-error">
                        <div class="form__error" id="phone-error"></div>
                    </div>
                </div>

                <div class="form__group">
                    <label for="client-email" class="form__label">Email Address</label>
                    <input type="email" id="client-email" name="email" class="form__input" aria-describedby="email-error">
                    <div class="form__error" id="email-error"></div>
                </div>

                <div class="form__row">
                    <div class="form__group">
                        <label for="booking-date" class="form__label form__label--required">Preferred Date</label>
                        <input type="date" id="booking-date" name="date" class="form__input" required aria-describedby="date-error">
                        <div class="form__error" id="date-error"></div>
                    </div>

                    <div class="form__group">
                        <label for="booking-time" class="form__label form__label--required">Preferred Time</label>
                        <select id="booking-time" name="time" class="form__select" required aria-describedby="time-error">
                            <option value="">Select time</option>
                            <option value="08:00">8:00 AM</option>
                            <option value="08:30">8:30 AM</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="09:30">9:30 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="10:30">10:30 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="11:30">11:30 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="12:30">12:30 PM</option>
                            <option value="13:00">1:00 PM</option>
                            <option value="13:30">1:30 PM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="14:30">2:30 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="15:30">3:30 PM</option>
                            <option value="16:00">4:00 PM</option>
                            <option value="16:30">4:30 PM</option>
                            <option value="17:00">5:00 PM</option>
                            <option value="17:30">5:30 PM</option>
                            <option value="18:00">6:00 PM</option>
                            <option value="18:30">6:30 PM</option>
                            <option value="19:00">7:00 PM</option>
                            <option value="19:30">7:30 PM</option>
                        </select>
                        <div class="form__error" id="time-error"></div>
                    </div>
                </div>

                <div class="form__group">
                    <label for="booking-notes" class="form__label">Additional Notes or Requests</label>
                    <textarea id="booking-notes" name="notes" class="form__textarea" placeholder="Any special requests, allergies, or preferences..." rows="4"></textarea>
                </div>

                ${paymentType === '50% deposit' ? `
                <div class="form__group">
                    <div style="background: var(--color-warning); color: var(--brand-light); padding: var(--space-3); border-radius: var(--rounded-lg); font-size: var(--text-sm);">
                        <strong>Deposit Required:</strong> This service requires a 50% deposit (KSH ${(itemPrice * 0.5).toLocaleString()}) to secure your booking. Payment details will be provided after form submission.
                    </div>
                </div>
                ` : ''}

                <div class="form__group">
                    <label class="form__label">
                        <input type="checkbox" name="terms" required style="margin-right: var(--space-2);">
                        I agree to the <a href="faq.html" target="_blank" style="color: var(--brand-primary); text-decoration: underline;">booking policy and terms</a>
                    </label>
                    <div class="form__error" id="terms-error"></div>
                </div>

                <div class="form__actions">
                    <button type="button" class="btn btn--secondary" onclick="BookingForm.closeModal()">Cancel</button>
                    <button type="submit" class="btn btn--primary">
                        <span id="submit-text">Submit Booking</span>
                        <span id="submit-loading" style="display: none;" class="loading">
                            <div class="spinner"></div>
                            Submitting...
                        </span>
                    </button>
                </div>

                <input type="hidden" name="service" value="${serviceOrPackage.id}">
                <input type="hidden" name="serviceType" value="${isPackage ? 'package' : 'service'}">
                <input type="hidden" name="serviceName" value="${itemName}">
                <input type="hidden" name="servicePrice" value="${itemPrice}">
            </form>
        `;
    }

    // Initialize form with validation and event handlers
    static initialize() {
        const form = document.getElementById('booking-form');
        if (!form) return;

        // Set minimum date to today
        const dateInput = document.getElementById('booking-date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;

        // Add validation event listeners
        form.addEventListener('submit', BookingForm.handleSubmit);
        form.addEventListener('input', BookingForm.handleRealTimeValidation);
        form.addEventListener('change', BookingForm.handleRealTimeValidation);
    }

    // Real-time validation
    static handleRealTimeValidation(event) {
        const field = event.target;
        BookingForm.validateField(field);
    }

    // Validate individual field
    static validateField(field) {
        const value = field.value.trim();
        const name = field.name;
        const errorElement = document.getElementById(`${name}-error`);
        
        if (!errorElement) return true;

        let isValid = true;
        let errorMessage = '';

        // Clear previous error state
        field.classList.remove('form__input--error', 'form__textarea--error', 'form__select--error');
        errorElement.textContent = '';

        // Required field validation
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        // Specific field validations
        else if (name === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Name can only contain letters and spaces';
            }
        }
        else if (name === 'phone' && value) {
            // Kenyan phone number validation
            const phoneRegex = /^(\+254|254|0)?[71]\d{8}$/;
            if (!phoneRegex.test(value.replace(/\s+/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid Kenyan phone number (e.g., +254712345678)';
            }
        }
        else if (name === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        else if (name === 'date' && value) {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                isValid = false;
                errorMessage = 'Please select a future date';
            }
            
            // Check if it's Sunday (closed)
            if (selectedDate.getDay() === 0) {
                isValid = false;
                errorMessage = 'We are closed on Sundays. Please select another date';
            }
        }

        // Apply error state if validation failed
        if (!isValid) {
            field.classList.add(`form__${field.tagName.toLowerCase() === 'select' ? 'select' : field.tagName.toLowerCase() === 'textarea' ? 'textarea' : 'input'}--error`);
            errorElement.textContent = errorMessage;
        }

        return isValid;
    }

    // Handle form submission
    static async handleSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const submitText = document.getElementById('submit-text');
        const submitLoading = document.getElementById('submit-loading');
        
        // Validate all fields
        let isFormValid = true;
        const fields = form.querySelectorAll('input[required], select[required], textarea[required], input[name="terms"]');
        
        fields.forEach(field => {
            if (!BookingForm.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            UIComponents.showToast('Please correct the errors above', 'error');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitText.style.display = 'none';
        submitLoading.style.display = 'flex';

        try {
            // Collect form data
            const formData = new FormData(form);
            const bookingData = Object.fromEntries(formData.entries());
            
            // Add timestamp
            bookingData.timestamp = new Date().toISOString();
            bookingData.id = `booking-${Date.now()}`;

            // Save to localStorage (for now)
            const bookings = JSON.parse(localStorage.getItem('salon-bookings') || '[]');
            bookings.push(bookingData);
            localStorage.setItem('salon-bookings', JSON.stringify(bookings));

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Close modal
            BookingForm.closeModal();

            // Show success message
            UIComponents.showToast(
                `Booking submitted successfully! We'll call you at ${bookingData.phone} to confirm your appointment.`,
                'success',
                7000
            );

            // TODO: Replace with actual API call
            // await BookingForm.submitToAPI(bookingData);

        } catch (error) {
            console.error('Booking submission error:', error);
            UIComponents.showToast('Error submitting booking. Please try again or call us directly.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitText.style.display = 'inline';
            submitLoading.style.display = 'none';
        }
    }

    // Submit booking to API (placeholder)
    static async submitToAPI(bookingData) {
        // This would be replaced with actual API endpoint
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
            throw new Error('Failed to submit booking');
        }

        return await response.json();
    }

    // Close booking modal
    static closeModal() {
        const modal = document.getElementById('booking-modal');
        if (modal) {
            modal.classList.remove('modal--active');
            document.body.classList.remove('modal-open');
        }
    }

    // Get stored bookings (for admin/management)
    static getStoredBookings() {
        return JSON.parse(localStorage.getItem('salon-bookings') || '[]');
    }

    // Clear all bookings (for admin/management)
    static clearStoredBookings() {
        localStorage.removeItem('salon-bookings');
    }
}

// Contact form handler
class ContactForm {
    static initialize() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', ContactForm.handleSubmit);
        form.addEventListener('input', ContactForm.handleRealTimeValidation);
    }

    static handleRealTimeValidation(event) {
        BookingForm.validateField(event.target);
    }

    static async handleSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Validate all fields
        let isFormValid = true;
        const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        fields.forEach(field => {
            if (!BookingForm.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            UIComponents.showToast('Please correct the errors above', 'error');
            return;
        }

        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                Sending...
            </div>
        `;

        try {
            // Collect form data
            const formData = new FormData(form);
            const contactData = Object.fromEntries(formData.entries());
            
            // Add timestamp
            contactData.timestamp = new Date().toISOString();
            contactData.id = `contact-${Date.now()}`;

            // Save to localStorage
            const contacts = JSON.parse(localStorage.getItem('salon-contacts') || '[]');
            contacts.push(contactData);
            localStorage.setItem('salon-contacts', JSON.stringify(contacts));

            // Simulate sending delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Reset form
            form.reset();

            // Show success message
            UIComponents.showToast(
                'Message sent successfully! We\'ll get back to you soon.',
                'success',
                5000
            );

        } catch (error) {
            console.error('Contact form error:', error);
            UIComponents.showToast('Error sending message. Please try again or call us directly.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }
}

// Export for use in other modules
window.BookingForm = BookingForm;
window.ContactForm = ContactForm;