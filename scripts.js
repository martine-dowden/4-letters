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

let wordOfTheDay;

(() => {
  console.log('hello world');
  document.addEventListener('submit', handleSubmit);
  wordOfTheDay = getWordOfTheDay()
})()

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
  console.log('isCorrect', isCorrect)
  console.log('We were valid continuing')
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
