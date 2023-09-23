import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form.form'),
};

refs.form.addEventListener('submit', handleSubmit);
let delayInfo;

function handleSubmit(event) {
  event.preventDefault();
  delayInfo = null;

  const amount = Number(refs.form.elements.amount.value);
  const delayStep = Number(refs.form.elements.step.value);
  const delay = Number(refs.form.elements.delay.value);

  delayInfo += delay;
  let current = 1;
  let timerId = null;

  setTimeout(() => {
    if (amount <= 0 || delayStep < 0 || delay < 0) {
      return Notiflix.Notify.failure(
        'Delay fields must be positive, and amount > 0'
      );
    }

    function go() {
      createPromise(current, delayStep)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
      if (amount === 1) {
        return;
      }
      if (current === amount) {
        clearInterval(timerId);
      }
      current++;
    }
    if (amount === 1) {
      go();
    } else {
      go();
      timerId = setInterval(go, delayStep);
    }
  }, delay);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      resolve({ position, delay: delayInfo });
    } else {
      // Reject
      reject({ position, delay: delayInfo });
    }
    delayInfo += delay;
  });
}
