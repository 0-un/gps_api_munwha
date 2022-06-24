// db 데이터 가져오기
const dbValue = document.getElementById("db-value").value;
const dbArray = dbValue.split(",");
const testContainer = document.querySelector(".test");


const locationMap = document.getElementById("location-map");
const locationBtn = document.querySelectorAll(".course");
const eoseulleong = document.getElementById("eoseulleong");
const stair180 = document.getElementById("stair180");
const platform = document.getElementById("platform");
const drama = document.getElementById("drama");
const munwha = document.getElementById("munwha");
const cloudstair = document.getElementById("cloudstair");
const stair100 = document.getElementById("stair100");
const leejungseob = document.getElementById("leejungseob");
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
    if (dbArray[i] === "EOSEULLEONG") {
      const eoseulleongMark = document.querySelector(".eoseulleong-mark");
      eoseulleongMark.classList.remove("hidden");
    } else if (dbArray[i] === "STAIR180") {
      const stair180Mark = document.querySelector(".stair180-mark");
      stair180Mark.classList.remove("hidden");
    } else if (dbArray[i] === "PLATFORM") {
      const platformMark = document.querySelector(".platform-mark");
      platformMark.classList.remove("hidden");
    } else if (dbArray[i] === "DRAMA") {
      const dramaMark = document.querySelector(".drama-mark");
      dramaMark.classList.remove("hidden");
    } else if (dbArray[i] === "MUNWHA") {
      const munwhaMark = document.querySelector(".munwha-mark");
      munwhaMark.classList.remove("hidden");
    } else if (dbArray[i] === "CLOUDSTAIR") {
      const cloudstairMark = document.querySelector(".cloudstair-mark");
      cloudstairMark.classList.remove("hidden");
    }else if (dbArray[i] === "STAR100") {
      const stair100Mark = document.querySelector(".stair100-mark");
      stair100Mark.classList.remove("hidden");
    } else if (dbArray[i] === "LEEJUNGSEOB") {
      const leejungseobMark = document.querySelector(".leejungseob-mark");
      leejungseobMark.classList.remove("hidden");
    } 
  }
}
chekcingDone();

 


