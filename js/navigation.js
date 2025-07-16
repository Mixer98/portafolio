/**
 * Navegación entre secciones del portafolio
 * Maneja el cambio de secciones con animaciones fade in/out
 */

// Variable para controlar si hay una transición en progreso
let isTransitioning = false;

function showSection(sectionId, buttonElement) {
    // Detectar si estamos en móvil
    const isMobile = window.innerWidth <= 768;
    
    // Desenfocar inmediatamente en móviles al hacer clic
    if (isMobile && buttonElement) {
        // Forzar blur inmediato del botón clickeado
        buttonElement.blur();
        // Quitar cualquier outline inmediatamente
        buttonElement.style.setProperty('outline', 'none', 'important');
        buttonElement.style.setProperty('box-shadow', 'none', 'important');
    }
    
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
        
        // Forzar "salida" de navegación en móviles INMEDIATAMENTE
        if (isMobile) {
            forceMobileNavExit();
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

// Función para forzar "salida" completa de navegación en móviles
function forceMobileNavExit() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // 1. Blur inmediato de cualquier elemento enfocado
        if (document.activeElement) {
            document.activeElement.blur();
        }
        
        // 2. Crear área invisible para recibir el toque/foco
        const invisibleArea = document.createElement('div');
        invisibleArea.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: transparent;
            z-index: -1;
            pointer-events: auto;
        `;
        invisibleArea.setAttribute('tabindex', '-1');
        document.body.appendChild(invisibleArea);
        
        // 3. Simular toque fuera del nav
        invisibleArea.focus();
        
        // 4. Limpiar todos los estados de navegación
        const buttons = document.querySelectorAll('.boton');
        const nav = document.querySelector('nav');
        const divNav = document.getElementById('divnav');
        
        buttons.forEach(button => {
            button.blur();
            button.style.removeProperty('background-color');
            button.style.removeProperty('color');
            button.style.removeProperty('outline');
            button.style.removeProperty('box-shadow');
            
            // Forzar que no tenga pseudo-estados
            if (!button.classList.contains('active')) {
                button.style.setProperty('background-color', 'transparent', 'important');
                button.style.setProperty('color', 'var(--color-text)', 'important');
            }
        });
        
        // 5. Desenfocar contenedores de navegación
        if (nav) nav.blur();
        if (divNav) divNav.blur();
        
        // 6. Forzar que el body tome el foco (simular toque fuera)
        document.body.focus();
        document.body.click();
        
        // 7. Trigger evento de toque fuera del nav
        const touchEvent = new Event('touchstart', { bubbles: true });
        document.body.dispatchEvent(touchEvent);
        
        // 8. Remover área invisible
        setTimeout(() => {
            if (document.body.contains(invisibleArea)) {
                document.body.removeChild(invisibleArea);
            }
        }, 50);
        
        // 9. Forzar reflow múltiple para asegurar cambios visuales
        if (nav) {
            nav.style.display = 'none';
            nav.offsetHeight; // Force reflow
            nav.style.display = 'flex';
            nav.offsetHeight; // Force reflow again
        }
        
        // 10. Asegurar que solo el botón activo mantenga sus estilos
        setTimeout(() => {
            buttons.forEach(button => {
                if (button.classList.contains('active')) {
                    // Forzar colores activos
                    button.style.removeProperty('background-color');
                    button.style.removeProperty('color');
                } else {
                    // Forzar transparencia en no activos
                    button.style.setProperty('background-color', 'transparent', 'important');
                    button.style.setProperty('color', 'var(--color-text)', 'important');
                }
            });
        }, 1);
    }
}

// Función para desenfocar navegación en móviles (legacy)
function blurMobileNav() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // Primero, quitar inmediatamente el foco del elemento actualmente enfocado
        if (document.activeElement && document.activeElement.classList.contains('boton')) {
            document.activeElement.blur();
        }
        
        // Limpiar todos los botones de navegación
        const buttons = document.querySelectorAll('.boton');
        buttons.forEach(button => {
            // Forzar blur inmediato
            button.blur();
            
            // Limpiar estilos inline que puedan estar aplicados
            button.style.removeProperty('background-color');
            button.style.removeProperty('color');
            button.style.removeProperty('outline');
            
            // Si no es el botón activo, forzar estilos transparentes
            if (!button.classList.contains('active')) {
                button.style.setProperty('background-color', 'transparent', 'important');
                button.style.setProperty('color', 'var(--color-text)', 'important');
            }
        });
        
        // Crear elemento temporal invisible para robar el foco
        const tempElement = document.createElement('input');
        tempElement.style.cssText = `
            position: absolute;
            top: -9999px;
            left: -9999px;
            width: 1px;
            height: 1px;
            opacity: 0;
            pointer-events: none;
            border: none;
            outline: none;
        `;
        document.body.appendChild(tempElement);
        
        // Enfocar inmediatamente el elemento temporal
        tempElement.focus();
        tempElement.blur();
        
        // Remover inmediatamente
        setTimeout(() => {
            if (document.body.contains(tempElement)) {
                document.body.removeChild(tempElement);
            }
        }, 10);
        
        // Forzar que el body tome el foco
        document.body.focus();
        
        // Forzar reflow/repaint
        const nav = document.querySelector('nav');
        if (nav) {
            const computedStyle = window.getComputedStyle(nav);
            nav.style.display = computedStyle.display;
        }
        
        // Trigger reflow adicional
        setTimeout(() => {
            buttons.forEach(button => {
                if (!button.classList.contains('active')) {
                    button.style.setProperty('background-color', 'transparent', 'important');
                }
            });
        }, 1);
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
}
