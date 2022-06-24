// db 데이터 가져오기
const dbValue = document.getElementById("db-value").value;
const dbArray = dbValue.split(",");
const testContainer = document.querySelector(".test");

const GAMCHEON = [ "MUSEUM", "SKYMARU", "BREAD", "B612", "GAMNAE", "GREEN", "DOGHOUSE", "SALT"];
const HOCHEON = ["EOSEULLEONG", "STAIR180", "PLATFORM", "DRAMA", "MUNWHA", "CLOUDSTAIR", "STAR100", "LEEJUNGSEOB",];
const  HUINNYEOUL= ["MOVIE", "DUREBAK", "GGOMAK", "OBSERVATORY", "ROAD", "TUNNEL",];


function stampNumber() {
  // 감천에 대한 부분 확인 후 적용
  let GAMCHEON_count = 0;
  for (let i = 0; i < dbArray.length; i++) {
      for (let j = 0; j < GAMCHEON.length; j++) {
          if (dbArray[i] == GAMCHEON[j]) {
              GAMCHEON_count++;
          }
      }    
  }
  document.querySelector(".stamp_data1").innerHTML = `<p>${GAMCHEON_count}</p>`
  if (GAMCHEON_count == 8) {
      const gamcheonStamp = document.querySelector(".gamcheon_stamp");
      gamcheonStamp.classList.remove("hidden");
  }

  // 호천에 대한 부분 확인 후 적용
  let HOCHEON_count = 0;
  for (let i = 0; i < dbArray.length; i++) {
      for (let j = 0; j < HOCHEON.length; j++) {
          if (dbArray[i] == HOCHEON[j]) {
           HOCHEON_count++;
          }
      }    
  }

  document.querySelector(".stamp_data2").innerHTML = `<p>${HOCHEON_count}</p>`
  if (HOCHEON_count == 8) {
      const hocheonStamp = document.querySelector(".hocheon_stamp");
      hocheonStamp.classList.remove("hidden");
  }


  // 흰여울에 대한 부분 확인 후 적용
  let HUINNYEOUL_count = 0;
  for (let i = 0; i < dbArray.length; i++) {
      for (let j = 0; j < HUINNYEOUL.length; j++) {
          if (dbArray[i] == HUINNYEOUL[j]) {
              HUINNYEOUL_count++;
          }
      }    
  }

  document.querySelector(".stamp_data3").innerHTML = `<p>${HUINNYEOUL_count}</p>`
  if (HUINNYEOUL_count == 6) {
      const huinnyeoulStamp = document.querySelector(".huinnyeoul_stamp");
      huinnyeoulStamp.classList.remove("hidden");
  }

}
stampNumber();


