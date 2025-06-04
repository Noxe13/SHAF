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
            modalImage.src = item.image;
            modalImage.alt = item.title;
            modalTitle.textContent = item.title;
            modalDescription.textContent = item.description;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        container.appendChild(galleryItem);
    }

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
});
