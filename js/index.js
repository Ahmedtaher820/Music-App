const music = new Audio("js/songs/omry-ebtada.mp3");
// create songs array
const songs = [
  {
    id: "omry-ebtada",
    songName: "Omry Ebtada",
    singer: "Tamer Hosney",
    poster: "assets/5lek-foulazi-tamer.jpg",
    class: "active",
  },
  {
    id: "Esht_Maak_Hekayat",
    songName: "Esht_Maak_Hekayat",
    singer: "Tamer Ashour",
    poster: "assets/heya-elnas.jpeg",
  },
  {
    id: "el7obkolo",
    songName: "Esial Ro7k",
    singer: "Om Kalthoum",
    poster: "assets/ro7k-om.jpg",
  },
  {
    id: "Alarab_Amr-Diab_Leila_Ya-Albaha",
    songName: "Leila Ya Albaha",
    singer: "Amr Diab",
    poster: "assets/ellela-amr.jpg",
  },
  {
    id: "Wegz.Aqwa.Mix",
    songName: "Wegz Aqwa Mix",
    singer: "Meky-Wegz",
    poster: "assets/meky-wegz.webp",
  },
  {
    id: "HamakiMaBalash",
    songName: "Ma Balash",
    singer: "Mohamed Hamaki",
    poster: "assets/kol-youm.jpg",
  },
  {
    id: "Kelmetayan",
    songName: "Kelmetayan",
    singer: "Ehab Twfik",
    poster: "assets/artists/ehabtwfik.jfif",
  },
];
const playList = document.querySelectorAll(".playList");
function removeClasses() {
  playList.forEach((element) => {
    element.classList.add("bi-play-circle-fill");
    element.classList.remove("bi-pause-circle-fill");
  });
}
function setbackgrounditem() {
  document.querySelectorAll(".song-lists li").forEach((e) => {
    e.style.backgroundColor = "transparent";
  });
}
// window.addEventListener("load",()=>{
//     music.src = "js/songs/el7obkolo.mp3"
//     music.play()
// })
let playPuaseIcon = document.querySelector(".bi-play-fill");
let wave = document.querySelectorAll(".wave-1");
console.log(wave);
playPuaseIcon.addEventListener("click", () => {
  // check if this music is ended or paused
  if (music.paused || music.currentTime <= 0) {
    // play musicc
    music.play();
    // remove play icon to pause icon
    playPuaseIcon.classList.remove("bi-play-fill");
    playPuaseIcon.classList.add("bi-pause");
    // remove play icon to pause icon ==> when click on the play icon on the bottom box of screen
    const currentSong = songs.find((e) => e.class == "active");
    document
      .querySelector(`#${currentSong.id}`)
      .classList.add("bi-pause-circle-fill");
    document
      .querySelector(`#${currentSong.id}`)
      .classList.remove("bi-play-circle-fill");
    // to make wave sound work when music play
    wave.forEach((e) => {
      e.classList.add("active");
    });
  } else {
    // check if this music is ended or paused

    music.pause();
    // remove play icon to pause icon

    playPuaseIcon.classList.remove("bi-pause");
    playPuaseIcon.classList.add("bi-play-fill");
    // remove pause icon to play icon ==> when click on the play icon on the bottom box of screen

    const currentSong = songs.find((e) => e.class == "active");
    console.log(document.querySelectorAll(`#${currentSong.id}`));
    document
      .querySelector(`#${currentSong.id}`)
      .classList.remove("bi-pause-circle-fill");
    document
      .querySelector(`#${currentSong.id}`)
      .classList.add("bi-play-circle-fill");
    wave.forEach((e) => {
      e.classList.remove("active");
    });
  }
});
// loop in all songs in list to remove pause icon and add play icon

