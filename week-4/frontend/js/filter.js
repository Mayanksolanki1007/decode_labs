// Event filtering and sorting controller
const EventSphereFilter = {
  activeFilters: {
    category: 'All',
    search: '',
    sortBy: 'newest'
  },
  
  events: [],

  // SVG Icons for categories
  icons: {
    Technical: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    Sports: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M6 12A6 6 0 0 1 18 12"></path><path d="M12 6A6 6 0 0 0 12 18"></path></svg>`,
    Workshop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    Cultural: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M14.375 7.5a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0z"></path><path d="M9 14.5a3 3 0 0 0 6 0v-4.5"></path></svg>`,
    Music: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
    Art: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.35265 19.5 5.5 20 5.5 20.5C5.5 21.3284 6.17157 22 7 22H12Z"></path><circle cx="7.5" cy="10.5" r="1.5"></circle><circle cx="11.5" cy="7.5" r="1.5"></circle><circle cx="16.5" cy="9.5" r="1.5"></circle></svg>`,
    Career: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`
  },

  // Category brand colors
  colors: {
    Technical: 'var(--cat-technical)',
    Sports: 'var(--cat-sports)',
    Workshop: 'var(--cat-workshop)',
    Cultural: 'var(--cat-cultural)',
    Music: 'var(--cat-music)',
    Art: 'var(--cat-art)',
    Career: 'var(--cat-career)'
  },

  // Init filtering selectors and buttons
  init(eventsList, gridContainerId, categoryContainerId, sortingSelectId) {
    this.events = eventsList;
    this.gridContainer = document.getElementById(gridContainerId);
    this.categoryContainer = document.getElementById(categoryContainerId);
    this.sortingSelect = document.getElementById(sortingSelectId);

    if (!this.gridContainer) return;

    if (this.categoryContainer) {
      this.setupCategoryButtons();
    }

    if (this.sortingSelect) {
      this.sortingSelect.addEventListener('change', (e) => {
        this.activeFilters.sortBy = e.target.value;
        this.applyFilters();
      });
    }

    this.applyFilters();
  },

  setupCategoryButtons() {
    const categories = ['All', 'Technical', 'Sports', 'Workshop', 'Cultural', 'Music', 'Art', 'Career'];
    
    this.categoryContainer.innerHTML = '';
    categories.forEach(cat => {
      const button = document.createElement('button');
      button.className = `btn ${cat === this.activeFilters.category ? 'btn-primary' : 'btn-secondary'}`;
      button.textContent = cat;
      button.setAttribute('data-category', cat);
      
      button.addEventListener('click', () => {
        const previousActive = this.categoryContainer.querySelector('.btn-primary');
        if (previousActive) {
          previousActive.classList.remove('btn-primary');
          previousActive.classList.add('btn-secondary');
        }
        button.classList.remove('btn-secondary');
        button.classList.add('btn-primary');
        
        this.activeFilters.category = cat;
        this.applyFilters();
      });
      
      this.categoryContainer.appendChild(button);
    });
  },

  // Filter & sort application
  applyFilters() {
    let result = [...this.events];

    // Category check
    if (this.activeFilters.category !== 'All') {
      result = result.filter(event => event.category.toLowerCase() === this.activeFilters.category.toLowerCase());
    }

    // Search check
    if (this.activeFilters.search) {
      const q = this.activeFilters.search.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(q) ||
        event.college.toLowerCase().includes(q) ||
        event.category.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.venue.toLowerCase().includes(q)
      );
    }

    // Sort check
    if (this.activeFilters.sortBy === 'newest') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (this.activeFilters.sortBy === 'oldest') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (this.activeFilters.sortBy === 'alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    this.render(result);
  },

  // Render cards markup to target container
  render(eventsToRender) {
    if (!this.gridContainer) return;
    
    if (window.EventSphereCountdown && typeof window.EventSphereCountdown.stop === 'function') {
      window.EventSphereCountdown.stop();
    }

    if (eventsToRender.length === 0) {
      this.gridContainer.innerHTML = `
        <div class="empty-state animate-fade-in" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background-color: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border);">
          <div style="font-size: 3rem; margin-bottom: 20px;">🔍</div>
          <h3>No Events Found</h3>
          <p style="margin-top: 10px; margin-bottom: 24px; max-width: 400px; margin-left: auto; margin-right: auto;">
            We couldn't find any events matching your criteria. Try adjusting your search query or filters.
          </p>
          <button class="btn btn-primary" id="btn-reset-filters">Reset Filters</button>
        </div>
      `;
      
      const resetBtn = document.getElementById('btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.activeFilters.category = 'All';
          this.activeFilters.search = '';
          const searchInput = document.getElementById('events-search');
          if (searchInput) searchInput.value = '';
          
          if (this.categoryContainer) {
            this.setupCategoryButtons();
          }
          this.applyFilters();
        });
      }
      return;
    }

    this.gridContainer.innerHTML = eventsToRender.map(event => {
      const isFav = window.EventSphereFavorites && window.EventSphereFavorites.isFavorite(event.id);
      
      let seatsMarkup = '';
      if (event.seatsRemaining === 0) {
        seatsMarkup = `<span class="event-seats-tag sold-out">Sold Out</span>`;
      } else if (event.seatsRemaining <= 10) {
        seatsMarkup = `<span class="event-seats-tag low">Only ${event.seatsRemaining} left!</span>`;
      } else {
        seatsMarkup = `<span class="event-seats-tag">${event.seatsRemaining} Seats Open</span>`;
      }

      const categoryIcon = this.icons[event.category] || '';
      
      const eventDate = new Date(event.date);
      const formattedDate = eventDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      return `
        <article class="event-card reveal animate-fade-in" id="card-${event.id}">
          <div class="event-image-container">
            <span class="event-countdown-overlay" data-countdown="${event.date}">
              ${formattedDate}
            </span>
            <button class="fav-btn ${isFav ? 'active' : ''}" data-fav-id="${event.id}" aria-label="Toggle Favorite">
              <svg viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:${this.colors[event.category] || 'var(--primary)'}; opacity: 0.95; color: #FFFFFF; font-size: 3rem;">
              ${categoryIcon}
            </div>
          </div>
          
          <div class="event-card-body">
            <div class="event-card-meta">
              <span class="badge badge-${event.category.toLowerCase()}">
                ${event.category}
              </span>
              <span style="font-size:0.8rem; color:var(--text-light); font-weight:500; font-family:var(--font-mono);">
                ${event.college}
              </span>
            </div>
            
            <h3 class="event-card-title">${event.title}</h3>
            <p class="event-card-desc">${event.description}</p>
            
            <div class="event-details-mini">
              <div class="event-detail-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>${formattedDate} • ${event.time.split('(')[0]}</span>
              </div>
              <div class="event-detail-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${event.venue}</span>
              </div>
            </div>
            
            <div class="event-card-footer">
              ${seatsMarkup}
              <div style="display:flex; gap:8px;">
                <a href="event-details.html?id=${event.id}" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.85rem;">Details</a>
                ${event.seatsRemaining > 0 ? 
                  `<button class="btn btn-primary" data-register-id="${event.id}" style="padding: 6px 12px; font-size: 0.85rem;">Register</button>` : 
                  `<button class="btn btn-secondary" disabled style="padding: 6px 12px; font-size: 0.85rem; cursor: not-allowed; opacity: 0.6;">Sold Out</button>`
                }
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    if (window.EventSphereCountdown && typeof window.EventSphereCountdown.start === 'function') {
      window.EventSphereCountdown.start();
    }
    
    if (window.EventSphereFavorites && typeof window.EventSphereFavorites.syncButtons === 'function') {
      window.EventSphereFavorites.syncButtons();
    }
  }
};

window.EventSphereFilter = EventSphereFilter;
