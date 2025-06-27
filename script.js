console.log("Welcome to Let's Play a dhun");

let progress;
let songIndex = 0;
let audioElement = new Audio();
let goPlay = document.getElementById('goPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let currentSongName = document.getElementById('currentSongName');

let arijitSongs = [
	{songName: "Tum hi ho", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", duration: "4:22"},
	{songName: "Apna bna le", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", duration: "4:12"},
	{songName: "Heeriye meri sunn jara", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", duration: "4:10"},
	{songName: "Salaamat", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", duration: "4:15"},
	{songName: "Agar tum sath ho", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", duration: "4:18"},
	{songName: "Uska hi banana", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", duration: "4:20"},
	{songName: "Sajni", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", duration: "4:25"},
	{songName: "Zaalima", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", duration: "4:30"},
	{songName: "Lambiyaan si judaiyaan", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", duration: "4:35"},
	{songName: "Saware", filePath: "songs/10.mp3", coverPath: "covers/10.jpg", duration: "4:40"},
	{songName: "Kabhi jo badal barse", filePath: "songs/11.mp3", coverPath: "covers/11.jpg", duration: "4:45"},
	{songName: "Raat Bhar", filePath: "songs/12.mp3", coverPath: "covers/12.jpg", duration: "4:50"},
	{songName: "Saanson ko", filePath: "songs/13.mp3", coverPath: "covers/13.jpg", duration: "4:55"},
]

let pritamSongs = [
	{songName: "Dil ibaadat", filePath: "songs/pritam1.mp3", coverPath: "covers/pritam1.jpg", duration: "4:00"},
	{songName: "Gerua", filePath: "songs/pritam2.mp3", coverPath: "covers/pritam2.jpg", duration: "4:05"},
	{songName: "Labon ko", filePath: "songs/pritam3.mp3", coverPath: "covers/pritam3.jpg", duration: "4:10"},
	{songName: "Lutt Putt Gaya", filePath: "songs/pritam4.mp3", coverPath: "covers/pritam4.jpg", duration: "4:15"},
	{songName: "Pee Loon", filePath: "songs/pritam5.mp3", coverPath: "covers/pritam5.jpg", duration: "4:20"},
	{songName: "Sajde", filePath: "songs/pritam6.mp3", coverPath: "covers/pritam6.jpg", duration: "4:25"},
	{songName: "Sang hoo tere", filePath: "songs/pritam7.mp3", coverPath: "covers/pritam7.jpg", duration: "4:30"},
	{songName: "Tere Hawaale", filePath: "songs/pritam8.mp3", coverPath: "covers/pritam8.jpg", duration: "4:35"},
	{songName: "Tu Hi Haqeeqat", filePath: "songs/pritam9.mp3", coverPath: "covers/pritam9.jpg", duration: "4:40"},
	{songName: "Tu Hi Toh Hai", filePath: "songs/pritam10.mp3", coverPath: "covers/pritam10.jpg", duration: "4:45"},
	{songName: "Tukur Tukur", filePath: "songs/pritam11.mp3", coverPath: "covers/pritam11.jpg", duration: "4:50"},
	{songName: "Tum Mile", filePath: "songs/pritam12.mp3", coverPath: "covers/pritam12.jpg", duration: "4:55"},
	{songName: "Zara Sa", filePath: "songs/pritam13.mp3", coverPath: "covers/pritam13.jpg", duration: "5:00"},
]

let currentList = arijitSongs;

let containers = document.querySelectorAll('.songItemContainer');
containers.forEach((container, idx) => {
    let items = container.querySelectorAll('.songItem');
    let songList = (idx === 0) ? arijitSongs : pritamSongs; // etc.
    items.forEach((element, i) => {
        if(songList[i]) {
            element.getElementsByTagName('img')[0].src = songList[i].coverPath;
            element.getElementsByClassName('songName')[0].innerText = songList[i].songName;
            //update duration
            let timestampSpan = element.querySelector('.timestamp');
            if (timestampSpan) {
                timestampSpan.childNodes[0].nodeValue = songList[i].duration;
            }
        }
    });
});

// songItems.forEach((element, i) => {
// 	if (songs[i]) {
// 		element.getElementsByTagName('img')[0].src = songs[i].coverPath;
// 		element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
// 	}
// });

//Handle play/pause click
goPlay.addEventListener('click', () => {
	if(audioElement.paused || audioElement.currentTime <= 0) {
		audioElement.play();
		goPlay.classList.remove('fa-play-circle');
		goPlay.classList.add('fa-pause-circle');
		gif.style.opacity = 1;
		currentSongName.innerText = currentList[songIndex].songName; // Update current song name

        // Add revolve to current cover
        let containers = document.querySelectorAll('.songItemContainer');
        containers.forEach((container, idx) => {
            let items = container.querySelectorAll('.songItem');
            if(idx === (currentList === arijitSongs ? 0 : 1)) {
                let coverImg = items[songIndex].querySelector('.cover');
                if(coverImg) coverImg.classList.add('revolve');
            }
        });
	} else {
		audioElement.pause();
		goPlay.classList.add('fa-play-circle');
		goPlay.classList.remove('fa-pause-circle');
		gif.style.opacity = 0;
        document.querySelectorAll('.songItem').forEach(img => img.classList.remove('revolve'));
	}

	makeAllPlays();
    if (!audioElement.paused) {
        // Set current song's play icon to pause
        let currentPlayBtn = document.getElementsByClassName('songItemplay')[songIndex];
        if(currentPlayBtn){
            currentPlayBtn.classList.remove('fa-play-circle');
            currentPlayBtn.classList.add('fa-pause-circle');
        }
    }
})


function setActiveSongItem(containerIdx, songIdx) {
    // Remove active from all songItems
    document.querySelectorAll('.songItem').forEach(item => item.classList.remove('active'));
    // Add active to current playing songItem
    let containers = document.querySelectorAll('.songItemContainer');
    let items = containers[containerIdx].querySelectorAll('.songItem');
    if(items[songIdx]) items[songIdx].classList.add('active');
}




//Listen to events
audioElement.addEventListener('timeupdate', () => {
    
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
	progressBar.value = progress;
});

progressBar.addEventListener('change', () => {
	audioElement.currentTime = progressBar.value * audioElement.duration/100;
});

function makeAllPlays() {
	Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
	});
}

Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        // Find which container and index
        let songDiv = e.target.closest('.songItem');
        let containerDiv = e.target.closest('.songItemContainer');
        let containerIdx = Array.from(document.querySelectorAll('.songItemContainer')).indexOf(containerDiv);
        let songIdx = Array.from(containerDiv.querySelectorAll('.songItem')).indexOf(songDiv);

        let songList = (containerIdx === 0) ? arijitSongs : pritamSongs;
        currentList = songList;
        songIndex = songIdx; // Track current song
		
		audioElement.src = songList[songIdx].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        setActiveSongItem(containerIdx, songIdx);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        goPlay.classList.remove('fa-play-circle');
        goPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        currentSongName.innerText = songList[songIdx].songName;

        setRevolveOnCurrentCover(containerIdx, songIdx);
    });
});

document.getElementById('next').addEventListener('click', () => { 
    // if(songIndex>=13) {
    //     songIndex = 0;
    // } else {
    //     songIndex += 1;
    // }
	songIndex = (songIndex+1) % currentList.length;
    let containerIdx = (currentList === arijitSongs) ? 0 : 1;
    resetAllTimestamps();
    resetSongTimestamp(containerIdx, songIndex);
    audioElement.src = currentList[songIndex].filePath;
	audioElement.currentTime = 0;
    goPlay.classList.remove('fa-play-circle'); // Update bottom button icon
    goPlay.classList.add('fa-pause-circle');
	audioElement.play();
	currentSongName.innerText = currentList[songIndex].songName;
    
	gif.style.opacity = 1;

    setActiveSongItem(containerIdx, songIndex);
    setRevolveOnCurrentCover(containerIdx, songIndex);

    // Play icon ko pause icon banao
    // makeAllPlays();
    // let containers = document.querySelectorAll('.songItemContainer');
    // let items = containers[containerIdx].querySelectorAll('.songItem');
    // let playBtn = items[songIndex].querySelector('.songItemplay');
    // if(playBtn){
    //     makeAllPlays();
    //     playBtn.classList.remove('fa-play-circle');
    //     playBtn.classList.add('fa-pause-circle');
    // }
    
});

document.getElementById('previous').addEventListener('click', () => { 
    // if(songIndex<=0) {
    //     songIndex = 0;
    // } else {
    //     songIndex -= 1;
    // }
    songIndex = (songIndex - 1 + currentList.length) % currentList.length;
    audioElement.src = currentList[songIndex].filePath;
    audioElement.currentTime = 0;
    resetAllTimestamps();
    resetSongTimestamp(containerIdx, songIndex);
    audioElement.play();
    currentSongName.innerText = currentList[songIndex].songName;
    goPlay.classList.remove('fa-play-circle');
    goPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

    let containerIdx = (currentList === arijitSongs) ? 0 : 1;
    setActiveSongItem(containerIdx, songIndex);
    setRevolveOnCurrentCover(containerIdx, songIndex);

    // Play icon ko pause icon banao
    let containers = document.querySelectorAll('.songItemContainer');
    let items = containers[containerIdx].querySelectorAll('.songItem');
    let playBtn = items[songIndex].querySelector('.songItemplay');
    if(playBtn){
        makeAllPlays();
        playBtn.classList.remove('fa-play-circle');
        playBtn.classList.add('fa-pause-circle');
    }
})

audioElement.addEventListener('ended', () => {
    goPlay.classList.add('fa-play-circle');
    goPlay.classList.remove('fa-pause-circle');
    gif.style.opacity = 0;
    document.querySelectorAll('.songItem').forEach(item => item.classList.remove('active'));
});


function setRevolveOnCurrentCover(containerIdx, songIdx) {
    // Remove revolve from all covers
    document.querySelectorAll('.cover').forEach(img => img.classList.remove('revolve'));
    // Add revolve to current playing cover
    let containers = document.querySelectorAll('.songItemContainer');
    let items = containers[containerIdx].querySelectorAll('.songItem');
    let coverImg = items[songIdx].querySelector('.cover');
    if(coverImg) coverImg.classList.add('revolve');
}

function formatTime(sec) {
    let min = Math.floor(sec / 60);
    let s = Math.floor(sec % 60);
    return `${min.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

audioElement.addEventListener('timeupdate', () => {
    let containerIdx = (currentList === arijitSongs) ? 0 : 1;
    let containers = document.querySelectorAll('.songItemContainer');
    let items = containers[containerIdx].querySelectorAll('.songItem');
    let currentItem = items[songIndex];
    let timestampSpan = currentItem.querySelector('.timestamp');
    if (timestampSpan) {
        let total = currentList[songIndex].duration; // "mm:ss"
        let totalSec = parseInt(total.split(':')[0]) * 60 + parseInt(total.split(':')[1]);
        let current = formatTime(audioElement.currentTime);
        let totalFormatted = formatTime(totalSec);
        timestampSpan.childNodes[0].nodeValue = `${current} / ${totalFormatted}`;
    }
});

function resetSongTimestamp(containerIdx, songIdx) {
    let containers = document.querySelectorAll('.songItemContainer');
    let items = containers[containerIdx].querySelectorAll('.songItem');
    let currentItem = items[songIdx];
    let timestampSpan = currentItem.querySelector('.timestamp');
    if (timestampSpan) {
        let total = currentList[songIdx].duration;
        timestampSpan.childNodes[0].nodeValue = `00:00 / ${total}`;
    }
}

// // Call this function whenever a new song starts (in your play handler)
// resetSongTimestamp(containerIdx, songIndex);

function resetAllTimestamps() {
    let containers = document.querySelectorAll('.songItemContainer');
    containers.forEach((container, idx) => {
        let items = container.querySelectorAll('.songItem');
        let songList = (idx === 0) ? arijitSongs : pritamSongs;
        items.forEach((element, i) => {
            let timestampSpan = element.querySelector('.timestamp');
            if (timestampSpan && songList[i]) {
                timestampSpan.childNodes[0].nodeValue = songList[i].duration;
            }
        });
    });
}

// resetSongTimestamp(containerIdx, songIndex);