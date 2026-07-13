// Theme switcher logic
(function() {
  // Set saved theme immediately to prevent screen flash
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-mode');
    document.body?.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
    document.body?.classList.remove('dark-mode');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      document.documentElement.classList.toggle('dark-mode', isDark);
      
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      // Dispatch event for other handlers
      const themeEvent = new CustomEvent('themechanged', { detail: { theme: isDark ? 'dark' : 'light' } });
      window.dispatchEvent(themeEvent);
      
      // Accessibility alerts
      const announcement = isDark ? 'Dark mode enabled' : 'Light mode enabled';
      let screenReaderAlert = document.getElementById('sr-alert');
      if (!screenReaderAlert) {
        screenReaderAlert = document.createElement('div');
        screenReaderAlert.id = 'sr-alert';
        screenReaderAlert.setAttribute('aria-live', 'polite');
        screenReaderAlert.style.position = 'absolute';
        screenReaderAlert.style.width = '1px';
        screenReaderAlert.style.height = '1px';
        screenReaderAlert.style.padding = '0';
        screenReaderAlert.style.margin = '-1px';
        screenReaderAlert.style.overflow = 'hidden';
        screenReaderAlert.style.clip = 'rect(0, 0, 0, 0)';
        screenReaderAlert.style.border = '0';
        document.body.appendChild(screenReaderAlert);
      }
      screenReaderAlert.textContent = announcement;
    });
  }
});
