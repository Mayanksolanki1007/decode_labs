// App coordinator for EventSphere
const EventSphereApp = {
  // Toast notifications
  showToast(title, message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Set icons based on toast type
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    } else {
      iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
    `;

    container.appendChild(toast);

    // Auto remove toast after 3 seconds
    setTimeout(() => {
      toast.style.animation = 'slideInUp 0.3s reverse forwards';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  },

  // Event registration modal
  initRegisterModal() {
    let modalOverlay = document.getElementById('register-modal');
    if (!modalOverlay) {
      // Create Modal dynamically
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'register-modal';
      modalOverlay.className = 'modal-overlay';
      modalOverlay.innerHTML = `
        <div class="modal-container">
          <div class="modal-header">
            <h3 class="modal-title" id="modal-event-title">Register for Event</h3>
            <button class="modal-close-btn" aria-label="Close Modal" id="modal-close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <form class="modal-body" id="registration-form">
            <input type="hidden" id="reg-event-id">
            <div class="form-group">
              <label class="form-label" for="reg-name">Full Name</label>
              <input type="text" id="reg-name" class="form-input" placeholder="Enter your full name" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="reg-email">Email Address</label>
              <input type="email" id="reg-email" class="form-input" placeholder="Enter your college email" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="reg-phone">Phone Number</label>
              <input type="tel" id="reg-phone" class="form-input" placeholder="10-digit number" pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="reg-college">College / University Name</label>
              <input type="text" id="reg-college" class="form-input" placeholder="Enter college name" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
              Submit Registration
            </button>
          </form>
        </div>
      `;
      document.body.appendChild(modalOverlay);
    }

    const closeBtn = document.getElementById('modal-close');
    const form = document.getElementById('registration-form');
    
    const closeModal = () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (form) form.reset();
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    // Listen for register buttons
    document.addEventListener('click', (e) => {
      const regBtn = e.target.closest('[data-register-id]');
      if (!regBtn) return;
      
      const eventId = regBtn.getAttribute('data-register-id');
      const event = (window.EventSphereData || []).find(ev => ev.id === eventId);
      
      if (event) {
        if (event.seatsRemaining === 0) {
          this.showToast('Registration Closed', 'Sorry! This event is sold out.', 'error');
          return;
        }
        
        document.getElementById('modal-event-title').textContent = `Register: ${event.title}`;
        document.getElementById('reg-event-id').value = eventId;
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });

    // Handle form submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const eventId = document.getElementById('reg-event-id').value;
        const name = document.getElementById('reg-name').value;
        const event = (window.EventSphereData || []).find(ev => ev.id === eventId);
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Registering...';

        setTimeout(() => {
          if (event) {
            // Decrement seats remaining locally
            if (event.seatsRemaining > 0) {
              event.seatsRemaining--;
            }
            
            if (window.EventSphereFilter && typeof window.EventSphereFilter.applyFilters === 'function') {
              window.EventSphereFilter.applyFilters();
            }
            
            if (window.EventSphereDetails && typeof window.EventSphereDetails.renderDetails === 'function') {
              window.EventSphereDetails.renderDetails();
            }
          }

          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          closeModal();

          this.showToast('Registration Successful!', `Hey ${name}, you're registered for ${event ? event.title : 'the event'}!`, 'success');
        }, 1200);
      });
    }
  },

  // FAQ Accordion
  initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
      q.addEventListener('click', () => {
        const item = q.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close others
        document.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('active');
          const ans = i.querySelector('.faq-answer');
          if (ans) ans.style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          const answer = item.querySelector('.faq-answer');
          if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        }
      });
    });
  },

  // Scroll Reveal Animations
  initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      // Fallback scroll listener
      const revealOnScroll = () => {
        revealElements.forEach(el => {
          const rect = el.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          if (rect.top <= windowHeight * 0.85) {
            el.classList.add('revealed');
          }
        });
      };
      window.addEventListener('scroll', revealOnScroll);
      revealOnScroll();
    }
  },

  // Back to Top Button
  initBackToTop() {
    let btn = document.getElementById('back-to-top');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'back-to-top';
      btn.className = 'back-to-top';
      btn.setAttribute('aria-label', 'Scroll to Top');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
      document.body.appendChild(btn);
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  },

  // Stats counter animation
  initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length === 0) return;

    const runCounter = () => {
      stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'), 10);
        
        // Handle 0 target to prevent division by zero
        if (target === 0) {
          stat.textContent = '0' + (stat.getAttribute('data-suffix') || '');
          return;
        }

        const countTo = target;
        let count = 0;
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / countTo));
        const step = Math.max(1, Math.floor(target / 100)); 
        
        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            clearInterval(timer);
            stat.textContent = target + (stat.getAttribute('data-suffix') || '');
          } else {
            stat.textContent = count + (stat.getAttribute('data-suffix') || '');
          }
        }, Math.max(10, stepTime));
      });
    };

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            runCounter();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      observer.observe(statsSection);
    } else {
      runCounter();
    }
  },

  // Skeletal loader simulation
  initLoader() {
    const skeletons = document.getElementById('skeletons-wrapper');
    const content = document.getElementById('real-grid-wrapper');
    
    if (skeletons && content) {
      content.style.display = 'none';
      setTimeout(() => {
        skeletons.style.display = 'none';
        content.style.display = 'grid';
        this.initScrollReveal();
      }, 1000);
    }
  }
};

window.EventSphereApp = EventSphereApp;

document.addEventListener('DOMContentLoaded', () => {
  EventSphereApp.initRegisterModal();
  EventSphereApp.initFAQAccordion();
  EventSphereApp.initScrollReveal();
  EventSphereApp.initBackToTop();
  EventSphereApp.initStatsCounter();
  EventSphereApp.initLoader();
});
