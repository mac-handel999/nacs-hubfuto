// Corrected JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.getElementById('menu-btn');
  const menuSelection = document.getElementById('menu-selection');
  const menuIcon = document.getElementById('menu-icon');

  // Event listener for the menu button click
  menuBtn.addEventListener('click', function() {
    // Check if the menu is currently visible (has the 'show' class)
    if (menuSelection.classList.contains('show')) {
      // If it's visible, hide it and change the icon back to the hamburger
      menuSelection.classList.remove('show');
      menuIcon.src = ' /icons-logos/Hamburger_icon.svg.png';
      menuIcon.alt = 'Menu';
    } else {
      // If it's not visible, show it and change the icon to the cancel symbol
      menuSelection.classList.add('show');
      menuIcon.src = ' /icons-logos/cancel-icon.png';
      menuIcon.alt = 'Close';
    }
  });

  //for loader animation
  window.addEventListener('load', function() {
    const loaderWrapper = document.getElementById('loader-wrapper');
    const content = document.getElementById('content');
    
    // Fade out the loader
    loaderWrapper.style.opacity = '0';

    // Hide the loader completely after the fade out transition
    setTimeout(function() {
      loaderWrapper.style.display = 'none';
      // Make the content visible after the loader is hidden
      content.style.display = 'block';
    }, 1000); // This time (1000ms) should match the transition duration in CSS
  });
});


