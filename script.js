console.log("Welcome to Euphoria");

let masterPlay = document.getElementById("masterPlay");
let songIndex = 0;
let audioElement = new Audio('https://github.com/amitrakshar01/Euphoria/blob/main/songs/1.mp3');
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById('masterSongName');
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));

//Song List
let songs =[
    {songName: "River Flows in You", filePath: "https://github.com/amitrakshar01/Euphoria/blob/main/songs/1.mp3", coverPath: "https://github.com/amitrakshar01/Euphoria/blob/main/images/cover1.jpg"},
    {songName: "Kiss the Rain", filePath: "https://github.com/amitrakshar01/Euphoria/blob/main/songs/2.mp3", coverPath: "https://github.com/amitrakshar01/Euphoria/blob/main/images/cover1.jpg"},
    {songName: "When the Love Falls", filePath: "https://github.com/amitrakshar01/Euphoria/blob/main/songs/3.mp3", coverPath: "https://github.com/amitrakshar01/Euphoria/blob/main/images/cover1.jpg"},
    {songName: "Its Your Day", filePath: "https://github.com/amitrakshar01/Euphoria/blob/main/songs/4.mp3", coverPath: "https://github.com/amitrakshar01/Euphoria/blob/main/images/cover1.jpg"},
    {songName: "If I could see you Again", filePath: "https://github.com/amitrakshar01/Euphoria/blob/main/songs/5.mp3", coverPath: "https://github.com/amitrakshar01/Euphoria/blob/main/images/cover1.jpg"},
    {songName: "Prelude in G Minor", filePath: "https://github.com/amitrakshar01/Euphoria/blob/main/songs/6.mp3", coverPath: "https://github.com/amitrakshar01/Euphoria/blob/main/images/cover1.jpg"},
    {songName: "Reminiscent", filePath: "https://github.com/amitrakshar01/Euphoria/blob/main/songs/7.mp3", coverPath: "https://github.com/amitrakshar01/Euphoria/blob/main/images/cover1.jpg"},
    {songName: "Fotografia", filePath: "https://github.com/amitrakshar01/Euphoria/blob/main/songs/8.mp3", coverPath: "https://github.com/amitrakshar01/Euphoria/blob/main/images/cover1.jpg"},
    {songName: "Room with a View", filePath: "https://github.com/amitrakshar01/Euphoria/blob/main/songs/9.mp3", coverPath: "https://github.com/amitrakshar01/Euphoria/blob/main/images/cover1.jpg"}
]

songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//audioElement.play();

audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //Update Progress Bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
 
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        if(audioElement.paused || audioElement.currentTime<=0){
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `https://github.com/amitrakshar01/Euphoria/blob/main/songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else{
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            audioElement.src = `https://github.com/amitrakshar01/Euphoria/blob/main/songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            myProgressBar.value = audioElement.currentTime;
        }
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=8){
        songIndex = 0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 8;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})