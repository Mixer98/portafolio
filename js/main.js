/**
 * Inicialización principal del portafolio
 * Coordina la inicialización de todos los módulos
 */

// Inicialización principal al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar iconos de Lucide
    lucide.createIcons();

    // Inicializar navegación
    initializeNavigation();

    // Inicializar animaciones de certificados
    initCertAnimations();

    // Inicializar event listeners del modal
    initModalEventListeners();

    console.log('Portafolio Isaac Ricardo - Todos los módulos inicializados correctamente');
});

// Fondo dinámico: foco de luz que sigue al puntero
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty('--mouse-x', `${x}%`);
    document.body.style.setProperty('--mouse-y', `${y}%`);
});
