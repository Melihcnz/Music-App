const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'The Charmer\'s Call',
        cover: 'assets/1.jpg',
        artist: 'Hanu Dixit',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'You Will Never See Me Coming',
        cover: 'assets/2.jpg',
        artist: 'NEFFEX',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Intellect',
        cover: 'assets/3.jpg',
        artist: 'Yung Logos',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'Die With A Smile',
        cover: 'assets/4.jpg',
        artist: 'Lady Gaga, Bruno Mars',
    },
    {
        path: 'assets/5.mp3',
        displayName: 'Neden Anlamadın Beni?',
        cover: 'assets/5.jpg',
        artist: 'Reynmen',
    },
    {
        path: 'assets/6.mp3',
        displayName: 'Tek Başıma',
        cover: 'assets/6.jpg',
        artist: 'Kadir Baba 55 ',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

// Yeni şarkı listesi butonunu seçiyoruz
const songListBtn = document.getElementById('song-list-btn');

// Şarkı listesi gösterme/gizleme fonksiyonu
function toggleSongList() {
    const songListContainer = document.createElement('div');
    songListContainer.id = 'song-list-container';
    songListContainer.style.position = 'absolute';
    songListContainer.style.top = '60px';
    songListContainer.style.right = '10px';
    songListContainer.style.backgroundColor = '#fff';
    songListContainer.style.border = '1px solid #ddd';
    songListContainer.style.borderRadius = '5px';
    songListContainer.style.boxShadow = '0 30px 30px rgba(246, 131, 112, 0.6)';
    songListContainer.style.width = '300px';
    songListContainer.style.maxHeight = '400px';
    songListContainer.style.overflowY = 'auto';
    songListContainer.style.zIndex = '1000';
    songListContainer.style.backdropFilter = 'blur(20px)';
    songListContainer.style.backgroundColor = 'rgba(155, 35, 78, 0.8)'; // Arka planın biraz saydam olması gerekir.

    
    
    // Şarkı listesi dolum
    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.padding = '10px';
    ul.style.margin = '0';
    
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.displayName;
        li.style.padding = '10px';
        li.style.borderBottom = '1px solid #ddd';
        li.style.cursor = 'pointer';
        
        li.addEventListener('click', () => {
            loadMusic(song);
            playMusic();
            document.body.removeChild(songListContainer);
        });
        
        ul.appendChild(li);
    });
    
    songListContainer.appendChild(ul);
    document.body.appendChild(songListContainer);
}

// Buton tıklandığında listeyi göster


songListBtn.addEventListener('click', toggleSongList);
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);