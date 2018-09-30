class TypeWriter {
  constructor(txtEl, words, wait = 3000) {
    this.txtEl = txtEl;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  // Type Method
  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full txt of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove a char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add a char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into <span>
    this.txtEl.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Inital type speed
    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // Check to see if the word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Will pause at the end of the word
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move onto next word
      this.wordIndex++;
      // Pause a little before the typing starts
      typeSpeed = 800;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init on DOM load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtEl = document.querySelector(".txt-type");
  const words = JSON.parse(txtEl.getAttribute("data-words"));
  const wait = txtEl.getAttribute("data-wait");

  // Start typewriter
  new TypeWriter(txtEl, words, wait);
}
