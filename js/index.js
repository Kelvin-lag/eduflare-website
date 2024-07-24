// script.js

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('header');

  window.addEventListener('scroll', function () {
      if (window.scrollY > 100) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });

  const links = document.querySelectorAll('nav a, .btn');

  for (const link of links) {
      link.addEventListener('click', smoothScroll);
  }

  function smoothScroll(event) {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
      });
  }
});
