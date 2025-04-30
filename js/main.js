// Menu móvel
const menuIcon = document.getElementById('menu-icon');
const navList = document.querySelector('.navlist');
const navLinks = document.querySelectorAll('.nav-link');

// Função para alternar o menu
function toggleMenu() {
    navList.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

// Adicionar evento de clique ao ícone do menu
menuIcon.addEventListener('click', toggleMenu);

// Fechar o menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Fechar o menu ao clicar fora dele
document.addEventListener('click', (e) => {
    if (!navList.contains(e.target) && !menuIcon.contains(e.target) && navList.classList.contains('active')) {
        toggleMenu();
    }
});