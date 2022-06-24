// db 데이터 가져오기
const dbValue = document.getElementById("db-value").value;
const dbArray = dbValue.split(",");
const testContainer = document.querySelector(".test");


const locationMap = document.getElementById("location-map");
const locationBtn = document.querySelectorAll(".course");
const movie = document.getElementById("movie");
const durebak = document.getElementById("durebak");
const ggomak = document.getElementById("ggomak");
const observatory = document.getElementById("observatory");
const road = document.getElementById("road");
const tunnel = document.getElementById("tunnel");
const myPosition = document.getElementById("my-position");


function changeBtnCss(target) {
  for (let i = 0; i < locationBtn.length; i++) {
    if (target === i) {
      locationBtn[i].classList.add("pick-on");
    } else {
      locationBtn[i].classList.remove("pick-on");
    }
  }
}


function chekcingDone() {
  const dbArray = dbValue.split(",");
  for (let i = 0; i < dbArray.length; i++) {
    if (dbArray[i] === "MOVIE") {
      const movieMark = document.querySelector(".movie-mark");
      movieMark.classList.remove("hidden");
    } else if (dbArray[i] === "DUREBAK") {
      const durebakMark = document.querySelector(".durebak-mark");
      durebakMark.classList.remove("hidden");
    } else if (dbArray[i] === "GGOMAK") {
      const ggomakMark = document.querySelector(".ggomak-mark");
      ggomakMark.classList.remove("hidden");
    } else if (dbArray[i] === "OBSERVATORY") {
      const observatoryMark = document.querySelector(".observatory-mark");
      observatoryMark.classList.remove("hidden");
    } else if (dbArray[i] === "ROAD") {
      const roadMark = document.querySelector(".road-mark");
      roadMark.classList.remove("hidden");
    } else if (dbArray[i] === "TUNNEL") {
      const tunnelMark = document.querySelector(".tunnel-mark");
      tunnelMark.classList.remove("hidden");
    } 
  }
}
chekcingDone();

 
