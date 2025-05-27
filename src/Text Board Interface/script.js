// text input
let textInput = document.getElementById("input-text");
let text = "";

// animation style
const animeSelect = document.getElementById("animation-style");
let selectedOption = "";

// canvas
const canvas = document.getElementById("scrolltext");
const c = canvas.getContext("2d");

// full canvas
const fullCanvas = document.getElementById("full-canvas");
const fullC = fullCanvas.getContext("2d");

// speed input
const speedInput = document.getElementById("speed");
let speed;

// size input
const sizeInput = document.getElementById("size");
let size = "";

// background input
const bgButton = document.getElementById("btn-bg");
const bgContent = document.getElementById("background-content");
let backgroundInput = "";

// font input
const fontInput = document.getElementById("select-font");
let font = "";

// color input
const colorInput = document.getElementById("color-input");
let color = "";

// stroke input
const strokeInput = document.getElementById("stroke-color-input");
let stroke = "";

colorInput.addEventListener("change", (e) => {
  color = e.target.value;
  c.fillStyle = `${color}`;
});

strokeInput.addEventListener("change", (e) => {
  stroke = e.target.value;
  c.lineWidth = 3;
  c.strokeStyle = stroke;
});

fontInput.addEventListener("change", (e) => {
  font = e.target.value;
});

textInput.addEventListener("input", (e) => {
  text = e.target.value;
});

speedInput.addEventListener("input", (e) => {
  speed = Number(e.target.value);
});

sizeInput.addEventListener("input", (e) => {
  size = e.target.value;
  c.font = `${size}px ${font}`;
});

const gifs = [
  "/photo/bg-blinking-star.gif",
  "/photo/disco.gif",
  "/photo/heart.gif",
  "/photo/tea.jpg",
  "/photo/merry-chrismas.gif",
  "/photo/free-happy-birthday.gif",
  "/photo/firework.gif",
];

gifs.forEach((gif) => {
  const img = document.createElement("img");
  img.src = gif;
  img.addEventListener("click", () => {
    backgroundInput = gif;
    canvas.style.background = `url(${backgroundInput})`;
    canvas.style.backgroundSize = "cover";
    canvas.style.backgroundRepeat = "no-repeat";
    canvas.style.backgroundAttachment = "fixed";
    canvas.style.backgroundPosition = "center top";
  });
  bgContent.appendChild(img);
});

bgButton.addEventListener("click", function () {
  bgContent.classList.toggle("active");
});

animeSelect.addEventListener("change", (e) => {
  selectedOption = e.target.value;

  if (selectedOption === "left") {
    leftToRight(text);
  } else if (selectedOption === "right") {
    rightToLeft(text);
  }
});

const coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.display === "flex") {
      content.style.display = "none";
    } else {
      content.style.display = "flex";
    }
  });
}

const inputForm = document.getElementById("input-form");

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fullCanvas.style.display = "block";

  fullCanvas.style.position = "fixed";
  fullCanvas.style.top = "0";
  fullCanvas.style.left = "0";
  fullCanvas.style.zIndex = "9999";
  fullCanvas.width = window.innerWidth;
  fullCanvas.height = window.innerHeight;

  fullC.fillStyle = `${color}`;
  fullC.lineWidth = 3;
  fullC.strokeStyle = `${stroke}`;
  fullC.font = `${parseInt(size) * 5}px ${font}`;

  fullCanvas.style.background = `url(${backgroundInput})`;
  fullCanvas.style.backgroundSize = "cover";
  fullCanvas.style.backgroundRepeat = "no-repeat";
  fullCanvas.style.backgroundAttachment = "fixed";
  fullCanvas.style.backgroundPosition = "center top";

  if (window.innerWidth < 600) {
    if (selectedOption === "left") {
      leftToRightFullMobile(text);
    } else if (selectedOption === "right") {
      rightToLeftFullMobile(text);
    }
  } else {
    if (selectedOption === "left") {
      leftToRightFull(text);
    } else if (selectedOption === "right") {
      rightToLeftFull(text);
    }
  }
});

let xLeft = 0;
function leftToRight(text) {
  requestAnimationFrame(() => leftToRight(text));
  c.clearRect(0, 0, canvas.width, canvas.height);

  c.fillText(text, xLeft, 100);
  c.strokeText(text, xLeft, 100);

  xLeft += speed;

  if (xLeft > 450) {
    xLeft = -200;
  }
}

let xRight = canvas.width;
function rightToLeft(text) {
  requestAnimationFrame(() => rightToLeft(text));
  c.clearRect(0, 0, canvas.width, canvas.height);

  c.fillText(text, xRight, 100);
  c.strokeText(text, xRight, 100);

  xRight -= speed;

  if (xRight < -200) {
    xRight = 400;
  }
}

let fullXLeft = 0;
function leftToRightFull(text) {
  requestAnimationFrame(() => leftToRightFull(text));
  fullC.clearRect(0, 0, fullCanvas.width, fullCanvas.height);

  fullC.fillText(text, fullXLeft, 600);
  fullC.strokeText(text, fullXLeft, 600);

  fullXLeft += speed * 2;

  if (fullXLeft > 2100) {
    fullXLeft = -400;
  }
}

let fullXRight = fullCanvas.width;
function rightToLeftFull(text) {
  requestAnimationFrame(() => rightToLeftFull(text));
  fullC.clearRect(0, 0, fullCanvas.width, fullCanvas.height);

  fullC.fillText(text, fullXRight, 600);
  fullC.strokeText(text, fullXRight, 600);

  fullXRight -= speed * 2;

  if (fullXRight < -1000) {
    fullXRight = 2000;
  }
}

let fullYTop = 0;
function leftToRightFullMobile(text) {
  requestAnimationFrame(() => leftToRightFullMobile(text));
  fullC.clearRect(0, 0, fullCanvas.width, fullCanvas.height);

  fullC.save();
  fullC.translate(300, fullYTop);
  fullC.rotate(-Math.PI / 2);
  fullC.fillText(text, -20, 0);
  fullC.strokeText(text, -20, 0);
  fullC.restore();

  fullYTop += speed * 2;

  if (fullYTop > fullCanvas.height + 300) {
    fullYTop = -200;
  }
}

let fullYBottom = fullCanvas.height;
function rightToLeftFullMobile(text) {
  requestAnimationFrame(() => rightToLeftFullMobile(text));
  fullC.clearRect(0, 0, fullCanvas.width, fullCanvas.height);

  fullC.save();
  fullC.translate(300, fullYBottom);
  fullC.rotate(-Math.PI / 2);
  fullC.fillText(text, -20, 0);
  fullC.strokeText(text, -20, 0);
  fullC.restore();

  fullYBottom -= speed * 2;

  if (fullYBottom < -400) {
    fullYBottom = fullCanvas.height + 300;
  }
}
