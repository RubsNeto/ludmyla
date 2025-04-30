// Script para o cursor personalizado com efeito de atraso
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.display = 'block';
        
        // Posição exata para o ponto do cursor
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Função de animação para criar o efeito de atraso
    function animateCursor() {
        // Cria o efeito de atraso para o contorno
        let dx = mouseX - outlineX;
        let dy = mouseY - outlineY;
        
        outlineX += dx * 0.2;
        outlineY += dy * 0.2;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Adiciona efeito de hover em links e botões
    const hoverElements = document.querySelectorAll('a, button, .btn, .portfolio-item, .service-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
        });
    });
    
    // Esconde o cursor quando sai da janela
    document.addEventListener('mouseout', function() {
        cursor.style.display = 'none';
    });
    
    document.addEventListener('mouseover', function() {
        cursor.style.display = 'block';
    });
});