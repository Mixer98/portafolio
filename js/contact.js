/**
 * Utilidades de contacto
 * Maneja la funcionalidad de copiar emails al portapapeles
 */

// Función para copiar email al portapapeles
function copyEmail(email) {
    navigator.clipboard.writeText(email).then(function() {
        // Mostrar feedback visual
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✅';
        btn.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.transform = 'scale(1)';
        }, 1500);
    }).catch(function(err) {
        console.log('Error al copiar: ', err);
        // Fallback para navegadores más antiguos
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Feedback visual
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✅';
        btn.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.transform = 'scale(1)';
        }, 1500);
    });
}
