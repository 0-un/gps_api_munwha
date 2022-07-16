/*
 * course.js
 */

//course.ejs 의 태그들 연결

const newPosition = document.getElementById("new-position");
console.log(newPosition)
//querySelector 안은 css 처럼 아이디 클래스명 사용 가능
// const newPositionMark = document.querySelector(".new-position-mark");
// checkingDone으로 이동

const locationMap = document.getElementById("location-map");
const locationBtn = document.querySelectorAll(".course");
const museum = document.getElementById("museum");
const skymaru = document.getElementById("skymaru");
const bread = document.getElementById("bread");
const b612 = document.getElementById("b612");
const gamnae = document.getElementById("gamnae");
const green = document.getElementById("green");
const doghouse = document.getElementById("doghouse");
const salt = document.getElementById("salt");
const myPosition = document.getElementById("my-position");
const clickbox =document.querySelector(".click-box")
const clickbox2 = document.getElementsByClassName("click-box2");
const course_detail =document.querySelector(".course_detail_btn") //  장소 버튼 클릭시 장소설명 이벤트 핸들러
const clickEvent =document.querySelector(".clickEvent")

// 인풋창의 값을 db 값으로 불러옴
const dbValue = document.getElementById("db-value").value;
const dbArray = dbValue.split(",");
const testContainer = document.querySelector(".test");

// 감천문화마을
const MUSEUM = [35.097969, 129.0104535];
const SKYMARU = [35.0986742, 129.0103218 ];
const BREAD = [35.09856, 129.0089856];
const B612 = [35.0976985, 129.0085275];
const GAMNAE = [35.0962966, 129.0094387];
const GREEN = [35.0957612, 129.0088644];
const DOGHOUSE = [35.0956075, 129.0091455];
const SALT = [35.0942936, 129.0085568];

// 추천방식
// const YUNGJIN1 = {
//   위도: 35.87555082502176, 
//   경도: 128.6816374505427
// };

// 전역변수 : 잘 사용안함, 오류날 가능성 有
// navigator.geolocation.getCurr~ 함수 밖에선 undefined 값
//=> 함수 안에서 유저의 위치 정보 생성
let map;
let marker;
let userLatitude;
let userLongitude;
let clickPosition = "user";
// 이동하면서 내위치 판별하기 위해, 지우고 초기화 반복
let markers = [];
let selectedMarker = null;

// 로딩함수 호출
loading();
// 클릭할 때마다 버튼 Css 먹여줌
// 기본으로 8 : 나의 위치 버튼
changeBtnCss(8);
// 내비게이션 사용할 수 있는지 없는지
if (navigator.geolocation) {
  // pos로 내위치 보내주면 user의 위치정보 확인
  // pos : position
  navigator.geolocation.getCurrentPosition((pos) => {
    // user 위치 경도
    userLatitude = pos.coords.latitude;
    userLongitude = pos.coords.longitude;

    // 지도를 그린다
    drawMap(userLatitude, userLongitude);
    // 마커를 그림
    staticMarker();
    // 내위치 그림
    addMarker(new kakao.maps.LatLng(userLatitude, userLongitude));
    // 로딩 푼다
    loading();
  });
  // 실시간으로 사용자 위치 바뀌는 부분 -> 내 위도나 경도가 조금이라도 변하면 값을 던져줌
  // 비동기적으로 내위치만 계속해서 변경(필요한 부분만)
  navigator.geolocation.watchPosition((pos) => {
    /**
     * 실시간으로 사용자 위치가 범위안에 들어왔을시 QR 여기서 지정
     * 
     */
    // 이 부분이 없으면 이동할 때마다 계속 마크 생성
    delMarkers();
    // 유저 경도 위도 생성
    userLatitude = pos.coords.latitude;
    userLongitude = pos.coords.longitude;
    addMarker(new kakao.maps.LatLng(userLatitude, userLongitude));
    // 나의 위치를 클릭했을 시 맵 중앙으로 이동
    if (clickPosition === "user") {
      panTo(userLatitude, userLongitude);
    }
  });
}

// 로딩 함수
function loading() {
  const loadingWrap = document.querySelector(".loading-wrap");
  const body = document.querySelector("body");

  body.classList.toggle("touch-none");
  loadingWrap.classList.toggle("hidden");
}

