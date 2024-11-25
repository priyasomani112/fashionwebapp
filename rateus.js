document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star');
    const ratingMessage = document.getElementById('rating-message');
  
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const ratingValue = star.getAttribute('data-value');
        ratingMessage.textContent = `Your response of ${ratingValue} stars is recorded! \n \n Thankyou!!`;
        removeActiveStars();
        markStarsAsActive(ratingValue);
      });
  
      star.addEventListener('mouseover', () => {
        const ratingValue = star.getAttribute('data-value');
        highlightStars(ratingValue);
      });
  
      star.addEventListener('mouseout', () => {
        removeActiveStars();
      });
    });
  
    function highlightStars(value) {
      stars.forEach(star => {
        if (star.getAttribute('data-value') <= value) {
          star.classList.add('active');
        }
      });
    }
  
    function removeActiveStars() {
      stars.forEach(star => {
        star.classList.remove('active');
    });
  }

  function markStarsAsActive(value) {
    stars.forEach(star => {
      if (star.getAttribute('data-value') <= value) {
        star.classList.add('active');
      }
    });
  }
});
