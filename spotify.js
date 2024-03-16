let AudioElement=new Audio("songs/1.mp3");
let playelement=document.querySelector(".play");
let playprevious=document.querySelector(".previous");
let playnext=document.querySelector(".next");
let progressbar=document.querySelector(".slider");
let gif=document.querySelector(".gif");
let songitems = Array.from(document.getElementsByClassName('songs'));
let playpause= Array.from(document.getElementsByClassName('songItemPlay'));
let Msongname= document.getElementById('masterSongName');
let update= document.getElementById('upp');
let globalindex=1;
let index;
let indfinal;
let inter;
let pause=0;

let songList=[
    {songname:"Choo Lo - The Local Train", filepath:"songs/1.mp3", coverpath: "covers/icon1.jpg"},
    {songname:"Jo Tu Na Mila - Asim Azhar", filepath:"songs/2.mp3", coverpath: "covers/icon2.jpg"},
    {songname:"Husn - Anuv Jain", filepath:"songs/3.mp3", coverpath: "covers/icon3.jpg"},
    {songname:"Alag Asmaan - Anuv Jain", filepath:"songs/4.mp3", coverpath: "covers/icon4.jpg"},
    {songname:"Jiyein Kyun", filepath:"songs/5.mp3", coverpath: "covers/icon5.jpg"},
    {songname:"Jahne Wo Kaise - Sanam", filepath:"songs/6.mp3", coverpath: "covers/icon6.jpg"},
    {songname:"Fakira - Sanam", filepath:"songs/7.mp3", coverpath: "covers/icon7.jpg"},
    {songname:"Kahani Suno 2.0", filepath:"songs/8.mp3", coverpath: "covers/icon8.jpg"},
    {songname:"Irraday - Abdul Hannan", filepath:"songs/9.mp3", coverpath: "covers/icon9.jpg"},
    {songname:"Kalank(Title Track)", filepath:"songs/10.mp3", coverpath: "covers/icon10.jpg"},
]

songitems.forEach((element,i)=>{
    element.querySelector("img").src=songList[i].coverpath;
    element.querySelector(".para").innerText = songList[i].songname; 
});

makerestplays=()=>{
    playpause.forEach(element=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

playpause.forEach(element => {
    element.addEventListener('click',(e)=>{

        if(index===e.target.id && !(AudioElement.paused) || Number(e.target.id)===globalindex && !(AudioElement.paused) || e.target.id===indfinal && !(AudioElement.paused))
        {
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            AudioElement.pause();
            playelement.classList.remove('fa-pause-circle');
            playelement.classList.add('fa-play-circle');
            gif.style.opacity=0;
            index=e.target.id;
        }
        else if(index===e.target.id && AudioElement.paused)
        {
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            AudioElement.play();
            playelement.classList.remove('fa-play-circle');
            playelement.classList.add('fa-pause-circle');
            gif.style.opacity=1;
        }
        else {
        makerestplays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        index=e.target.id;
        globalindex=index;
        AudioElement.src=`songs/${index}.mp3`;
        AudioElement.play();
        Msongname.innerText= songList[index-1].songname;
        playelement.classList.remove('fa-play-circle');
        playelement.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        }
    })
});

playprevious.addEventListener('click',()=>{
    if(globalindex<2)
    globalindex=10;
    else
    globalindex--;
    AudioElement.src=`songs/${globalindex}.mp3`;
    AudioElement.play();
    Msongname.innerText= songList[globalindex-1].songname;
    playelement.classList.remove('fa-play-circle');
    playelement.classList.add('fa-pause-circle');
    gif.style.opacity=1;
    playpause.forEach((element) => {
        if(parseInt(element.id)===globalindex+1 || globalindex===10){
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        }  
        if(parseInt(element.id)===globalindex)
        {
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
        }
    });


})
playnext.addEventListener('click',()=>{
    if(globalindex>9)
    globalindex=1;
    else
    globalindex++;
    AudioElement.src=`songs/${globalindex}.mp3`;
    AudioElement.play();
    Msongname.innerText= songList[globalindex-1].songname;
    playelement.classList.remove('fa-play-circle');
    playelement.classList.add('fa-pause-circle');
    gif.style.opacity=1;
    playpause.forEach((element) => {
        if(parseInt(element.id)===globalindex-1 || globalindex===1){
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        }  
        if(parseInt(element.id)===globalindex)
        {
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
        }
    });
})

playelement.addEventListener('click',()=>{
    if(AudioElement.paused){
        playelement.classList.remove('fa-play-circle');
        playelement.classList.add('fa-pause-circle');
        AudioElement.play();
        let source=AudioElement.src;
        playpause.forEach((element) => {
            let ind=element.id;
            console.log(ind);
            if(`http://127.0.0.1:5500/web%20dev/Spotifyclone/songs/${ind}.mp3`===source)
            {
                element.classList.remove('fa-play-circle');
                element.classList.add('fa-pause-circle');
            }
        });
        gif.style.opacity=1;
    }
    else{
        let source=AudioElement.src;
        playpause.forEach((element) => {
            let ind=element.id;
            if(`http://127.0.0.1:5500/web%20dev/Spotifyclone/songs/${ind}.mp3`===source)
            {
                element.classList.remove('fa-pause-circle');
                element.classList.add('fa-play-circle');
            }
        });
        gif.style.opacity=0;
        playelement.classList.remove('fa-pause-circle');
        playelement.classList.add('fa-play-circle');
        AudioElement.pause();
        timepause();
    }
})
AudioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((AudioElement.currentTime/AudioElement.duration)*100);
    progressbar.value=progress;
    if(AudioElement.currentTime===AudioElement.duration){
        gif.style.opacity=1;
        globalindex++;
        AudioElement.src=`songs/${globalindex}.mp3`;
        AudioElement.play();
        makerestplays();
        let source=AudioElement.src;
        playpause.forEach((element) => {
              let ind=element.id;
            if(`http://127.0.0.1:5500/web%20dev/Spotifyclone/songs/${ind}.mp3`===source)
            {
                element.classList.remove('fa-play-circle');
                element.classList.add('fa-pause-circle');
                indfinal=ind;
            }
        });
        Msongname.innerText=songList[globalindex-1].songname;
    }
})
progressbar.addEventListener('change',()=>{
    AudioElement.currentTime=(progressbar.value*AudioElement.duration)/100;
})

