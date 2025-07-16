/**
 * Navegación entre secciones del portafolio
 * Maneja el cambio de secciones con animaciones fade in/out
 */

// Variable para controlar si hay una transición en progreso
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
    
    // Detectar si estamos en móvil
    const isMobile = window.innerWidth <= 768;
    
    // Crear indicador de transición para móviles
    let transitionIndicator = null;
    if (isMobile) {
        transitionIndicator = createTransitionIndicator();
        showTransitionIndicator(transitionIndicator);
        
        // Vibración ligera si el dispositivo la soporta
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
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
            // Delay más largo en móviles para mejor visibilidad
            const delay = isMobile ? 150 : 50;
            setTimeout(() => {
                targetSection.classList.add('fade-in');
                // Ocultar indicador después de iniciar la animación
                if (transitionIndicator) {
                    setTimeout(() => {
                        hideTransitionIndicator(transitionIndicator);
                    }, 200);
                }
            }, delay);
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
        // En móviles, esperar más tiempo para que la animación sea visible
        const scrollDelay = isMobile ? 750 : 500;
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, scrollDelay);
        
        // Colapsar navegación en móviles después de seleccionar
        if (isMobile) {
            setTimeout(() => {
                collapseMobileNav();
            }, 300);
        }
        
        // Reinicializar efectos de hover si estamos en la sección de educación
        if (sectionId === 'educacion') {
            const initDelay = isMobile ? 850 : 600;
            setTimeout(() => {
                if (typeof initCertAnimations === 'function') {
                    initCertAnimations();
                }
                // Marcar que la transición ha terminado
                isTransitioning = false;
            }, initDelay);
        } else {
            // Si no es la sección de educación, marcar como terminado después del scroll
            setTimeout(() => {
                isTransitioning = false;
            }, scrollDelay + 100);
        }
    };
    
    // Si hay una sección activa, aplicar fade out antes de mostrar la nueva
    if (currentSection) {
        currentSection.classList.add('fade-out');
        currentSection.classList.remove('fade-in');
        
        // Esperar a que termine la animación de fade out (más tiempo en móviles)
        const fadeOutDelay = isMobile ? 400 : 320;
        setTimeout(() => {
            showNewSection();
        }, fadeOutDelay);
    } else {
        // Si no hay sección activa, mostrar directamente
        showNewSection();
    }
}

// Funciones para navegación móvil colapsable
function collapseMobileNav() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        const divNav = document.getElementById('divnav');
        if (divNav) {
            divNav.classList.add('collapsed');
        }
    }
}

function expandMobileNav() {
    const divNav = document.getElementById('divnav');
    if (divNav) {
        divNav.classList.remove('collapsed');
    }
}

function toggleMobileNav() {
    const divNav = document.getElementById('divnav');
    if (divNav) {
        if (divNav.classList.contains('collapsed')) {
            expandMobileNav();
        } else {
            collapseMobileNav();
        }
    }
}

// Funciones auxiliares para el indicador de transición en móviles
function createTransitionIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'section-transition';
    indicator.textContent = 'Cargando...';
    document.body.appendChild(indicator);
    return indicator;
}

function showTransitionIndicator(indicator) {
    if (indicator) {
        setTimeout(() => {
            indicator.classList.add('show');
        }, 10);
    }
}

function hideTransitionIndicator(indicator) {
    if (indicator) {
        indicator.classList.remove('show');
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 200);
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
    
    // Colapsar navegación en móviles después de un momento
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        setTimeout(() => {
            collapseMobileNav();
        }, 2000); // Esperar 2 segundos para que el usuario vea la navegación completa
    }
}

// Evento para manejar cambios de tamaño de ventana
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    const divNav = document.getElementById('divnav');
    
    if (!isMobile && divNav) {
        // Si no estamos en móvil, expandir la navegación
        divNav.classList.remove('collapsed');
    }
}

// Agregar listener para cambios de tamaño
window.addEventListener('resize', handleResize);
