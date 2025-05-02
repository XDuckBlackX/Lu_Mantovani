// Inicializa cada carrossel individualmente
document.querySelectorAll('.carousel').forEach(carousel => {
    const images = carousel.querySelectorAll('img.carousel-img');
    // Atualiza quais imagens estão visíveis
    const updateImages = () => {
      images.forEach((img, index) => {
        img.classList.toggle('hidden', index !== parseInt(carousel.dataset.index, 10));
      });
    };
  
    updateImages();
  
    carousel.querySelector('.prev').addEventListener('click', () => {
      let index = parseInt(carousel.dataset.index, 10);
      if (index > 0) index--;
      carousel.dataset.index = index;
      updateImages();
    });
  
    carousel.querySelector('.next').addEventListener('click', () => {
      let index = parseInt(carousel.dataset.index, 10);
      if (index < images.length - 1) index++;
      carousel.dataset.index = index;
      updateImages();
    });
  });
  
  // Validação simples do formulário de contato
document.querySelector('#contato-form').addEventListener('submit', function(e) {
    const fields = document.querySelectorAll('#contato-form input, #contato-form textarea');
    let valid = true;
    fields.forEach(field => {
      if (!field.value.trim()) valid = false;
    });
    if (!valid) {
      e.preventDefault();
      alert('Por favor, preencha todos os campos.');
    }
  });
  

  let tooltip = null, mouseMoveHandler;
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    if (tooltip) return; 
    tooltip = document.createElement('div');
    tooltip.id = 'context-tooltip';
    tooltip.innerText = "© Copyright Luiza Mantovani 2025. Direitos reservados.";
    tooltip.style.position = 'absolute';
    tooltip.style.background = 'rgba(92, 92, 92, 0.67)';
    tooltip.style.color = '#fff';
    tooltip.style.opacity = "0.8"; // define a opacidade
    tooltip.style.padding = '5px 8px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '10px';
    tooltip.style.pointerEvents = 'none';
    document.body.appendChild(tooltip);
    mouseMoveHandler = function(e) {
      tooltip.style.left = (e.pageX + 10) + 'px';
      tooltip.style.top = (e.pageY + 10) + 'px';
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    mouseMoveHandler(e);
    setTimeout(function() {
      if (tooltip) {
        document.body.removeChild(tooltip);
        tooltip = null;
        document.removeEventListener('mousemove', mouseMoveHandler);
      }
    }, 2000);
  });

    (function () {
      const analyticsScript = document.createElement('script');
      analyticsScript.src = '/_vercel/insights/script.js';
      analyticsScript.defer = true;
      document.body.appendChild(analyticsScript);
    })();

    document.addEventListener('DOMContentLoaded', function() {
      const toggle = document.querySelector('.menu-toggle');
      const menu = document.querySelector('.menu');
      toggle.addEventListener('click', function() {
        menu.classList.toggle('active');
      });
    });
