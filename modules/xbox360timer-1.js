const notifier = require('node-notifier')
const path = require('path')
let span = document.getElementsByTagName('span')
let button = document.getElementsByTagName('button')
let audio = document.getElementById('sound')
let counter


var chronometer = (minutos, segundos) => {
  stopTimer()
  let spanMinutos = span[6]
  let spanSegundos = span[7]
  minutos = (minutos < 0)? 0 : minutos;
  counter = setInterval( () => {
    if (segundos == -1) {
      minutos--;
      segundos = 59;
    }

    (segundos < 10) ? spanSegundos.innerHTML = '0' + segundos : spanSegundos.innerHTML = segundos;
    (minutos < 10) ? spanMinutos.innerHTML = '0' + minutos : spanMinutos.innerHTML = minutos;
    segundos--;

    if (minutos == -1) {
      stopTimer();
      audio.load()
      audio.play();
      notifier.notify({
        'title': 'kindo\'s Xbox 360 "1"',
        'message': 'El tiempo a finalizado',
        'icon': path.join(__dirname,'../resources/image/Xbox_one_logo.svg.png')
      });
    }
  },1000)
}

var stopTimer = () => {
  clearInterval(counter)
  span[6].innerHTML = '00'
  span[7].innerHTML = '00'
}

var initTimer = () =>{
  let count_minutos = document.getElementsByTagName('input')[3].value;
  let count_segundos = -1;
  count_minutos = parseInt(count_minutos);
  chronometer(count_minutos, count_segundos)
}

button[6].addEventListener('click', initTimer)
button[7].addEventListener('click', stopTimer)
