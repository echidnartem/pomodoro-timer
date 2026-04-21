const audio = new Audio("bell.wav");

function playAlarm() {
  audio.currentTime = 0;
  audio.volume = 0.5;
  audio.play().catch((e) => console.log("Ошибка воспроизведения звука: ", e));
}

export default playAlarm;
