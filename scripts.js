document.addEventListener("DOMContentLoaded", function () {
    const currentLangButton = document.getElementById('current-lang');
    const langOptions = document.getElementById('lang-option');
    const languageButtons = document.querySelectorAll('.lang-btn');

    function loadLanguage(lang) {
        fetch(`/languages/${lang}.json`)
            .then(response => response.json())
            .then(data => applyTranslations(data))
            .catch(error => console.error('Erro ao carregar o arquivo de idioma:', error));
    }

    function applyTranslations(translations) {
        // Header links
        document.querySelector('#home-link .nav-text').textContent = translations.header.home;
        document.querySelector('#services-link .nav-text').textContent = translations.header.services;
        document.querySelector('#about-link .nav-text').textContent = translations.header.about;
        document.querySelector('#contact-link .nav-text').textContent = translations.header.contact;

        // Home Section
        document.getElementById('home-welcome').textContent = translations.home.welcome;
        document.getElementById('home-description').textContent = translations.home.description;

        // Services Section
        document.getElementById('services-title').textContent = translations.services.title;
        document.getElementById('service-1').querySelector('.service-name').textContent = translations.services.service1;
        document.getElementById('service-1').querySelector('.service-price').textContent = translations.services.price1;
        document.getElementById('service-2').querySelector('.service-name').textContent = translations.services.service2;
        document.getElementById('service-2').querySelector('.service-price').textContent = translations.services.price2;
        document.getElementById('service-3').querySelector('.service-name').textContent = translations.services.service3;
        document.getElementById('service-3').querySelector('.service-price').textContent = translations.services.price3;
        document.getElementById('service-4').querySelector('.service-name').textContent = translations.services.service4;
        document.getElementById('service-4').querySelector('.service-price').textContent = translations.services.price4;
        document.getElementById('service-5').querySelector('.service-name').textContent = translations.services.service5;
        document.getElementById('service-5').querySelector('.service-price').textContent = translations.services.price5;
        document.getElementById('service-6').querySelector('.service-name').textContent = translations.services.service6;
        document.getElementById('service-6').querySelector('.service-price').textContent = translations.services.price6;
        document.getElementById('service-7').querySelector('.service-name').textContent = translations.services.service7;
        document.getElementById('service-7').querySelector('.service-price').textContent = translations.services.price7;
        document.getElementById('service-8').querySelector('.service-name').textContent = translations.services.service8;
        document.getElementById('service-8').querySelector('.service-price').textContent = translations.services.price8;

        // Hours in Services Section
        document.getElementById('hours-title').textContent = translations.services.hoursTitle;
        document.getElementById('hour-1').textContent = translations.services.hour1;
        document.getElementById('hour-2').textContent = translations.services.hour2;
        document.getElementById('hour-3').textContent = translations.services.hour3;
        document.getElementById('hour-4').textContent = translations.services.hour4;
        document.getElementById('hour-5').textContent = translations.services.hour5;

        // About Us Section
        document.getElementById('about-title').textContent = translations.about.title;
        document.getElementById('about-description-1').textContent = translations.about.description1;
        document.getElementById('about-description-2').textContent = translations.about.description2;
        document.getElementById('about-description-3').textContent = translations.about.description3;
        document.getElementById('about-description-4').textContent = translations.about.description4;

        // Contact Section
        document.getElementById('contact-title').textContent = translations.contact.title;
        document.getElementById('contact-address').textContent = translations.contact.address;
        document.getElementById('contact-phone').textContent = translations.contact.phone;

        // Footer Section
        document.getElementById('footer-salon-name').textContent = translations.footer.salonName + " Nuray Bal";
        document.getElementById('footer-hours-title').textContent = translations.footer.hoursTitle;
        document.getElementById('footer-hour-1').textContent = translations.footer.hour1;
        document.getElementById('footer-hour-2').textContent = translations.footer.hour2;
        document.getElementById('footer-hour-3').textContent = translations.footer.hour3;
        document.getElementById('footer-hour-4').textContent = translations.footer.hour4;
        document.getElementById('footer-text').textContent = translations.footer.copyright;
        document.getElementById('footer-instagram').textContent = translations.footer.instagram;
    }

    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.id;
            const imgSrc = button.querySelector('img').src;
            currentLangButton.querySelector('img').src = imgSrc;
            langOptions.style.display = 'none';
            languageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadLanguage(lang);
        });
    });

    // Exibe ou oculta as opções de idioma ao clicar na bandeira
    currentLangButton.addEventListener('click', () => {
        langOptions.style.display = langOptions.style.display === 'block' ? 'none' : 'block';
    });

    // Carrega o idioma padrão (alemão)
    loadLanguage('de');
    document.getElementById('de').classList.add('active');
});

// Código de rolagem do cabeçalho
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const logoImg = document.getElementById('logo-img');
    let mouseMoved = false;
    let mouseMoveTimeout;

    function toggleHeader() {
        if (window.scrollY > 50 || mouseMoved) {
            header.classList.remove('transparent');
            header.classList.add('scrolled');
            logoImg.src = 'assets/logo_branco.png';
        } else {
            header.classList.add('transparent');
            header.classList.remove('scrolled');
            logoImg.src = 'assets/logo_cinza.png';
        }
    }

    function handleMouseMove() {
        mouseMoved = true;
        toggleHeader();

        clearTimeout(mouseMoveTimeout);
        mouseMoveTimeout = setTimeout(() => {
            mouseMoved = false;
            toggleHeader();
        }, 1000);
    }

    window.addEventListener('scroll', toggleHeader);
    document.addEventListener('mousemove', handleMouseMove);

    toggleHeader(); // Inicializa o cabeçalho corretamente no carregamento
});
