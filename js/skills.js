// Animação das barras de progresso
document.addEventListener('DOMContentLoaded', function() {
    // Função para animar as barras de progresso
    function animateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const progressBar = item.querySelector('.skill-progress');
            const progressValue = progressBar.getAttribute('data-progress');
            
            // Inicialmente define a largura como 0
            progressBar.style.width = '0';
            
            // Função para verificar se o elemento está visível na tela
            const isInViewport = (element) => {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.bottom >= 0
                );
            };
            
            // Função para animar a barra quando estiver visível
            const animateIfVisible = () => {
                if (isInViewport(item) && progressBar.style.width === '0px') {
                    progressBar.style.width = progressValue;
                }
            };
            
            // Verifica inicialmente
            animateIfVisible();
            
            // Adiciona evento de scroll para verificar novamente
            window.addEventListener('scroll', animateIfVisible);
            
            // Adiciona efeito de hover
            item.addEventListener('mouseenter', function() {
                progressBar.style.width = progressValue;
            });
        });
    }
    
    // Inicia a animação após um pequeno atraso
    setTimeout(animateSkillBars, 500);
});