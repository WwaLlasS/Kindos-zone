const notifier = require('node-notifier')
const path = require('path')
let span = document.getElementsByTagName('span')
let button = document.getElementsByTagName('button')
let audio = document.getElementById('sound')
let counter


var chronometer = (minutos, segundos) => {
  stopTimer()
  let spanMinutos = span[4]
  let spanSegundos = span[5]
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
        'title': 'kindo\'s Xbox ONE',
        'message': 'El tiempo a finalizado',
        'icon': path.join(__dirname,'../resources/image/Xbox_one_logo.svg.png')
      });
    }
  },1000)
}

var stopTimer = () => {
  clearInterval(counter)
  span[4].innerHTML = '00'
  span[5].innerHTML = '00'
}

var initTimer = () =>{
  let count_minutos = document.getElementsByTagName('input')[2].value;
  let count_segundos = -1;
  count_minutos = parseInt(count_minutos);
  chronometer(count_minutos, count_segundos)
}

button[4].addEventListener('click', initTimer)
button[5].addEventListener('click', stopTimer)
