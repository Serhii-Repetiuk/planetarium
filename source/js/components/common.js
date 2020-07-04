let orderButton = document.querySelector('.order-popup');
let orderForm = document.querySelector('.order');
let close = document.querySelector('.order-form__close');
let modalShadow = document.querySelector('.modal-shadow');

orderButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  orderForm.classList.remove('visually-hidden');
  orderForm.classList.add('modal-show');
  modalShadow.classList.remove('visually-hidden');
});

close.addEventListener('click', function (evt) {
  evt.preventDefault();
  orderForm.classList.add('visually-hidden');
  orderForm.classList.remove('modal-show');
  modalShadow.classList.add('visually-hidden');
});

