function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const displayMinutes = minutes > 9 ? minutes.toString() : `0${minutes}`;
  const displaySeconds = seconds > 9 ? seconds.toString() : `0${seconds}`;

  return `${displayMinutes}:${displaySeconds}`;
}

export default formatTime;
