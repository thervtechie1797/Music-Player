const musicData = {
  All: [
    {
      name: "Bohemian Rhapsody",
      artist: "Queen",
      image:
        "https://c.saavncdn.com/847/Bohemian-Rhapsody-The-Original-Soundtrack--English-2018-20181018232812-500x500.jpg",
      genre: "Rock",
      audio: "audio/sample-15s.mp3",
    },
    {
      name: "Hotel California",
      artist: "Eagles",
      image: "https://i.scdn.co/image/ab67616d0000b27301695cb519c93bd47b31299b",
      genre: "Rock",
      audio: "audio/sample-15s.mp3",
    },
    {
      name: "Sweet Child O' Mine",
      artist: "Guns N' Roses",
      image:
        "https://m.media-amazon.com/images/M/MV5BZDdlYTI1NzUtZGFiYi00YzY3LTlkNDYtYTljZDg3YTMwNGFjXkEyXkFqcGc@._V1_.jpg",
      genre: "Rock",
      audio: "audio/sample-15s.mp3",
    },
    {
      name: "Blinding Lights",
      artist: "The Weeknd",
      image:
        "https://i1.sndcdn.com/artworks-Eke4dWZTIrXCkXPW-hX2ihg-t500x500.jpg",
      genre: "Pop",
      audio: "audio/sample-15s.mp3",
    },
    {
      name: "Levitating",
      artist: "Dua Lipa",
      image:
        "https://improxy.smpopular.com/tools/im/560/production/uploading/recordings/7036874439035061/cover_image.png?ts=1727008949",
      genre: "Pop",
      audio: "audio/sample-15s.mp3",
    },
    {
      name: "Peaches",
      artist: "Justin Bieber",
      image:
        "https://upload.wikimedia.org/wikipedia/en/f/fd/Peaches_single.jpg",
      genre: "Pop",
      audio: "audio/sample-15s.mp3",
    },
    {
      name: "Take Five",
      artist: "Dave Brubeck",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDsFXNYwGFweUvbqjbVsxkVx93Cnc7_vaFKg&s",
      genre: "Jazz",
      audio: "audio/sample-15s.mp3",
    },
    {
      name: "So What",
      artist: "Miles Davis",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlmw4ab2GElPIOlrUA1DT69hFzy_7Z18bc0Q&s",
      genre: "Jazz",
      audio: "audio/sample-15s.mp3",
    },
    {
      name: "Blue in Green",
      artist: "Miles Davis",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZN6A3qnT4UngtLV5UBJRjxqOvNHT_AyO1Cg&s",
      genre: "Jazz",
      audio: "audio/sample-15s.mp3",
    },
  ],
};

const genreSelection = document.getElementById("genreSelection");
const songList = document.getElementById("songList");
const songImage = document.getElementById("songImage");
const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");
const audioSrc = document.getElementById("audioSrc");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const songCard = document.getElementById("songCard");
const playlistNameInput = document.getElementById("addPlaylist");
const createPlayListBtn = document.getElementById("createPlaylist");
const playlistItems = document.getElementById("playlistItems");
const currentPlaylistSongs = document.getElementById("currentPlaylistSongs");
const addToPlaylistBtn = document.getElementById("addToPlaylistBtn");
const playBtn = document.getElementById("playBtn");
const themeBtn = document.getElementById("themeBtn");

let currentIndex = 0;
let currentList = [];
const playlists = [];
let currentPlaylist = null;

const genres = ["All", ...new Set(musicData.All.map((song) => song.genre))];

genres.forEach((genre) => {
  const option = document.createElement("option");
  option.value = genre;
  option.textContent = genre;
  genreSelection.appendChild(option);
});

function showSongs(genre) {
  songList.innerHTML = "";

  currentList =
    genre === "All"
      ? musicData.All
      : musicData.All.filter((song) => song.genre === genre);

  currentList.forEach((song, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("song-items");

    const songLink = document.createElement("a");
    songLink.href = "#";
    songLink.textContent = song.name;
    songLink.classList.add("song-item-link");

    songLink.addEventListener("click", (event) => {
      event.preventDefault();
      renderCurrentSong(song, index, currentList);
    });

    listItem.appendChild(songLink);
    songList.appendChild(listItem);
  });

  if (currentList.length > 0) {
    renderCurrentSong(currentList[0], 0, currentList);
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  themeBtn.textContent = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
}

function renderCurrentSong(song, index, list) {
  currentIndex = index;
  currentList = list;

  songImage.src = song.image;
  songTitle.textContent = song.name;
  artistName.textContent = song.artist;
  audioSrc.src = song.audio;
}

function playAudio() {
  audioSrc.play();
  playBtn.textContent = "⏯️";
}

function pauseAudio() {
  audioSrc.pause();
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
  if (audioSrc.paused) {
    playAudio();
  } else {
    pauseAudio();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentList.length > 0) {
    currentIndex = (currentIndex + 1) % currentList.length;
    renderCurrentSong(currentList[currentIndex], currentIndex, currentList);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentList.length > 0) {
    currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
    renderCurrentSong(currentList[currentIndex], currentIndex, currentList);
  }
});

genreSelection.addEventListener("change", () => {
  const selectedGenre = genreSelection.value;
  showSongs(selectedGenre);
});

function createPlaylist() {
  const playlistName = playlistNameInput.value.trim();
  if (playlistName) {
    const newPlaylist = {
      name: playlistName,
      songs: [],
    };

    playlists.push(newPlaylist);
    currentPlaylist = newPlaylist;
    playlistNameInput.value = "";
    displayPlaylistsList();
    renderPlaylistSong();
  }
}

function addtoPlaylist() {
  if (currentPlaylist && currentList.length > 0) {
    const currentSong = currentList[currentIndex];
    if (
      !currentPlaylist.songs.some(
        (song) =>
          song.name === currentSong.name && song.artist === currentSong.artist
      )
    ) {
      currentPlaylist.songs.push(currentSong);
      renderPlaylistSong();
    }
  }
}

function displayPlaylistsList() {
  playlistItems.innerHTML = "";

  playlists.forEach((playlist, index) => {
    const playlistLink = document.createElement("li");
    playlistLink.classList.add("playlistLink");
    playlistLink.textContent = playlist.name;
    playlistLink.addEventListener("click", () => {
      currentPlaylist = playlist;
      renderPlaylistSong();
    });
    playlistItems.appendChild(playlistLink);
  });
}

function displayPlayListSongs() {
  currentPlaylistSongs.innerHTML = "";
  if (currentPlaylist && currentPlaylist.songs.length > 0) {
    currentPlaylist.songs.forEach((song) => {
      const songItem = document.createElement("li");
      songItem.classList.add("songItemLink");
      songItem.textContent = `${song.name} - ${song.artist}`;
      currentPlaylistSongs.appendChild(songItem);
    });
  }
}

createPlayListBtn.addEventListener("click", createPlaylist);
addToPlaylistBtn.addEventListener("click", addtoPlaylist);
themeBtn.addEventListener("click", toggleTheme);

genreSelection.value = "All";
showSongs("All");
displayPlaylistsList();
renderPlaylistSong();
