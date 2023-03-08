const textArea = document.querySelector('textarea');
const button = document.querySelector('button')

textArea.addEventListener('input', (event) => {
  if (event.target.value.length > 0) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
})