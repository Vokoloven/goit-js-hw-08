import throttle from 'lodash.throttle';
import Player from '@vimeo/player/dist/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const onPlay = function (data) {
  const durationTime = data.seconds;

  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(durationTime)
  );
};

player.on('play', throttle(onPlay, 5000));

const returnedVideoplayerCurrentTime = Number(
  localStorage.getItem('videoplayer-current-time')
);

player
  .setCurrentTime(returnedVideoplayerCurrentTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

console.log();
