const body = document.querySelector('body');
const cotent = document.querySelector('#content');

const IMG_NUMBER = 5;

function handleImgLoad(image) {
  image.classList.add('bgImg');
  body.prepend(image);
  console.log('image load complete');
}

function setImage(imgNumber) {
  const image = new Image();
  image.src = `img/${imgNumber + 1}.jpg`;
  image.addEventListener('load', handleImgLoad(image));
}

/* function setImage(imgNumber) {
  const image = new Image();
  image.src = `img/${imgNumber + 1}.jpg`;
  image.classList.add('bgImg');
  body.prepend(image);
  // image.addEventListener('load', handleLoad);  API를 사용할 경우 필요
} */

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  setImage(randomNumber);
}

init();