// to play music in playlists
const currentSingername = document.querySelector(".singer");
const currentSongName = document.querySelector(".song-name");
const currentSongimage = document.querySelector(".bottom-box-img");
// to set default value to volume bar
let volBar = document.querySelector(".vol-2");
let volDots = document.querySelector(".v-dots");
window.addEventListener("load",()=>{
    volBar.style.width = `${music.volume * 100}%`;
    volDots.style.left = `${music.volume * 100}%`;
})
let index = 0;
playList.forEach((e,indexPlaylist) => {
  e.addEventListener("click", (ele) => {
    if (e.classList.contains("bi-pause-circle-fill")) {
      e.classList.add("bi-play-circle-fill");
      e.classList.remove("bi-pause-circle-fill");
      playPuaseIcon.classList.remove("bi-play-fill");
      playPuaseIcon.classList.add("bi-pause");
      wave.forEach((e) => {
        e.classList.remove("active");
      });
      removeClasses();
      setbackgrounditem();
      music.pause();
      return;
    }
    flag = indexPlaylist
    // id have the same name of song
    volBar.style.width = `${music.volume * 100}%`;
    volDots.style.left = `${music.volume * 100}%`;
    index = e.getAttribute("id");
    removeClasses();
    e.classList.remove("bi-play-circle-fill");
    e.classList.add("bi-pause-circle-fill");
    music.src = `js/songs/${index}.mp3`;
    // to match song data to display song inforamtion
    const songData = songs.find((e) => e.id == index);
    currentSingername.textContent = songData.singer;
    currentSongName.textContent = songData.songName;
    currentSongimage.src = songData.poster;
    // delete active class form object
    // and class property added to handle the currsent song playing
    songs.map((e) => {
      return (e.class = "");
    });
    // add class activbe ==> this mean this song is playing now

    songData.class = "active";
    music.play();
    playPuaseIcon.classList.remove("bi-play-fill");
    playPuaseIcon.classList.add("bi-pause");
    // make wave sound work
    wave.forEach((e) => {
      e.classList.add("active");
    });
    // add event ended is work after soung end ==> to stop wave and remove pause icon and add play icon
    music.addEventListener("ended", () => {
      playPuaseIcon.classList.remove("bi-pause");
      playPuaseIcon.classList.add("bi-play-fill");
      wave.forEach((e) => {
        e.classList.remove("active");
      });
    });
    setbackgrounditem();
    document.getElementById(
      `${index}`
    ).parentElement.parentElement.parentElement.style.backgroundColor =
      "#0b1320";
  });
});
let currentStart = document.querySelector(".current-start");
let currentEnd = document.querySelector(".current-end");
let seek = document.getElementById("seek");
let bar = document.querySelector(".bar-2");
let dot = document.querySelector(".dots");
music.addEventListener("timeupdate", () => {
  let music_Curr = music.currentTime;
  let music_Dur = music.duration;
  // Current time in music
  let min1 = Math.floor(music_Curr / 60);
  let sec1 =
    Math.floor(music_Curr % 60) < 10
      ? `0${Math.floor(music_Curr % 60)}`
      : `${Math.floor(music_Curr % 60)}`;
  currentStart.textContent = `${min1}:${sec1}`;
  // music time
  let min2 = Math.floor(music_Dur / 60);
  let sec2 =
    Math.floor(music_Dur % 60) < 10
      ? `0${Math.floor(music_Dur % 60)}`
      : `${Math.floor(music_Dur % 60)}`;
  currentEnd.textContent = `${min2}:${sec2}`;
  let progressBar = parseInt((music.currentTime / music.duration) * 100);
  seek.value = progressBar;
  bar.style.width = `${seek.value}%`;
  dot.style.left = `${seek.value}%`;
});
music.addEventListener("ended", () => {
  playPuaseIcon.classList.remove("bi-pause");
  playPuaseIcon.classList.add("bi-play-fill");
  wave.forEach((e) => {
    e.classList.remove("active");
  });
});
seek.addEventListener("change", () => {
  music.currentTime = (seek.value * music.duration) / 100;
});
// volume setting
let vol = document.getElementById("vol");
let volIcon = document.getElementById("vol-icon");

vol.addEventListener("change", () => {
  console.log(vol.value);

  if (vol.value == 0) {
    volIcon.classList.remove("bi-volume-down-fill");
    volIcon.classList.add("bi-volume-mute-fill");
    volIcon.classList.remove("bi-volume-up-fill");
  }
  if (vol.value > 0) {
    volIcon.classList.add("bi-volume-down-fill");
    volIcon.classList.remove("bi-volume-mute-fill");
    volIcon.classList.remove("bi-volume-up-fill");
  }
  if (vol.value > 50) {
    volIcon.classList.remove("bi-volume-down-fill");
    volIcon.classList.remove("bi-volume-mute-fill");
    volIcon.classList.add("bi-volume-up-fill");
  }
  volBar.style.width = `${vol.value}%`;
  volDots.style.left = `${vol.value}%`;
  console.log(music.volume);
  music.volume = vol.value / 100;
});
// search input
let search = document.getElementById("search");
let ulSearch = document.createElement("ul");
search.addEventListener("keyup",()=>{
    if(search.value == 0){
        ulSearch.remove()
    }
})
function searchSong() {
  ulSearch.innerHTML = "";
  console.log("done")
  if (search.value.length == 0) {
    ulSearch.remove();
    return
  }
  const songSearch = songs.filter((songNameSearch) => {
    return songNameSearch.songName.match(search.value) ;
  });
  for (let i of songSearch) {
    let liSearch = document.createElement("li");
    let paragraphSearchSongName = document.createElement("p");
    let spanSearchSinger = document.createElement("span");
    paragraphSearchSongName.textContent = i.songName;
    liSearch.setAttribute("id", i.id);
    spanSearchSinger.textContent = i.singer;
    liSearch.appendChild(paragraphSearchSongName);
    liSearch.appendChild(spanSearchSinger);
    ulSearch.appendChild(liSearch);
    ulSearch.classList.add("search-list")
    document.querySelector(".search-box").appendChild(ulSearch);
  }
  document.querySelectorAll(".search-list li").forEach((e) => {
    e.addEventListener("click", () => {
      music.src = `js/songs/${e.id}.mp3`;
    });
  });
}