// 내위치
function addMarker(position) {
  // marker 위치 가져옴
  marker = new kakao.maps.Marker({
    position: position,
  });
  marker.setMap(map);
  markers.push(marker);
}
// 원래 내 위치 빈값으로 만듦
function delMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  // 마커값 초기화
  markers = [];
}
function drawMyPosition(latitude, longitude) {
  const latlng = new kakao.maps.LatLng(latitude, longitude);

  marker = new kakao.maps.Marker({
    map: map,
    position: latlng,
    title: "내위치",
  });
  marker.setMap(map);
}

// 지도 그리는 부분
function drawMap(latitude, longitude) {
  const options = {
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 2,
  };
  // 확대 가능할건지 말건지
  map = new kakao.maps.Map(locationMap, options);
  map.setZoomable(false);
}

function staticMarker() {
  const positions = [
    {
      title: "MUSEUM",
      latlng: new kakao.maps.LatLng(MUSEUM[0], MUSEUM[1]),
      summary: "작은박물관",
    },
    {
      title: "SKYMARU",
      latlng: new kakao.maps.LatLng(SKYMARU[0], SKYMARU[1]),
      summary: "하늘마루",
    },
    {
      title: "BREAD",
      latlng: new kakao.maps.LatLng(BREAD[0], BREAD[1]),
      summary: "감천제빵소",
    },
    {
      title: "B612",
      latlng: new kakao.maps.LatLng(B612[0], B612[1]),
      summary: "소행성B612",
    },
    {
      title: "GAMNAE",
      latlng: new kakao.maps.LatLng(GAMNAE[0], GAMNAE[1]),
      summary: "감내어울터",
    },
    {
      title: "GREEN",
      latlng: new kakao.maps.LatLng(GREEN[0], GREEN[1]),
      summary: "그린하우스",
    },
    {
      title: "DOGHOUSE",
      latlng: new kakao.maps.LatLng(DOGHOUSE[0], DOGHOUSE[1]),
      summary: "멍멍이가있는집",
    },
    {
      title: "SALT",
      latlng: new kakao.maps.LatLng(SALT[0], SALT[1]),
      summary: "감천황토소금상회",
    },
  ];
  for (let i = 0; i < positions.length; i++) {
    addStaticMarker(positions[i]);
  }
  // const imageSrc =
  //   "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  // const imageSize = new kakao.maps.Size(24, 35);
  // const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  // for (let i = 0; i < positions.length; i++) {
  //   marker = new kakao.maps.Marker({
  //     map: map,
  //     position: positions[i].latlng,
  //     title: positions[i].title,
  //     image: markerImage,
  //   });
  //   marker.setMap(map);
  // }
}

function addStaticMarker(position) {
  // 원래 이미지
  let markerImageUrl = "/client/file/no-done.jpg";
  let markerImageNormalSize = new kakao.maps.Size(24, 35);
  let markerImageClickSize = new kakao.maps.Size(50, 65);
  // qr 찍으면 이미지 변경
  if (dbArray.includes(position.title)) {
    markerImageUrl = "/client/file/complete.jpg";
    markerImageNormalSize = new kakao.maps.Size(24, 35);
    markerImageClickSize = new kakao.maps.Size(70, 65);
  }
  const normalImage = createMarkerImage(markerImageUrl, markerImageNormalSize);
  const clickImage = createMarkerImage(markerImageUrl, markerImageClickSize);
  const marker = new kakao.maps.Marker({
    map: map,
    position: position.latlng,
    title: position.title,
    image: normalImage,
  });

  marker.normalImage = normalImage;

  kakao.maps.event.addListener(marker, "click", function () {
    testContainer.classList.remove("hidden");
    testContainer.innerHTML = `<p style="color:#fff; font-weight:bold;">${position.title}은 ${position.summary}</p>`;
    if (!selectedMarker || selectedMarker !== marker) {
      !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);
      marker.setImage(clickImage);
    }
    selectedMarker = marker;
  });
}
function createMarkerImage(url, markerSize) {
  const markerImg = new kakao.maps.MarkerImage(url, markerSize);
  return markerImg;
}

