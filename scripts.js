const dictionary = [
  'cafe',
  'duck',
  'data',
  'book',
  'read',
  'made',
  'mage',
  'lice',
];

const letterCount = 4;
let wordOfTheDay, focusable, currentRow = 1;

(() => {
  document.addEventListener('submit', handleSubmit)
  wordOfTheDay = getWordOfTheDay()
  
  focusable = Array.from(document.querySelectorAll('input, button[type="submit"]'))
  focusable[0].focus();
  const toDisable = focusable.slice(letterCount + 1)
  toDisable.forEach(element => element.setAttribute('disabled', true))
  addEventListener('keyup', handleKeydown);
})()

function handleKeydown(event) {
  if (!/^[a-zA-Z]$/.test(event.key)) { return }
  const index = focusable.findIndex(elem => elem === event.target)
  focusable[index + 1].focus()
}

function getWordOfTheDay() {
  const wordIndex = getRandomInt(dictionary.length - 1)
  console.log('word of the day:', dictionary[wordIndex])
  return dictionary[wordIndex]
}

function handleSubmit(event) {
  event.preventDefault()
  console.log(event)
  const form = event.srcElement;
  const button = form.querySelector('button[type="submit"]')
  const inputs = Array.from(form.querySelectorAll('input'))
  const isInvalid = inputs.some(child => !child.validity)
  if (isInvalid) { return } 

  inputs.forEach(input => input.setAttribute('disabled', true))
  button.setAttribute('disabled', true)
  const arrayOfValues = inputs
    .map(input => input.value.toLowerCase())
  
  const arrayFromWorldOfTheDay = Array.from(wordOfTheDay)
  arrayOfValues.forEach((letter, index) => {
    if (letter === arrayFromWorldOfTheDay[index]) {
      inputs[index].classList.add('correct')
    } else if (arrayFromWorldOfTheDay.includes(letter)) {
      inputs[index].classList.add('misplaced')
    }
  });
  console.log(arrayOfValues, wordOfTheDay)
  const isCorrect = arrayOfValues.reduce((acc, letter) => acc + letter, '') === wordOfTheDay
  if (!isCorrect) {
    const disabledFields = Array.from(document.querySelectorAll(':disabled'))
    const toEnable = disabledFields.slice(currentRow * (letterCount + 1), (currentRow + 1) * (letterCount + 1));
    toEnable.forEach(elem => elem.disabled = false)
    if (toEnable[0]) { toEnable[0].focus() }
    currentRow++
    return
  }

  const playAgain = document.querySelector('.play-again');
  playAgain.setAttribute('style', "display: inline-block");
  playAgain.focus();
}

function playAgain() {
  focusable
    .forEach((elem, i) => {
      if (elem.nodeName === 'INPUT') {
        elem.value = ''
        elem.classList.remove('correct')
        elem.classList.remove('misplaced')
      }
      if (i < letterCount + 1) {
        elem.removeAttribute('disabled')
      } else {
        elem.setAttribute('disabled', true)
      }
    })
  currentRow = 1;
  wordOfTheDay = getWordOfTheDay()
  focusable[0].focus()
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
