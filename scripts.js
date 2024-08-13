document.addEventListener('DOMContentLoaded', () => {
    const defaultLang = 'de'; // Define o idioma padrão como alemão
    loadLanguage(defaultLang); // Carrega o idioma padrão ao iniciar

    // Função para alternar o menu hamburguer no mobile
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Função para manipular a navegação no menu mobile
    function handleMobileNav() {
        const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    handleMobileNav(); // Chama a função para manipular a navegação no mobile

    // Carregar o mapa do Google Maps na seção de contato
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

    // Função para alternar a exibição das opções de idioma
    const languageSelector = document.querySelector('.language-selector');
    const languageOptions = document.querySelector('.language-options');

    languageSelector.addEventListener('click', () => {
        languageOptions.classList.toggle('show');
    });

    // Event listeners para as bandeiras de idioma
    document.querySelectorAll('.language-options img').forEach(flag => {
        flag.addEventListener('click', () => {
            const selectedLang = flag.getAttribute('alt').toLowerCase();
            loadLanguage(selectedLang);
            languageOptions.classList.remove('show'); // Oculta as opções após a seleção
        });
    });

    // Função para carregar o idioma
    function loadLanguage(lang) {
        fetch(`languages/${lang}.json`)
            .then(response => response.json())
            .then(translations => {
                // Atualiza os textos do HTML com base no arquivo JSON carregado
                document.querySelector('#home-link').textContent = translations.nav.home;
                document.querySelector('#about-link').textContent = translations.nav.about;
                document.querySelector('#services-link').textContent = translations.nav.services;
                document.querySelector('#contact-link').textContent = translations.nav.contact;
                document.querySelector('.home-section h2').textContent = translations.welcome;
                document.querySelector('.home-section p').textContent = translations.welcome_message;
                document.querySelector('.about-section p').textContent = translations.about_us;
                document.querySelector('.services-section h2').textContent = translations.our_services;
                document.querySelector('.contact-section h2').textContent = translations.contact_us;
            })
            .catch(error => console.error('Erro ao carregar o arquivo de idioma:', error));
    }

    // Event listeners para os botões de idioma na bandeira
    document.querySelectorAll('.language-selector img').forEach(flag => {
        flag.addEventListener('click', () => {
            const selectedLang = flag.getAttribute('alt').toLowerCase();
            loadLanguage(selectedLang);
        });
    });
});
