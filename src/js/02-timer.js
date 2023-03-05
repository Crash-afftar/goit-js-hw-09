import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const timerMain = document.querySelector('.timer');
const dateChoose = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0]< new Date()) {
        Notiflix.Notify.failure('Please choose a date in the future');
        startBtn.disabled = true;
      } else {
    Notiflix.Notify.success('Wow! You are on true way');
    startBtn.disabled = false;}
    },
  };

  flatpickr(dateChoose, options);

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const dateTimer = new Date(dateChoose.value);
const dateNow = new Date();

startBtn.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countdown = new Date(dateChoose.value) - new Date();

    startBtn.disabled = true;
    if (countdown >= 0) {
      let timeCount = convertMs(countdown);
      timerDays.textContent = addLeadingZero(timeCount.days);
      timerHours.textContent = addLeadingZero(timeCount.hours);
      timerMinutes.textContent = addLeadingZero(timeCount.minutes);
      timerSeconds.textContent = addLeadingZero(timeCount.seconds);
      if (countdown <= 10000) {
        timerMain.style.color = 'green';
      }
    } else {
      Notiflix.Notify.success('Its Now');
      timerMain.style.color = 'grey';
      clearInterval(timer);
    }
  }, 1000);
});