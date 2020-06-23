let buttonLeft = document.querySelector('.carousel__button-left');
let buttonRight = document.querySelector('.carousel__button-right');
let images = document.querySelectorAll('.carousel .carousel__images img');

let i = 0;

buttonRight.onclick = function(){
  images[i].style.display = 'none';
  i++;
  if(i >= images.length){
    i = 0;
  }
  images[i].style.display = 'block';
};

buttonLeft.onclick = function(){
  images[i].style.display = 'none';
  i = i - 1;
  if(i < 0){
    i = images.length - 1;
  }
  images[i].style.display = 'block';
};

