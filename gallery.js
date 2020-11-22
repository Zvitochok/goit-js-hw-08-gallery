import gallery from "./gallery-items.js";
const refs = {
  galleryHtml: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  lightboxImage: document.querySelector(".lightbox__image"),
  buttonClose: document.querySelector(".lightbox__button"),
}
//Создание и рендер разметки по массиву данных и  шаблону
const galleryItem = (({ preview, original, description }) =>
  `
<li class="gallery__item">
  <a class="gallery__link" href="${original}" >
    <img class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`
);
const galleryList = gallery.reduce((acc, item) => acc + galleryItem(item), '');

//вставляем в HTML
refs.galleryHtml.insertAdjacentHTML('beforeEnd', galleryList);

// Открытие модального окна по клику на элементе галереи.
const handleGalleryClick = e => {
  e.preventDefault();
  const current = e.target;
  if (current.nodeName !== 'IMG') {
    return;
  }
  if (current.nodeName === 'IMG') {
    refs.modal.classList.add('is-open');
    refs.lightboxImage.src = current.getAttribute('data-source');
    refs.lightboxImage.alt = current.alt;
  }
  // console.log(current.nodeName);
};

refs.galleryHtml.addEventListener('click', handleGalleryClick);

// Закрытие модального окна по клику на кнопку
const handleButtonClose = e => {
  const current = e.target;
  if (current.nodeName !== 'BUTTON') {
    return;
  }
  if (current.nodeName === 'BUTTON') {
    refs.modal.classList.remove('is-open');
    refs.lightboxImage.src = '';
    refs.lightboxImage.alt = '';
  }
  // console.log(current.nodeName);
}

refs.buttonClose.addEventListener('click', handleButtonClose);