import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputDate: document.querySelector('input#datetime-picker'),
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const chosenTime = selectedDates[0].getTime();
    const currentTime = new Date().getTime();
    if (chosenTime < currentTime) {
      refs.start.setAttribute('disabled', '');
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.start.removeAttribute('disabled');
    }
  },
};

flatpickr(refs.inputDate, options);

refs.start.addEventListener('click', handleClick);

function handleClick() {
  const chosenTime = new Date(`${refs.inputDate.value}`).getTime();
  countTime(chosenTime);
  const interval = chosenTime - new Date().getTime();

  timerId = setInterval(countTime, 1000, chosenTime);

  setTimeout(() => {
    clearInterval(timerId);
  }, interval);
  refs.start.setAttribute('disabled', '');
}

function countTime(current) {
  const currentTime = new Date().getTime();
  const diff = current - currentTime;
  const convertedDiff = convertMs(diff);

  refs.days.textContent = `${addLeadingZero(convertedDiff.days)}`;
  refs.hours.textContent = `${addLeadingZero(convertedDiff.hours)}`;
  refs.minutes.textContent = `${addLeadingZero(convertedDiff.minutes)}`;
  refs.seconds.textContent = `${addLeadingZero(convertedDiff.seconds)}`;
}

function addLeadingZero(value) {
  if (typeof value !== 'string') {
    value = value.toString();
  }
  if (value.length <= 2) {
    return value.padStart(2, '0');
  }
  return value;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
