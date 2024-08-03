document.addEventListener('DOMContentLoaded', function() {
  const footer = document.getElementById('footer');

  // Determine the base path
  let basePath = window.location.pathname.includes('about.html') ? '../html/' : 'html/';

  fetch(basePath + 'footer.html')
  .then(response => response.text())
  .then(data => {
    footer.innerHTML = data;
  })
  .catch(error => console.error('Error loading footer:', error));
});
