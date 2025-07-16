/**
 * Navegación entre secciones del portafolio
 * Maneja el cambio de secciones con animaciones fade in/out
 */

function showSection(sectionId, buttonElement) {
    // Obtener la sección activa actual
    const currentSection = document.querySelector('.section-content.active');
    const targetSection = document.getElementById(sectionId);
    
    // Si ya estamos en la sección objetivo, no hacer nada
    if (currentSection && currentSection.id === sectionId) {
        return;
    }
    
    // Función para mostrar la nueva sección
    const showNewSection = () => {
        // Ocultar todas las secciones
        const sections = document.querySelectorAll('.section-content');
        sections.forEach(section => {
            section.classList.remove('active', 'fade-in', 'fade-out');
        });
        
        // Mostrar la sección seleccionada con animación
        if (targetSection) {
            targetSection.classList.add('active');
            // Delay más largo para asegurar que el display: block se aplique completamente
            setTimeout(() => {
                targetSection.classList.add('fade-in');
            }, 50);
        }
        
        // Actualizar botones activos del nav
        const buttons = document.querySelectorAll('.boton');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        
        // Marcar botón activo - buscar por el onclick que contenga la sección
        if (buttonElement) {
            buttonElement.classList.add('active');
        } else {
            // Fallback: buscar el botón por su onclick
            const activeButton = document.querySelector(`[onclick*="'${sectionId}'"]`);
            if (activeButton) {
                activeButton.classList.add('active');
            }
        }
        
        // Scroll suave hacia arriba DESPUÉS de que termine la animación de entrada
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 500); // Esperar a que termine la animación fade-in
        
        // Reinicializar efectos de hover si estamos en la sección de educación
        if (sectionId === 'educacion') {
            setTimeout(() => {
                if (typeof initCertAnimations === 'function') {
                    initCertAnimations();
                }
            }, 600);
        }
    };
    
    // Si hay una sección activa, aplicar fade out antes de mostrar la nueva
    if (currentSection) {
        currentSection.classList.add('fade-out');
        currentSection.classList.remove('fade-in');
        
        // Esperar a que termine la animación de fade out
        setTimeout(() => {
            showNewSection();
        }, 320);
    } else {
        // Si no hay sección activa, mostrar directamente
        showNewSection();
    }
}

// Inicialización al cargar la página
function initializeNavigation() {
    // Asegurar que todas las secciones estén ocultas inicialmente
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
        section.classList.remove('active', 'fade-in', 'fade-out');
    });
    
    // Mostrar la sección inicio
    const inicioSection = document.getElementById('inicio');
    if (inicioSection) {
        inicioSection.classList.add('active', 'fade-in');
    }
    
    // Activar el botón de inicio
    const inicioButton = document.querySelector('[onclick*="inicio"]');
    if (inicioButton) {
        inicioButton.classList.add('active');
    }
}
