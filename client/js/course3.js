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
const movie = document.getElementById("movie");
const durebak = document.getElementById("durebak");
const ggomak = document.getElementById("ggomak");
const observatory = document.getElementById("observatory");
const road = document.getElementById("road");
const tunnel = document.getElementById("tunnel");
const myPosition = document.getElementById("my-position");
// 인풋창의 값을 db 값으로 불러옴
const dbValue = document.getElementById("db-value").value;
const dbArray = dbValue.split(",");
const testContainer = document.querySelector(".test");

// 감천문화마을
const MOVIE = [35.079882, 129.0436133];
const DUREBAK = [35.07949254068601, 129.04421951141165 ];
const GGOMAK = [35.0779460439799, 129.04580128016855];
const OBSERVATORY = [35.07572953380022, 129.04862053308148];
const ROAD = [35.078208458786634, 129.04543594056992];
const TUNNEL = [35.07584487984777, 129.04764285326448];

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
// 기본으로 4 : 나의 위치 버튼
changeBtnCss(6);
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
      title: "MOVIE",
      latlng: new kakao.maps.LatLng(MOVIE[0], MOVIE[1]),
      summary: "영화기록관",
    },
    {
      title: "DUREBAK",
      latlng: new kakao.maps.LatLng(DUREBAK[0], DUREBAK[1]),
      summary: "두레박쉼터",
    },
    {
      title: "GGOMAK",
      latlng: new kakao.maps.LatLng(GGOMAK[0], GGOMAK[1]),
      summary: "꼬막계단",
    },
    {
      title: "OBSERVATORY",
      latlng: new kakao.maps.LatLng(OBSERVATORY[0], OBSERVATORY[1]),
      summary: "흰여울 전망대",
    },
    {
      title: "ROAD",
      latlng: new kakao.maps.LatLng(ROAD[0], ROAD[1]),
      summary: "흰여울길",
    },
    {
      title: "TUNNEL",
      latlng: new kakao.maps.LatLng(TUNNEL[0], TUNNEL[1]),
      summary: "흰여울터널",
    },
   
  ];
  for (let i = 0; i < positions.length; i++) {
    addStaticMarker(positions[i]);
  }

}

function addStaticMarker(position) {
  // 원래 이미지
  let markerImageUrl = "/client/file/no-done.jpg";
  let markerImageNormalSize = new kakao.maps.Size(24, 35);
  let markerImageClickSize = new kakao.maps.Size(50, 65);
  // qr 찍으면 이미지 변경
  if (dbArray.includes(position.title)) {
    markerImageUrl = "/client/file/complete.jpg";
    markerImageNormalSize = new kakao.maps.Size(50, 35);
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

movie.addEventListener("click", function () {
  changeBtnCss(0);
  clickPosition = "other";
  // 위치 중앙으로 이동
  panTo(MOVIE[0], MOVIE[1]);
});
durebak.addEventListener("click", function () {
  changeBtnCss(1);
  clickPosition = "other";
  panTo(DUREBAK[0], DUREBAK[1]);
});
ggomak.addEventListener("click", function () {
  changeBtnCss(2);
  clickPosition = "other";
  panTo(GGOMAK[0], GGOMAK[1]);
});
observatory.addEventListener("click", function () {
  changeBtnCss(3);
  clickPosition = "other";
  panTo(OBSERVATORY[0], OBSERVATORY[1]);
});
road.addEventListener("click", function () {
  changeBtnCss(4);
  clickPosition = "other";
  panTo(ROAD[0], ROAD[1]);
});
tunnel.addEventListener("click", function () {
  changeBtnCss(5);
  clickPosition = "other";
  panTo(TUNNEL[0], TUNNEL[1]);
});


myPosition.addEventListener("click", function () {
  changeBtnCss(6);
  clickPosition = "user";
  panTo(userLatitude, userLongitude);
});
