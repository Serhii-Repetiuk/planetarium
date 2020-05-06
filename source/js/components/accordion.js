const questionBar = document.getElementsByClassName('question__container');

for (let i = 0; i < questionBar.length; i++) {
  questionBar[i].addEventListener('click', function handler() {
    this.classList.toggle('active');
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  });
}
