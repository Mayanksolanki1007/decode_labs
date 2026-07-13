// Event countdown helper
const EventSphereCountdown = {
  // Get time differences
  getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  },

  // Update card badge timers
  updateCardCountdowns() {
    const cards = document.querySelectorAll('[data-countdown]');
    cards.forEach(elem => {
      const targetDate = elem.getAttribute('data-countdown');
      const time = this.getTimeRemaining(targetDate);
      
      if (time.total <= 0) {
        elem.innerHTML = 'Event Started';
        elem.classList.add('expired');
      } else {
        if (time.days > 0) {
          elem.innerHTML = `${time.days}d ${time.hours}h left`;
        } else if (time.hours > 0) {
          elem.innerHTML = `${time.hours}h ${time.minutes}m left`;
        } else {
          elem.innerHTML = `${time.minutes}m ${time.seconds}s left`;
          elem.classList.add('low-time');
        }
      }
    });
  },

  // Detail page countdown clock
  initDetailCountdown(elementId, targetDateString) {
    const clock = document.getElementById(elementId);
    if (!clock) return null;
    
    const daysSpan = clock.querySelector('.days');
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');
    
    function updateClock() {
      const time = EventSphereCountdown.getTimeRemaining(targetDateString);
      
      if (daysSpan) daysSpan.textContent = String(Math.max(0, time.days)).padStart(2, '0');
      if (hoursSpan) hoursSpan.textContent = String(Math.max(0, time.hours)).padStart(2, '0');
      if (minutesSpan) minutesSpan.textContent = String(Math.max(0, time.minutes)).padStart(2, '0');
      if (secondsSpan) secondsSpan.textContent = String(Math.max(0, time.seconds)).padStart(2, '0');
      
      if (time.total <= 0) {
        clearInterval(timeinterval);
        const expiredNotice = document.querySelector('.countdown-expired-notice');
        if (expiredNotice) {
          expiredNotice.style.display = 'block';
        }
        clock.style.opacity = '0.5';
      }
    }
    
    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
    return timeinterval;
  },

  // Start card tracking interval
  start() {
    this.updateCardCountdowns();
    this.intervalId = setInterval(() => this.updateCardCountdowns(), 1000);
  },

  // Stop card tracking interval
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
};

window.EventSphereCountdown = EventSphereCountdown;

document.addEventListener('DOMContentLoaded', () => {
  EventSphereCountdown.start();
});
