function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

    const body = document.body;
    const startBtn = document.querySelector('[data-start]');
    const stopBtn = document.querySelector('[data-stop]');

    const PROMPT_DELAY = 1000;
    let intervalId = null;

    startBtn.addEventListener('click', onStartButtonClick);
    stopBtn.addEventListener('click', onStopButtonClick);

    function onStartButtonClick() {
        startBtn.disabled = true;
        stopBtn.disabled = false;

        intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
        },
        PROMPT_DELAY);
    }
    
        
    function onStopButtonClick() {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        
        clearInterval(intervalId);
        body.style.backgroundColor = 'transparent';
    }