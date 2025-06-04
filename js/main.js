document.addEventListener('DOMContentLoaded', function() {
    // Установка текущего года
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Элементы меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navItems = document.querySelectorAll('#nav-menu li');

    // Инициализация анимаций при скролле
    const initScrollAnimations = () => {
        const scrollElements = document.querySelectorAll('[data-scroll]');
        
        const elementInView = (el) => {
            const elementTop = el.getBoundingClientRect().top;
            return elementTop <= (window.innerHeight || document.documentElement.clientHeight) * 0.75;
        };
        
        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el)) {
                    const delay = el.dataset.scrollDelay ? parseInt(el.dataset.scrollDelay) : 0;
                    setTimeout(() => el.classList.add('animated'), delay);
                }
            });
        };
        
        window.addEventListener('load', handleScrollAnimation);
        window.addEventListener('scroll', handleScrollAnimation);
    };

    // Мобильное меню
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');

            if (navMenu.classList.contains('active')) {
                navMenu.style.display = 'flex';
                setTimeout(() => {
                    navMenu.style.opacity = '1';
                    navMenu.style.transform = 'translateX(0)';
                }, 10);
            } else {
                navMenu.style.opacity = '0';
                navMenu.style.transform = 'translateX(-100%)';
                setTimeout(() => {
                    navMenu.style.display = 'none';
                }, 300);
            }
        });

        // Закрытие меню при клике на пункт
        document.querySelectorAll('#nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mobileMenuBtn.classList.remove('active');
                    navMenu.style.opacity = '0';
                    navMenu.style.transform = 'translateX(-100%)';
                    setTimeout(() => {
                        navMenu.classList.remove('active');
                        navMenu.style.display = 'none';
                    }, 300);
                }
            });
        });
    }

    // Кнопка "Наверх"
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            backToTopBtn.classList.toggle('visible', window.pageYOffset > 300);
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Обработка кнопки спонсирования
    const donateBtn = document.getElementById('donate-btn');
    if (donateBtn) {
        donateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Происхoдит переадресация на сайт SPM!');
            setTimeout(() => {
                window.location.href = this.href;
            }, 1500);
        });
    }

    // Плавный скролл
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.id !== 'donate-btn') {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.getElementById('main-header')?.offsetHeight || 80;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Погода
    const updateWeather = () => {
        const weatherConditions = [
            { icon: 'sun', temp: '+24°C', text: 'Ясно' },
            { icon: 'cloud-sun', temp: '+20°C', text: 'Переменная облачность' },
            { icon: 'cloud', temp: '+18°C', text: 'Облачно' },
            { icon: 'cloud-rain', temp: '+16°C', text: 'Дождь' }
        ];
        
        const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        const weatherIcon = document.querySelector('.weather-icon i');
        const temperature = document.querySelector('.temperature');
        const conditions = document.querySelector('.conditions');
        
        if (weatherIcon) weatherIcon.className = `fas fa-${randomWeather.icon}`;
        if (temperature) temperature.textContent = randomWeather.temp;
        if (conditions) conditions.textContent = randomWeather.text;
    };

    // Уведомления
    const showNotification = (message) => {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    };

    // Инициализация
    initScrollAnimations();
    updateWeather();
});
