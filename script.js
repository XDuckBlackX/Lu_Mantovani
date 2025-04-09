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
  
