/**
 * Animaciones de certificados
 * Maneja las animaciones de hover en las tarjetas de certificados
 */

// Mapeo de certificados a sus íconos claros
const certIconMap = {
    'metodologia': 'assets/icons/PhGearSixFill.svg',
    'marketing': 'assets/icons/NimbusMarketing (2).svg',
    'python-analisis': 'assets/icons/DeviconPlainPython.svg',
    'python-variables': 'assets/icons/DeviconPlainPython.svg',
    'mysql': 'assets/icons/CibMysql.svg',
    'cpp3': 'assets/icons/icons8-c++.svg',
    'cpp2': 'assets/icons/icons8-c++.svg',
    'cpp1': 'assets/icons/icons8-c++.svg',
    'appinventor': 'assets/icons/DuoIconsAndroid.svg',
    'java-variables': 'assets/icons/DeviconPlainJava.svg',
    'php': 'assets/icons/SimpleIconsPhp.svg',
    'java-gui': 'assets/icons/DeviconPlainJava.svg',
    'cpp-conceptos': 'assets/icons/icons8-c++.svg',
    'electronica': 'assets/icons/StreamlineUltimateMicrochipBoard.svg',
    'informatica': 'assets/icons/TablerDeviceImacCog.svg'
};

// Funciones para animaciones de certificados
function initCertAnimations() {
    const certCards = document.querySelectorAll('.certification-card');
    
    certCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const certId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            startHoverAnimation(this, certId);
        });
        
        card.addEventListener('mouseleave', function() {
            stopHoverAnimation();
        });
    });
}

function startHoverAnimation(cardElement, certId) {
    // Activar estado hover en la tarjeta
    cardElement.classList.add('hover-active');
    
    // Crear contenedor local para íconos flotantes si no existe
    let localContainer = cardElement.querySelector('.floating-icons-local');
    if (!localContainer) {
        localContainer = document.createElement('div');
        localContainer.className = 'floating-icons-local';
        cardElement.appendChild(localContainer);
    }
    
    // Limpiar íconos previos
    localContainer.innerHTML = '';
    
    // Obtener el ícono específico del certificado
    const iconSrc = certIconMap[certId] || 'assets/icons/DuoIconsCertificate.svg';
    
    // Obtener dimensiones del contenedor
    const rect = cardElement.getBoundingClientRect();
    const containerWidth = rect.width;
    const containerHeight = rect.height;
    
    // Crear múltiples íconos que aparecen desde los bordes
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            createDispersionIcon(localContainer, iconSrc, containerWidth, containerHeight, i);
        }, i * 200);
    }
}

function createDispersionIcon(container, iconSrc, containerWidth, containerHeight, index) {
    const icon = document.createElement('img');
    icon.src = iconSrc;
    icon.className = 'cert-floating-icon';
    
    // Determinar desde qué borde aparece el ícono
    const side = index % 4;
    let startX, startY, directionClass;
    
    switch(side) {
        case 0: // Desde arriba
            startX = Math.random() * containerWidth + 40; // 40px de offset por el padding del contenedor local
            startY = 0;
            directionClass = 'from-top';
            break;
        case 1: // Desde la derecha
            startX = containerWidth + 40;
            startY = Math.random() * containerHeight + 40;
            directionClass = 'from-right';
            break;
        case 2: // Desde abajo
            startX = Math.random() * containerWidth + 40;
            startY = containerHeight + 40;
            directionClass = 'from-bottom';
            break;
        case 3: // Desde la izquierda
            startX = 0;
            startY = Math.random() * containerHeight + 40;
            directionClass = 'from-left';
            break;
    }
    
    // Añadir variación aleatoria en la posición
    startX += (Math.random() - 0.5) * 30;
    startY += (Math.random() - 0.5) * 30;
    
    icon.style.left = startX + 'px';
    icon.style.top = startY + 'px';
    icon.classList.add(directionClass);
    
    container.appendChild(icon);
    
    // Remover ícono después de la animación
    setTimeout(() => {
        if (icon.parentNode) {
            icon.parentNode.removeChild(icon);
        }
    }, 3500);
}

function stopHoverAnimation() {
    // Remover estado hover de todas las tarjetas
    document.querySelectorAll('.certification-card.hover-active').forEach(card => {
        card.classList.remove('hover-active');
        
        // Remover contenedor local de íconos flotantes
        const localContainer = card.querySelector('.floating-icons-local');
        if (localContainer) {
            setTimeout(() => {
                if (localContainer.parentNode) {
                    localContainer.parentNode.removeChild(localContainer);
                }
            }, 500);
        }
    });
}
