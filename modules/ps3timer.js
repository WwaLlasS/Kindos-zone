const notifier = require('node-notifier')
const path = require('path')
let span = document.getElementsByTagName('span')
let button = document.getElementsByTagName('button')
let audio = document.getElementById('sound')
let counter


var chronometer = (minutos, segundos) => {
  stopTimer()
  let spanMinutos = span[0]
  let spanSegundos = span[1]
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
        'title': 'kindo\'s Playstation 3',
        'message': 'El tiempo a finalizado',
        'icon': path.join(__dirname,'../resources/image/ps-logo.png')
      });
    }
  },1000)
}

var stopTimer = () => {
  clearInterval(counter)
  span[0].innerHTML = '00'
  span[1].innerHTML = '00'
}

var initTimer = () =>{
  let count_minutos = document.getElementsByTagName('input')[0].value;
  let count_segundos = -1;
  count_minutos = parseInt(count_minutos);
  chronometer(count_minutos, count_segundos)
}

button[0].addEventListener('click', initTimer)
button[1].addEventListener('click', stopTimer)
