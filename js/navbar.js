document.addEventListener('DOMContentLoaded', function() {
  const header = document.getElementById('header');

  // Determine the base path for navbar.html
  let basePath;
  if (window.location.pathname.includes('about.html') || window.location.pathname.includes('job.html')) {
    basePath = '../html/';
  } else {
    basePath = 'html/';
  }

  fetch(basePath + 'navbar.html')
  .then(response => response.text())
  .then(data => {
    header.innerHTML = data;
    fixNavLinks();
    setupNav();
  })
  .catch(error => console.error('Error loading navbar:', error));
});

function fixNavLinks() {
  const isInHtmlFolder = window.location.pathname.includes('/html/');
  const currentFile = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav_links a');
  navLinks.forEach(link => {
    let href = link.getAttribute('href');

    // If inside /html/
    if (isInHtmlFolder) {
      // If link is to index.html, prefix with ../
      if (href.startsWith('index.html')) {
        link.setAttribute('href', '../index.html');
      }
      // If link is to another html page in the same folder, use only the filename
      else if (href === 'html/about.html' && currentFile !== 'about.html') {
        link.setAttribute('href', 'about.html');
      }
      else if (href === 'html/job.html' && currentFile !== 'job.html') {
        link.setAttribute('href', 'job.html');
      }
      // If already on the target page, prevent navigation
      else if ((href === 'html/about.html' && currentFile === 'about.html') ||
               (href === 'html/job.html' && currentFile === 'job.html')) {
        link.setAttribute('href', '#');
      }
      // For hash links (e.g., index.html#agents), prefix with ../
      else if (href.startsWith('index.html#')) {
        link.setAttribute('href', '../' + href);
      }
      // For other html/ links, prefix with ../
      else if (href.startsWith('html/') && !['html/about.html', 'html/job.html'].includes(href)) {
        link.setAttribute('href', '../' + href.replace(/^html\//, ''));
      }
    } else {
      // If at root, ensure links to html pages start with html/
      if (href === 'about.html') {
        link.setAttribute('href', 'html/about.html');
      }
      if (href === 'job.html') {
        link.setAttribute('href', 'html/job.html');
      }
    }
  });
}

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

