
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function tellMe(joke){
        VoiceRSS.speech({
        key: 'ac6e132a083d4253aa07ef00757b3831',
        src: joke,
        hl: 'en-us',
        v: 'Mary',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
    console.log(joke)
}

function toggleButton(){
    button.disabled = !button.disabled;
}

async function getJokes() {
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        let joke = '';
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        toggleButton();
        tellMe(joke);
    } catch (error) {
        console.log(error);
    }
    
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);