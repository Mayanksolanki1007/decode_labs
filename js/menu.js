// Navigation menu handlers
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Navbar scroll handler
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
  
  // Mobile menu toggle
  if (hamburger && navMenu) {
    const toggleMenu = () => {
      const isActive = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active', isActive);
      
      // Accessibility states
      hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      
      // Prevent body scroll when menu is open
      if (isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };
    
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
    
    // Close menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      const clickedInsideMenu = navMenu.contains(e.target);
      const clickedHamburger = hamburger.contains(e.target);
      
      if (navMenu.classList.contains('active') && !clickedInsideMenu && !clickedHamburger) {
        toggleMenu();
      }
    });
  }
});
