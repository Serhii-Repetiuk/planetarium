const questionBar = document.querySelectorAll('.question__container');

for (let i = 0; i < questionBar.length; i++) {
  questionBar[i].addEventListener('click', function handler() {
    this.querySelector('.question__button-img').classList.toggle('question__button-img--active');
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  });
}
