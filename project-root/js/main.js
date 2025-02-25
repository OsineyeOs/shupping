document.addEventListener('DOMContentLoaded', function() {
  /* ===== Slider Functionality ===== */
  const sliderContainer = document.querySelector('.slider-container');
  const slides = document.querySelectorAll('.slide');
  const prevButton = document.querySelector('.slider-nav.prev');
  const nextButton = document.querySelector('.slider-nav.next');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  if (prevButton && nextButton && slides.length > 0) {
    prevButton.addEventListener('click', function() {
      currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
      showSlide(currentSlide);
    });

    nextButton.addEventListener('click', function() {
      currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
      showSlide(currentSlide);
    });

    // Auto-slide every 5 seconds
    setInterval(() => {
      currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
      showSlide(currentSlide);
    }, 5000);
  }

  /* ===== Countdown Timer for Flash Deals ===== */
  const countdownElements = document.querySelectorAll('.countdown');
  countdownElements.forEach(countdown => {
    const endTime = new Date(countdown.getAttribute('data-end')).getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        countdown.innerHTML = "Expired";
        clearInterval(interval);
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdown.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
      countdown.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
      countdown.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
    }
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
  });
});