let songBack = document.querySelector(".bi-skip-start-fill");
let songNext = document.querySelector(".bi-skip-end-fill");
let flag = 0;
songBack.onclick = () => {
  flag -= 1;
  if (flag == 0) {
    flag = 0;
  } else if (flag < 1) {
    console.log("go");
    flag = document.querySelectorAll(".song-box").length - 1;
  }
  removeClasses();
  document
    .getElementsByClassName("song-box")
    [flag].lastElementChild.firstElementChild.classList.remove(
      "bi-play-circle-fill"
    );
  document
    .getElementsByClassName("song-box")
    [flag].lastElementChild.firstElementChild.classList.add(
      "bi-pause-circle-fill"
    );
  music.src = `js/songs/${songs[flag].id}.mp3`;
  // to match song data to display song inforamtion
  const songData = songs.find((e, index) => flag == index);
  currentSingername.textContent = songData.singer;
  currentSongName.textContent = songData.songName;
  currentSongimage.src = songData.poster;
  // delete active class form object
  // and class property added to handle the currsent song playing
  songs.map((e) => {
    return (e.class = "");
  });
  // add class activbe ==> this mean this song is playing now

  songData.class = "active";
  music.play();
  playPuaseIcon.classList.remove("bi-play-fill");
  playPuaseIcon.classList.add("bi-pause");
  // make wave sound work
  wave.forEach((e) => {
    e.classList.add("active");
  });
  setbackgrounditem();
  document.getElementById(
    `${songData.id}`
  ).parentElement.parentElement.parentElement.style.backgroundColor = "#0b1320";
};
// next song
songNext.onclick = () => {
  flag += 1;
  if (flag == document.querySelectorAll(".song-box").length) {
    flag = 0;
  }

  removeClasses();
  document
    .getElementsByClassName("song-box")
    [flag].lastElementChild.firstElementChild.classList.remove(
      "bi-play-circle-fill"
    );
  document
    .getElementsByClassName("song-box")
    [flag].lastElementChild.firstElementChild.classList.add(
      "bi-pause-circle-fill"
    );
  music.src = `js/songs/${songs[flag].id}.mp3`;
  // to match song data to display song inforamtion
  const songData = songs.find((e, index) => flag == index);
  currentSingername.textContent = songData.singer;
  currentSongName.textContent = songData.songName;
  currentSongimage.src = songData.poster;
  // delete active class form object
  // and class property added to handle the currsent song playing
  songs.map((e) => {
    return (e.class = "");
  });
  // add class activbe ==> this mean this song is playing now

  songData.class = "active";
  music.play();
  playPuaseIcon.classList.remove("bi-play-fill");
  playPuaseIcon.classList.add("bi-pause");
  // make wave sound work
  wave.forEach((e) => {
    e.classList.add("active");
  });
  setbackgrounditem();
  document.getElementById(
    `${songData.id}`
  ).parentElement.parentElement.parentElement.style.backgroundColor = "#0b1320";
};
// burger icon
let burger = document.querySelector(".burger");
let burgerIcon = document.querySelector(".burger i");
burger.onclick = () => {
  if (burgerIcon.classList.contains("bi-list")) {
    burgerIcon.classList.remove("bi-list");
    burgerIcon.classList.add("bi-x-circle");
    document.querySelector(".menu-side").classList.add("active");
  } else {
    burgerIcon.classList.add("bi-list");
    burgerIcon.classList.remove("bi-x-circle");
    document.querySelector(".menu-side").classList.remove("active");
  }
};
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    document.querySelector(".menu-side").classList.remove("active");
    burgerIcon.classList.add("bi-list");
    burgerIcon.classList.remove("bi-x-circle");
  }
});
// scroll popular song right and left
let scrollleft = document.querySelector(".bi-chevron-left");
let scrollRight = document.querySelector(".bi-chevron-right");
scrollleft.onclick = () => {
  document.querySelector(".popular-lists").scrollLeft -= 150;
};
scrollRight.onclick = () => {
  document.querySelector(".popular-lists").scrollLeft += 150;
};
