/**
 * Animación dinámica de fondo usando Snap.svg
 * Modificada para más dinamismo y fluidez
 */
document.addEventListener('DOMContentLoaded', function() {
    var svg = document.getElementById("cups");
    if (!svg) return;

    var s = Snap(svg);

    var simple = Snap.select('#simple');
    var fancy = Snap.select('#fancy');

    var simplePoints = simple.node.getAttribute('d');
    var fancyPoints = fancy.node.getAttribute('d');

    // Función de animación más fluida y orgánica
    var animateMorph = function(target, pathA, pathB, duration) {
        target.animate({ d: pathB }, duration, mina.easeinout, function() {
            // Al terminar, animar hacia la otra forma
            animateMorph(target, pathB, pathA, duration);
        });
    }

    // Iniciamos la animación con una duración más corta (5 segundos) para mayor dinamismo
    // y suavizado mina.easeinout para que sea orgánica
    animateMorph(simple, simplePoints, fancyPoints, 5000);
});