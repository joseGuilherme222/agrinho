document.addEventListener('DOMContentLoaded', () => {
    // 1. Rolagem Suave para Links de Navegação
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Impede o comportamento padrão do link

            const targetId = this.getAttribute('href').substring(1); // Pega o ID da seção (ex: 'sobre')
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Rola suavemente até a seção
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Subtrai um pouco para o menu fixo não cobrir o título
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Animação de "Aparecer" para Seções ao Rolar
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // Observa a viewport
        rootMargin: '0px',
        threshold: 0.2 // A seção será "observada" quando 20% dela estiver visível
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se a seção estiver visível, adiciona a classe 'fade-in'
                entry.target.classList.add('fade-in');
                // Opcional: Para a observação depois de animar uma vez
                // observer.unobserve(entry.target);
            } else {
                // Opcional: Remove a classe se sair da viewport para reanimar ao voltar
                // entry.target.classList.remove('fade-in');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Animação de "Aparecer" para Cards individualmente
    const cards = document.querySelectorAll('.card');

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Anima uma vez e para
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Anima quando 10% do card estiver visível
    });

    cards.forEach(card => {
        cardObserver.observe(card);
    });
});