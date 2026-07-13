// Search input handlers
const EventSphereSearch = {
  // Simple debounce helper
  debounce(func, delay = 250) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  },

  // Setup event listeners on search inputs
  initSearchInput(inputId, onSearchChangeCallback) {
    const searchInput = document.getElementById(inputId);
    if (!searchInput) return;

    const clearBtn = searchInput.parentElement.querySelector('.search-clear');
    
    const triggerCallback = this.debounce((value) => {
      onSearchChangeCallback(value.trim());
      if (clearBtn) {
        clearBtn.style.display = value ? 'block' : 'none';
      }
    }, 200);

    searchInput.addEventListener('input', (e) => {
      triggerCallback(e.target.value);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        triggerCallback('');
        searchInput.focus();
      });
    }
  }
};

window.EventSphereSearch = EventSphereSearch;
