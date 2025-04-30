// Script para centralizar ícones
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os elementos com ícones
    const iconElements = document.querySelectorAll('.social-icon, .service-icon, .portfolio-link i, .btn i');
    
    // Aplica estilos para centralizar
    iconElements.forEach(icon => {
        if (icon.tagName === 'I') {
            icon.style.display = 'flex';
            icon.style.justifyContent = 'center';
            icon.style.alignItems = 'center';
        } else {
            const iconChild = icon.querySelector('i');
            if (iconChild) {
                icon.style.display = 'flex';
                icon.style.justifyContent = 'center';
                icon.style.alignItems = 'center';
            }
        }
    });
});