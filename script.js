document.addEventListener('DOMContentLoaded', () => {
    const rainSound = new Audio('./rain-sound.mp3');
    const forestSound = new Audio('./forest-sound.mp3');
    const wavesSound = new Audio('./waves-sound.mp3');

    const sounds = [rainSound, forestSound, wavesSound];

    function stopAllSounds() {
        sounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }

    document.getElementById('rainSound').addEventListener('click', () => {
        stopAllSounds();
        rainSound.loop = true;
        rainSound.play();
    });

    document.getElementById('forestSound').addEventListener('click', () => {
        stopAllSounds();
        forestSound.loop = true;
        forestSound.play();
    });

    document.getElementById('wavesSound').addEventListener('click', () => {
        stopAllSounds();
        wavesSound.loop = true;
        wavesSound.play();
    });
});