    const progressBar = document.getElementById('progressBar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
      // Calcular el progreso de scroll
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;

      // Actualizar la barra de progreso
      progressBar.style.width = scrollPercent + '%';

      // Mostrar/ocultar el botón "Volver Arriba"
      if (scrollTop > window.innerHeight) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    // Scroll suave al inicio
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });