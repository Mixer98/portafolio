/**
 * Animación dinámica de fondo usando Snap.svg
 */
document.addEventListener('DOMContentLoaded', function() {
    var svg = document.getElementById("cups");
    if (!svg) return;

    var s = Snap(svg);

    var simple = Snap.select('#simple');
    var fancy = Snap.select('#fancy');

    var simplePoints = simple.node.getAttribute('d');
    var fancyPoints = fancy.node.getAttribute('d');

    var toFancy = function(){
      simple.animate({ d: fancyPoints }, 8000, mina.easeinout, toSimple);
    }

    var toSimple = function(){
      simple.animate({ d: simplePoints }, 8000, mina.easeinout, toFancy);
    }

    toSimple();
});