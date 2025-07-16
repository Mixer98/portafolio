/**
 * Modal de certificados
 * Maneja la apertura, cierre y animaciones del modal para mostrar certificados
 */

// Funciones para el modal de certificados
function openCertModal(certId, title, pdfPath) {
    const modal = document.getElementById('certModal');
    const modalTitle = document.getElementById('modalTitle');
    const certViewer = document.getElementById('certViewer');
    const downloadLink = document.getElementById('downloadLink');
    
    modalTitle.textContent = title;
    downloadLink.href = pdfPath;
    
    // Mostrar modal inmediatamente con animaciones
    modal.style.display = 'block';
    modal.classList.add('cert-animation-active');
    document.body.style.overflow = 'hidden';
    
    // Crear animación de íconos para el modal
    createModalFloatingIcons(certId);
    
    // Cargar PDF con manejo de errores
    certViewer.onload = function() {
        console.log('PDF cargado correctamente');
    };
    
    certViewer.onerror = function() {
        console.log('Error al cargar PDF, mostrando mensaje alternativo');
        certViewer.style.display = 'none';
        const errorMsg = document.createElement('div');
        errorMsg.className = 'pdf-error';
        errorMsg.innerHTML = `
            <div class="error-content">
                <img src="assets/icons/DuoIconsCertificate.svg" alt="Certificado" class="error-icon">
                <h4>No se puede mostrar el certificado</h4>
                <p>El archivo PDF no se puede mostrar en el navegador, pero puedes descargarlo directamente.</p>
            </div>
        `;
        certViewer.parentNode.insertBefore(errorMsg, certViewer);
    };
    
    certViewer.src = pdfPath + '#toolbar=1&navpanes=0&scrollbar=1';
    certViewer.style.display = 'block';
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    const certViewer = document.getElementById('certViewer');
    const errorMsg = document.querySelector('.pdf-error');
    const modalFloatingContainer = document.querySelector('.modal-floating-icons');
    
    modal.style.display = 'none';
    modal.classList.remove('cert-animation-active');
    certViewer.src = '';
    certViewer.style.display = 'block';
    document.body.style.overflow = 'auto';
    
    // Remover mensaje de error si existe
    if (errorMsg) {
        errorMsg.remove();
    }
    
    // Remover íconos flotantes del modal
    if (modalFloatingContainer) {
        modalFloatingContainer.remove();
    }
}

// Función para crear íconos flotantes en el modal
function createModalFloatingIcons(certId) {
    // Remover contenedor anterior si existe
    const existingContainer = document.querySelector('.modal-floating-icons');
    if (existingContainer) {
        existingContainer.remove();
    }
    
    // Crear nuevo contenedor
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-icons-container modal-floating-icons';
    document.body.appendChild(floatingContainer);
    
    // Obtener ícono específico del certificado
    const iconSrc = certIconMap[certId] || 'assets/icons/DuoIconsCertificate.svg';
    
    // Crear múltiples íconos flotantes desde diferentes esquinas
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            createRandomFloatingIcon(floatingContainer, iconSrc, i);
        }, i * 300);
    }
}

function createRandomFloatingIcon(container, iconSrc, index) {
    const icon = document.createElement('img');
    icon.src = iconSrc;
    icon.className = `floating-icon direction-${(index % 4) + 1}`;
    
    // Posicionar aleatoriamente en los bordes de la pantalla
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let startX, startY;
    const side = index % 4;
    
    switch(side) {
        case 0: // Desde arriba
            startX = Math.random() * windowWidth;
            startY = -50;
            break;
        case 1: // Desde la derecha
            startX = windowWidth + 50;
            startY = Math.random() * windowHeight;
            break;
        case 2: // Desde abajo
            startX = Math.random() * windowWidth;
            startY = windowHeight + 50;
            break;
        case 3: // Desde la izquierda
            startX = -50;
            startY = Math.random() * windowHeight;
            break;
    }
    
    icon.style.left = startX + 'px';
    icon.style.top = startY + 'px';
    
    container.appendChild(icon);
    
    // Remover ícono después de la animación
    setTimeout(() => {
        if (icon.parentNode) {
            icon.parentNode.removeChild(icon);
        }
    }, 4000);
}

// Event listeners para el modal
function initModalEventListeners() {
    // Cerrar modal al hacer clic fuera de él
    window.onclick = function(event) {
        const modal = document.getElementById('certModal');
        if (event.target === modal) {
            closeCertModal();
        }
    }
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeCertModal();
        }
    });
}
