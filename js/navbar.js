document.addEventListener('DOMContentLoaded', function() {
  const header = document.getElementById('header');

  // Determine the base path
  let basePath = window.location.pathname.includes('about.html') ? '../html/' : 'html/';

  fetch(basePath + 'navbar.html')
  .then(response => response.text())
  .then(data => {
    header.innerHTML = data;
    setupNav();
  })
  .catch(error => console.error('Error loading navbar:', error));
});

function toggleMenu() {
  var x = document.getElementById("myTopnav");
  var icon = document.querySelector('.icon i');
  if (x.style.display === "block") {
    x.style.display = "none";
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  } else {
    x.style.display = "block";
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  }
}

function setupNav() {
  const navLinks = document.querySelectorAll('.nav_links a');
  const icon = document.querySelector('.icon i');
  const topnav = document.getElementById('myTopnav');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Media query check for small screens
      if (window.matchMedia("(max-width: 768px)").matches) {
        // Close the menu on small screens
        topnav.style.display = 'none';
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }

      // Get the href attribute value
      const href = this.getAttribute('href');

      // Check if we are on the 'About' page
      if (window.location.pathname.includes('about.html') && href.startsWith('home.html#')) {
        // Redirect to the home page with the section ID
        window.location.href = href;
      } else if (href.startsWith('home.html#')) {
        // If on the home page, scroll to the section
        const targetId = href.split('#')[1];
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // For other links, just follow the default behavior
        window.location.href = href;
      }
    });
  });
}
