let questionBar = document.getElementsByClassName("question__container")

for (let i = 0; i < questionBar.length; i++) {
  questionBar[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