const panTo = (latitude, longitude) => {
  const moveLatLon = new kakao.maps.LatLng(latitude, longitude);
  map.panTo(moveLatLon);
};
function changeBtnCss(target) {
  for (let i = 0; i < locationBtn.length; i++) {
    if (target === i) {
      locationBtn[i].classList.add("pick-on");
    } else {
      locationBtn[i].classList.remove("pick-on");
    }
  }
}
//준익 버튼 이벤트 재할당 지역변수//
let btnnumber;
let empty ;

museum.addEventListener("click", function () {
btnnumber = museum.classList[1]
changeBtnCss(0);
clickPosition = "other";
// 위치 중앙으로 이동
   panTo(MUSEUM[0], MUSEUM[1]);
});
skymaru.addEventListener("click", function () {
  btnnumber = skymaru.classList[1]
  changeBtnCss(1);
  clickPosition = "other";
  panTo(SKYMARU[0], SKYMARU[1]);
});
bread.addEventListener("click", function () {
  btnnumber = bread.classList[1]
  changeBtnCss(2);
  clickPosition = "other";
  panTo(BREAD[0], BREAD[1]);
});
b612.addEventListener("click", function () {
  btnnumber = b612.classList[1]
  changeBtnCss(3);
  clickPosition = "other";
  panTo(B612[0], B612[1]);
});
gamnae.addEventListener("click", function () {
  btnnumber =gamnae.classList[1]
  changeBtnCss(4);
  clickPosition = "other";
  panTo(GAMNAE[0], GAMNAE[1]);
});
green.addEventListener("click", function () {
  btnnumber =green.classList[1]
  changeBtnCss(5);
  clickPosition = "other";
  panTo(GREEN[0], GREEN[1]);
});
doghouse.addEventListener("click", function () { 
  btnnumber =doghouse.classList[1]
  changeBtnCss(6);
  clickPosition = "other";
  panTo(DOGHOUSE[0], DOGHOUSE[1]);
});
salt.addEventListener("click", function () {
  btnnumber =salt.classList[1]
  changeBtnCss(7);
  clickPosition = "other";
  panTo(SALT[0], SALT[1]);
});

myPosition.addEventListener("click", function () {
  changeBtnCss(8);
  clickPosition = "user";
  panTo(userLatitude, userLongitude);
});

// 클릭이벤트 (준익 06-22) 
course_detail.addEventListener("click", showText);

