import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form.form'),
};

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const amount = Number(refs.form.elements.amount.value);
  const delayStep = Number(refs.form.elements.step.value);
  const delay = Number(refs.form.elements.delay.value);

  let current = 1;
  let timerId = null;

  setTimeout(() => {
    if (amount <= 0) {
      return;
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
      if (current === amount) {
        clearInterval(timerId);
      }
      current++;
    }
    go();
    timerId = setInterval(go, delayStep);
  }, delay);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      resolve({ position, delay });
    } else {
      // Reject
      reject({ position, delay });
    }
  });
}
