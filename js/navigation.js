/**
 * Navegación entre secciones del portafolio
 * Maneja el cambio de secciones con animaciones fade in/out simples.
 */

let isTransitioning = false;

function showSection(sectionId, buttonElement) {
  // Si hay una transición en progreso, ignorar la nueva solicitud
  if (isTransitioning) {
    return;
  }

  // Obtener la sección activa actual
  const currentSection = document.querySelector('.section-content.active');
  const targetSection = document.getElementById(sectionId);

  // Si ya estamos en la sección objetivo, no hacer nada
  if (currentSection && currentSection.id === sectionId) {
    return;
  }

  // Marcar que hay una transición en progreso
  isTransitioning = true;

  const showNewSection = () => {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
      section.classList.remove('active', 'fade-in', 'fade-out');
    });

    // Mostrar la sección seleccionada con animación
    if (targetSection) {
      targetSection.classList.add('active');
      setTimeout(() => {
        targetSection.classList.add('fade-in');
      }, 50);
    }

    // Actualizar botones activos del nav
    const buttons = document.querySelectorAll('.boton');
    buttons.forEach(button => {
      button.classList.remove('active');
    });

    if (buttonElement) {
      buttonElement.classList.add('active');
    } else {
      const activeButton = document.querySelector(`[onclick*="'${sectionId}'"]`);
      if (activeButton) {
        activeButton.classList.add('active');
      }
    }

    // Scroll suave hacia arriba después de la animación
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);

    // Marcar como terminado
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  };

  // Si hay una sección activa, aplicar fade out antes de mostrar la nueva
  if (currentSection) {
    currentSection.classList.add('fade-out');
    currentSection.classList.remove('fade-in');

    setTimeout(() => {
      showNewSection();
    }, 200);
  } else {
    showNewSection();
  }
}

// Inicialización al cargar la página
function initializeNavigation() {
  const sections = document.querySelectorAll('.section-content');
  sections.forEach(section => {
    section.classList.remove('active', 'fade-in', 'fade-out');
  });

  const inicioSection = document.getElementById('inicio');
  if (inicioSection) {
    inicioSection.classList.add('active', 'fade-in');
  }

  const inicioButton = document.querySelector('[onclick*="inicio"]');
  if (inicioButton) {
    inicioButton.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', initializeNavigation);
