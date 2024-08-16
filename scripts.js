document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const hamburgerIcon = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    let isScrolling = false;
    let mouseMoving = false;
    let mouseMoveTimeout;

    // Função para verificar a posição da rolagem e ajustar o cabeçalho
    function checkScroll() {
        if (window.innerWidth > 768) {  // Aplica a lógica de transição somente se a largura da tela for maior que 768px
            if (window.scrollY > 50 || mouseMoving) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        } else { // Em dispositivos móveis
            header.classList.add('header-scrolled'); // Garante que o cabeçalho seja sempre sólido
        }
    }

    // Função para detectar movimento do mouse
    function handleMouseMove() {
        mouseMoving = true;
        checkScroll();

        // Reseta a variável após um breve período de inatividade do mouse
        clearTimeout(mouseMoveTimeout);
        mouseMoveTimeout = setTimeout(() => {
            mouseMoving = false;
            checkScroll();
        }, 1000);
    }

    // Função para rolar suavemente até a seção correspondente
    function scrollToSection(direction) {
        if (isScrolling) return;
        isScrolling = true;

        const currentSectionIndex = [...sections].findIndex(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top < window.innerHeight;
        });

        let nextSectionIndex = currentSectionIndex;

        if (direction === 'down' && currentSectionIndex < sections.length - 1) {
            nextSectionIndex++;
        } else if (direction === 'up' && currentSectionIndex > 0) {
            nextSectionIndex--;
        }

        sections[nextSectionIndex].scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }

    // Detectar rolagem do mouse
    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            scrollToSection('down');
        } else {
            scrollToSection('up');
        }
    });

    // Detectar clique nos links do menu para rolar até a seção correspondente
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetSection = document.querySelector(link.getAttribute('href'));
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Executa a função ao rolar a página
    window.addEventListener('scroll', checkScroll);

    // Adiciona um listener para o movimento do mouse
    document.addEventListener('mousemove', handleMouseMove);

    // Executa a função uma vez para verificar a posição inicial
    checkScroll();

    // Função para alternar a visibilidade do menu mobile
    function toggleMobileMenu() {
        mobileNav.classList.toggle('show');
    }

    // Adiciona o evento de clique ao ícone do hambúrguer
    hamburgerIcon.addEventListener('click', () => {
        mobileNav.classList.toggle('show'); // Adiciona ou remove a classe 'show' para mostrar/ocultar o menu
    });

    // Funções para o seletor de idiomas
    const defaultLang = 'de'; // Define o idioma padrão como alemão
    loadLanguage(defaultLang); // Carrega o idioma padrão ao iniciar

    const languageSelector = document.querySelector('#current-lang');
    const languageOptions = document.querySelector('#lang-options');

    languageSelector.addEventListener('click', () => {
        languageOptions.classList.toggle('show');
    });

    document.querySelectorAll('.lang-options .lang-btn').forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.id.toLowerCase();
            loadLanguage(selectedLang);
            languageOptions.classList.remove('show');

            // Atualiza a bandeira principal
            const currentLangImg = languageSelector.querySelector('img');
            const selectedLangImg = button.querySelector('img');
            currentLangImg.src = selectedLangImg.src;
            currentLangImg.alt = selectedLangImg.alt;
        });
    });

    function loadLanguage(lang) {
        fetch(`languages/${lang}.json`)
            .then(response => response.json())
            .then(translations => {
                document.querySelector('#home-link').textContent = translations.header.home;
                document.querySelector('#about-link').textContent = translations.header.about;
                document.querySelector('#services-link').textContent = translations.header.services;
                document.querySelector('#contact-link').textContent = translations.header.contact;
                document.querySelector('.home-section h2').textContent = translations.home.welcome;
                document.querySelector('.home-section p').textContent = translations.home.description;
                document.querySelector('.about-section h2').textContent = translations.about.title;
                document.querySelector('.about-section p').textContent = translations.about.description;
                document.querySelector('.services-section h2').textContent = translations.services.title;
                document.querySelector('.contact-section h2').textContent = translations.contact.title;
                document.querySelector('.contact-section p:nth-of-type(1)').textContent = translations.contact.address;
                document.querySelector('.contact-section p:nth-of-type(2)').textContent = translations.contact.phone;
                document.querySelector('.contact-section p:nth-of-type(3)').
                document.querySelector('.contact-section p:nth-of-type(3)').textContent = translations.contact.email;
            })
            .catch(error => console.error('Erro ao carregar o arquivo de idioma:', error));
    }

    // Função para inicializar o mapa do Google Maps
    function initMap() {
        const salonLocation = { lat: 50.810, lng: 8.770 }; // Coordenadas do salão
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: salonLocation
        });

        new google.maps.Marker({
            position: salonLocation,
            map: map
        });
    }

    // Inicializa o mapa se o elemento de mapa estiver presente
    if (document.getElementById('map')) {
        initMap();
    }
});
