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

// Efeito de digitação
document.addEventListener('DOMContentLoaded', function() {
    const typedTextSpan = document.querySelector('.typed-text');
    if (!typedTextSpan) return;
    
    const textArray = typedTextSpan.getAttribute('data-typed-items').split(',');
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Efeito de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animação ao rolar a página
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-header, .about-content, .services-grid, .portfolio-grid, .contact-content')
    .forEach(el => observer.observe(el));

// Adicione este código ao arquivo public/js/main.js

// Manipulação do formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coleta os dados do formulário
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Aqui você pode adicionar código para enviar o formulário via AJAX
            // ou integrar com um serviço de e-mail como FormSubmit, Formspree, etc.
            
            // Exemplo de feedback visual
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Altera o botão para indicar envio
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Enviando...</span> <i class="bx bx-loader-alt bx-spin"></i>';
            
            // Simula o envio (substitua por uma chamada AJAX real)
            setTimeout(() => {
                // Cria um elemento de alerta de sucesso
                const successAlert = document.createElement('div');
                successAlert.className = 'form-alert success';
                successAlert.innerHTML = '<i class="bx bx-check-circle"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.';
                
                // Insere o alerta antes do formulário
                contactForm.parentNode.insertBefore(successAlert, contactForm);
                
                // Reseta o formulário
                contactForm.reset();
                
                // Restaura o botão
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                // Remove o alerta após alguns segundos
                setTimeout(() => {
                    successAlert.classList.add('fade-out');
                    setTimeout(() => successAlert.remove(), 500);
                }, 5000);
            }, 1500);
        });
    }
});

// Adicione este CSS para a mensagem de sucesso
document.head.insertAdjacentHTML('beforeend', `
<style>
.success-message {
    text-align: center;
    padding: 40px 20px;
    animation: fadeIn 0.5s ease-out;
}

.success-message i {
    font-size: 5rem;
    color: #4CAF50;
    margin-bottom: 20px;
}

.success-message h3 {
    font-size: 1.8rem;
    margin-bottom: 15px;
    color: var(--text-color);
}

.success-message p {
    font-size: 1.1rem;
    color: var(--text-color-alt);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
`);