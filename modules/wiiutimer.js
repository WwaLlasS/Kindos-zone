const notifier = require('node-notifier')
const path = require('path')
let span = document.getElementsByTagName('span')
let button = document.getElementsByTagName('button')
let audio = document.getElementById('sound')
let counter


var chronometer = (minutos, segundos) => {
  stopTimer()
  let spanMinutos = span[2]
  let spanSegundos = span[3]
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
        'title': 'kindo\'s Nintendo Wii U',
        'message': 'El tiempo a finalizado',
        'icon': path.join(__dirname,'../resources/image/wiiu.png')
      });
    }
  },1000)
}

var stopTimer = () => {
  clearInterval(counter)
  span[2].innerHTML = '00'
  span[3].innerHTML = '00'
}

var initTimer = () =>{
  let count_minutos = document.getElementsByTagName('input')[1].value;
  let count_segundos = -1;
  count_minutos = parseInt(count_minutos);
  chronometer(count_minutos, count_segundos)
}

button[2].addEventListener('click', initTimer)
button[3].addEventListener('click', stopTimer)
