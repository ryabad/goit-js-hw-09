import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputDate: document.querySelector('input#datetime-picker'),
  start: document.querySelector('button[data-start]'),
  resetBtn: document.querySelector('button[data-reset]'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};
let timerId = null;

refs.start.setAttribute(`disabled`, '');

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
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.start.removeAttribute('disabled');
    }
  },
};

let calendar = flatpickr(refs.inputDate, options);

refs.start.addEventListener('click', handleClick);
refs.resetBtn.addEventListener('click', handleClickReset);

function handleClick() {
  const chosenTime = new Date(`${refs.inputDate.value}`).getTime();
  countTime(chosenTime);

  timerId = setInterval(countTime, 1000, chosenTime);

  refs.start.setAttribute('disabled', '');
  refs.inputDate.setAttribute(`disabled`, '');
}

function countTime(chosen) {
  const currentTime = new Date().getTime();
  const diff = chosen - currentTime;
  const convertedDiff = convertMs(diff);

  refs.days.textContent = `${addLeadingZero(convertedDiff.days)}`;
  refs.hours.textContent = `${addLeadingZero(convertedDiff.hours)}`;
  refs.minutes.textContent = `${addLeadingZero(convertedDiff.minutes)}`;
  refs.seconds.textContent = `${addLeadingZero(convertedDiff.seconds)}`;

  const check =
    refs.days.textContent === '00' &&
    refs.hours.textContent === '00' &&
    refs.minutes.textContent === '00' &&
    refs.seconds.textContent === '00';

  if (check) {
    clearInterval(timerId);
    refs.inputDate.removeAttribute('disabled');
  }
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

function handleClickReset() {
  // location.reload();
  clearInterval(timerId);
  resetTimer();
  calendar.clear();

  const date = new Date();
  calendar.setDate(date, 'y/m/d');

  refs.inputDate.removeAttribute('disabled');
}

function resetTimer() {
  refs.days.textContent = '00';
  refs.hours.textContent = '00';
  refs.minutes.textContent = '00';
  refs.seconds.textContent = '00';
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
