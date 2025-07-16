/**
 * Inicialización principal del portafolio
 * Coordina la inicialización de todos los módulos
 */

// Inicialización principal al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar navegación
    initializeNavigation();
    
    // Inicializar animaciones de certificados
    initCertAnimations();
    
    // Inicializar event listeners del modal
    initModalEventListeners();
    
    console.log('Portafolio Isaac Ricardo - Todos los módulos inicializados correctamente');
});
