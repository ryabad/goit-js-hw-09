const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  bodyArea: document.querySelector('body'),
};
let timerId = null;

refs.stopBtn.setAttribute('disabled', '');

refs.startBtn.addEventListener('click', startClick);
refs.stopBtn.addEventListener('click', stopClick);

function startClick() {
  refs.stopBtn.removeAttribute('disabled');
  refs.startBtn.setAttribute('disabled', '');

  timerId = setInterval(() => {
    const color = getRandomHexColor();
    refs.bodyArea.style.backgroundColor = `${color}`;
  }, 1000);
}

function stopClick() {
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', '');

  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
