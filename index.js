const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

inputEl.value = null;

const createTimerAnimator = () => {
  function secondsToTimer(seconds) {
    const hours = Math.floor(seconds/3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const timerSeconds = seconds % 60;
    const timer = `${hours}:${minutes}:${timerSeconds}`
    return timer;
  }

  return (seconds) => {
    let time = seconds;
    timerEl.textContent = secondsToTimer(time);
    buttonEl.setAttribute('disabled', true)
    const timer = setInterval(() => {
      if(time !== 0) {
        time -= 1;
        timerEl.textContent = secondsToTimer(time);
      }
      else {
        clearInterval(this);
        buttonEl.removeAttribute('disabled')
      }
    }, 1000)
  }
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  const number = /\d+/;
  const filterdInput = e.target.value.match(number);
  if(filterdInput) {
    return inputEl.value = filterdInput[0];
  } 
  else {
    return inputEl.value = ''
  }
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
