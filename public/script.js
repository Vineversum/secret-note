const textArea = document.querySelector('textarea');
const button = document.querySelector('button');
const link = document.querySelector('#link')

if(textArea) {
  textArea.addEventListener('input', (event) => {
    if (event.target.value.length > 0) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  })
}

console.log(link)

if(link) {
  link.addEventListener('click', async (event) => {

    console.log('CLICKED', event.target.textContent);
    await window.navigator.clipboard.writeText(event.target.textContent)
  })
}
