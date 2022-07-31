
const displayed = document.querySelector('#display > p');
const numberButtons = document.querySelectorAll('.number');

const updateDisplay = (e) => {
    return displayed.textContent = `${displayed.textContent}${e.target.textContent}`;
 }

numberButtons.forEach(button => {
    button.addEventListener('click', (e) => updateDisplay(e))
});





const handleNumber = () => updateDisplay()