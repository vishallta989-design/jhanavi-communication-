/**
 * जानवी कम्युनिकेशन (JHANAVI COMMUNICATION)
 * Client-Side JavaScript for interactivity, shop status, and WhatsApp integration
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Set current year in footer
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 2. Real-time Shop Open/Closed Status
  // Operating Hours: 10:00 AM to 10:00 PM (10:00 to 22:00 IST), Daily
  function updateShopStatus() {
    const statusIndicator = document.getElementById('live-status-indicator');
    const statusText = document.getElementById('live-status-text');
    if (!statusIndicator || !statusText) return;

    const now = new Date();
    // Use local hours (or convert to IST)
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTimeInMinutes = hours * 60 + minutes;

    const openTimeInMinutes = 10 * 60; // 10:00 AM
    const closeTimeInMinutes = 22 * 60; // 10:00 PM

    if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes) {
      statusIndicator.className = 'live-status-pill status-open';
      statusText.textContent = 'अभी खुला है (Open Now)';
    } else {
      statusIndicator.className = 'live-status-pill status-closed';
      statusText.textContent = 'अभी बंद है (सुबह 10:00 AM खुलेगा)';
    }
  }

  updateShopStatus();
  // Update every minute
  setInterval(updateShopStatus, 60000);

  // 3. Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // 4. Smooth Active Nav Link Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  });

  // 5. WhatsApp Quick Inquiry Form
  const inquiryForm = document.getElementById('whatsapp-inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('client-name').value.trim();
      const model = document.getElementById('phone-model').value.trim();
      const issue = document.getElementById('issue-description').value.trim();

      if (!name || !model || !issue) {
        alert('कृपया सभी विवरण भरें!');
        return;
      }

      const primaryPhone = '917704000111'; // Shop primary WhatsApp number
      const message = `नमस्ते जानवी कम्युनिकेशन,\n\nमेरा नाम *${name}* है।\nमोबाइल मॉडल: *${model}*\nसमस्या: *${issue}*\n\nकृपया रिपेयरिंग का अनुमानित खर्च और समय बताएं। धन्यवाद!`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${primaryPhone}?text=${encodedMessage}`;

      // Open WhatsApp chat in a new tab
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }
});
