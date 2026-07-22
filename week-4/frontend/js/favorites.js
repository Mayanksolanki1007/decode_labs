// Favorites manager
const EventSphereFavorites = {
  STORAGE_KEY: 'eventsphere_favorites',

  // Get favorites list
  getFavorites() {
    try {
      const favs = localStorage.getItem(this.STORAGE_KEY);
      return favs ? JSON.parse(favs) : [];
    } catch (e) {
      console.error("Failed to parse favorites", e);
      return [];
    }
  },

  // Check if favorited
  isFavorite(eventId) {
    return this.getFavorites().includes(eventId);
  },

  // Toggle favorite state
  toggleFavorite(eventId) {
    let favs = this.getFavorites();
    const index = favs.indexOf(eventId);
    let isAdded = false;

    if (index === -1) {
      favs.push(eventId);
      isAdded = true;
    } else {
      favs.splice(index, 1);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favs));
    
    const favEvent = new CustomEvent('favoriteschanged', { 
      detail: { eventId, isAdded, favorites: favs } 
    });
    window.dispatchEvent(favEvent);

    return isAdded;
  },

  // Sync button styles on page
  syncButtons() {
    const favButtons = document.querySelectorAll('[data-fav-id]');
    favButtons.forEach(btn => {
      const eventId = btn.getAttribute('data-fav-id');
      if (this.isFavorite(eventId)) {
        btn.classList.add('active');
        btn.setAttribute('aria-label', 'Remove from Favorites');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-label', 'Add to Favorites');
      }
    });
  },

  // Bind click handlers
  init() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-fav-id]');
      if (!btn) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      const eventId = btn.getAttribute('data-fav-id');
      const isAdded = this.toggleFavorite(eventId);
      
      if (isAdded) {
        btn.classList.add('active');
        btn.setAttribute('aria-label', 'Remove from Favorites');
        if (window.EventSphereApp && typeof window.EventSphereApp.showToast === 'function') {
          window.EventSphereApp.showToast('Added to Favorites', 'Event saved successfully.', 'success');
        }
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-label', 'Add to Favorites');
        if (window.EventSphereApp && typeof window.EventSphereApp.showToast === 'function') {
          window.EventSphereApp.showToast('Removed from Favorites', 'Event removed successfully.', 'info');
        }
      }
    });

    this.syncButtons();
    
    window.addEventListener('favoriteschanged', () => {
      this.syncButtons();
    });
  }
};

window.EventSphereFavorites = EventSphereFavorites;

document.addEventListener('DOMContentLoaded', () => {
  EventSphereFavorites.init();
});
