const attractionsData = [
    {
        image: 'images/shafki/mops13.jpg',
        title: 'Lord_Of_Mops13',
        description: 'Запасная ШАФ-ка, создатель этого сайта, тестировщик.'
    },
    {
        image: 'images/shafki/twwentytwo.jpg',
        title: 'twwentytwo',
        description: 'Мэр города (Главная ШАФ-ка), может сыграть на гитаре гимн России в исполнении Миты.'
    },
    {
        image: 'images/shafki/weischne.jpg',
        title: 'weischne',
        description: 'Запасная ШАФ-ка, самый лучший архитектор в мире, щовэл.'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const galleryData = [
        {
            image: 'images/gallery/image1.jpg',
            title: 'Главный портал',
            description: 'Ну так называемый хайп, главная достопримечательность в городе.'
        },
        {
            image: 'images/gallery/image2.jpg',
            title: 'Хайпер-Лупа',
            description: 'Именно с него, вы сможете попасть в наш город.'
        },
        {
            image: 'images/gallery/image3.jpg',
            title: 'Хуйня1',
            description: 'у нас больше нету построек сарян'
        },
        {
            image: 'images/gallery/image4.jpg',
            title: 'Залупа2',
            description: 'нахуй ты это читаешь'
        }
    ];
    
    const attractionsContainer = document.getElementById('attractions-gallery');
    const galleryContainer = document.getElementById('image-gallery');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.getElementById('close-modal');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    // Объединяем все данные галерей в один массив
    const allGalleryItems = [...galleryData, ...attractionsData];
    let currentIndex = 0;

    // Функция для создания элементов галереи
    function createGalleryItem(item, container) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="gallery-item-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => {
            currentIndex = allGalleryItems.findIndex(i => i.image === item.image);
            updateModal(currentIndex);
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        container.appendChild(galleryItem);
    }

    // Обновление модального окна
    function updateModal(index) {
        const item = allGalleryItems[index];
        modalImage.src = item.image;
        modalImage.alt = item.title;
        modalTitle.textContent = item.title;
        modalDescription.textContent = item.description;
        currentIndex = index;
        
        // Показываем/скрываем кнопки в зависимости от позиции
        prevButton.style.display = index === 0 ? 'none' : 'block';
        nextButton.style.display = index === allGalleryItems.length - 1 ? 'none' : 'block';
    }

    // Навигация по галерее
    prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentIndex > 0) {
            updateModal(currentIndex - 1);
        }
    });

    nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentIndex < allGalleryItems.length - 1) {
            updateModal(currentIndex + 1);
        }
    });

    // Создаем элементы галереи
    galleryData.forEach(item => createGalleryItem(item, galleryContainer));
    attractionsData.forEach(item => createGalleryItem(item, attractionsContainer));

    // Закрытие модального окна
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Закрытие по клику вне изображения
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Обработка клавиатуры
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                updateModal(currentIndex - 1);
            } else if (e.key === 'ArrowRight' && currentIndex < allGalleryItems.length - 1) {
                updateModal(currentIndex + 1);
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
});