function  showText() {
  empty = btnnumber
  console.log(empty);

  for (let i = 0; i < empty; i++) {
    if (empty[i] == "1") { // 작은박물관
      const salt = document.querySelector(".click-box8");
    const doghouse = document.querySelector(".click-box7");
    const green = document.querySelector(".click-box6");
    const gamnae = document.querySelector(".click-box5");
    const b612 = document.querySelector(".click-box4");
    const bread = document.querySelector(".click-box3");
    const skyText = document.querySelector(".click-box2");
    const museumText = document.querySelector(".click-box");
      museumText.classList.remove("hidden");
      skyText.classList.add("hidden");
      bread.classList.add("hidden");
      b612.classList.add("hidden");
      green.classList.add("hidden");
      gamnae.classList.add("hidden");
      doghouse.classList.add("hidden");
      salt.classList.add("hidden");
    }else if(empty[i] == "2"){ //하늘마루
      const salt = document.querySelector(".click-box8");
      const doghouse = document.querySelector(".click-box7");
      const green = document.querySelector(".click-box6");
      const gamnae = document.querySelector(".click-box5");
      const b612 = document.querySelector(".click-box4");
      const bread = document.querySelector(".click-box3");
      const skyText = document.querySelector(".click-box2");
      const museumText = document.querySelector(".click-box");

      skyText.classList.remove("hidden");
      museumText.classList.add("hidden");
      bread.classList.add("hidden");
      b612.classList.add("hidden");
      green.classList.add("hidden");
      gamnae.classList.add("hidden");
      doghouse.classList.add("hidden");
      salt.classList.add("hidden");
    }else if(empty[i] == "3"){ // 감천제빵소
      const salt = document.querySelector(".click-box8");
      const doghouse = document.querySelector(".click-box7");
      const green = document.querySelector(".click-box6");
      const gamnae = document.querySelector(".click-box5");
      const b612 = document.querySelector(".click-box4");
      const bread = document.querySelector(".click-box3");
      const skyText = document.querySelector(".click-box2");
      const museumText = document.querySelector(".click-box");

      bread.classList.remove("hidden");
      museumText.classList.add("hidden");
      skyText.classList.add("hidden");
      b612.classList.add("hidden");
      green.classList.add("hidden");
      gamnae.classList.add("hidden");
      doghouse.classList.add("hidden");
      salt.classList.add("hidden");
    }else if(empty[i] == "4"){ // 소행성
      const salt = document.querySelector(".click-box8");
      const doghouse = document.querySelector(".click-box7");
      const green = document.querySelector(".click-box6");
      const gamnae = document.querySelector(".click-box5");
      const b612 = document.querySelector(".click-box4");
      const bread = document.querySelector(".click-box3");
      const skyText = document.querySelector(".click-box2");
      const museumText = document.querySelector(".click-box");

      b612.classList.remove("hidden");
      bread.classList.add("hidden");
      museumText.classList.add("hidden");
      skyText.classList.add("hidden");
      green.classList.add("hidden");
      gamnae.classList.add("hidden");
      doghouse.classList.add("hidden");
      salt.classList.add("hidden");
    }else if(empty[i] == "5"){ // 감내어울터
      const salt = document.querySelector(".click-box8");
      const doghouse = document.querySelector(".click-box7");
      const green = document.querySelector(".click-box6");
      const gamnae = document.querySelector(".click-box5");
      const b612 = document.querySelector(".click-box4");
      const bread = document.querySelector(".click-box3");
      const skyText = document.querySelector(".click-box2");
      const museumText = document.querySelector(".click-box");
      gamnae.classList.remove("hidden");
      museumText.classList.add("hidden");
      skyText.classList.add("hidden");
      bread.classList.add("hidden");
      b612.classList.add("hidden");
      green.classList.add("hidden");
      doghouse.classList.add("hidden");
      salt.classList.add("hidden");
    }else if(empty[i] == "6"){ // 그린하우스
      const salt = document.querySelector(".click-box8");
      const doghouse = document.querySelector(".click-box7");
      const green = document.querySelector(".click-box6");
      const gamnae = document.querySelector(".click-box5");
      const b612 = document.querySelector(".click-box4");
      const bread = document.querySelector(".click-box3");
      const skyText = document.querySelector(".click-box2");
      const museumText = document.querySelector(".click-box");
      museumText.classList.add("hidden");
      skyText.classList.add("hidden");
      bread.classList.add("hidden");
      b612.classList.add("hidden");
      gamnae.classList.add("hidden");
      green.classList.remove("hidden");
      doghouse.classList.add("hidden");
      salt.classList.add("hidden");
    }else if(empty[i] == "7"){ // 멍멍이가있는집
      const salt = document.querySelector(".click-box8");
      const doghouse = document.querySelector(".click-box7");
      const green = document.querySelector(".click-box6");
      const gamnae = document.querySelector(".click-box5");
      const b612 = document.querySelector(".click-box4");
      const bread = document.querySelector(".click-box3");
      const skyText = document.querySelector(".click-box2");
      const museumText = document.querySelector(".click-box");
      museumText.classList.add("hidden");
      skyText.classList.add("hidden");
      bread.classList.add("hidden");
      b612.classList.add("hidden");
      gamnae.classList.add("hidden");
      green.classList.add("hidden");
      doghouse.classList.remove("hidden");
      salt.classList.add("hidden");
}else if(empty[i] == "8"){ // 감천황토소금상회
  const salt = document.querySelector(".click-box8");
  const doghouse = document.querySelector(".click-box7");
  const green = document.querySelector(".click-box6");
  const gamnae = document.querySelector(".click-box5");
  const b612 = document.querySelector(".click-box4");
  const bread = document.querySelector(".click-box3");
  const skyText = document.querySelector(".click-box2");
  const museumText = document.querySelector(".click-box");
  museumText.classList.add("hidden");
  skyText.classList.add("hidden");
  bread.classList.add("hidden");
  b612.classList.add("hidden");
  gamnae.classList.add("hidden");
  green.classList.add("hidden");
  doghouse.classList.add("hidden");
  salt.classList.remove("hidden");
}
}
}