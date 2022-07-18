// const e = require("express");

// db 데이터 가져오기
const dbValue = document.getElementById("db-value").value;
const dbArray = dbValue.split(",");
const testContainer = document.querySelector(".test");

function bottomMsg(msg, type) {
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 2000,
  });
  Toast.fire({ title: msg, icon: type });
}

const position = [
  // course1
  { name: "MUSEUM", latitude:35.097969, longitude: 129.0104535 },
  { name: "", latitude: 35.0986742, longitude: 129.0103218 },
  { name: "BREAD", latitude: 35.09856, longitude: 129.0089856 },
  { name: "B612", latitude: 35.0976985, longitude: 129.0085275 },
  { name: "GAMNAE", latitude: 35.0962966, longitude: 129.0094387 },
  { name: "GREEN", latitude: 35.0957612, longitude: 129.0088644 },
  { name: "DOGHOUSE", latitude: 35.0956075, longitude: 129.0091455 },
  { name: "SALT", latitude: 35.0942936, longitude: 129.0085568 },
  // course2
  { name: "EOSEULLEONG", latitude:35.1443487, longitude: 129.048328},
  { name: "STAIR180", latitude: 35.144172, longitude: 129.050272},
  { name: "PLATFORM", latitude: 35.1442926, longitude: 129.0511564},
  { name: "DRAMA", latitude: 35.1439592, longitude: 129.0512542},
  { name: "MUNWHA", latitude: 35.1430515, longitude: 129.0522883},
  { name: "CLOUDSTAIR", latitude: 35.1430041, longitude: 129.0525123},
  { name: "STAR100", latitude: 35.1410237, longitude: 129.0530841},
  { name: "LEEJUNGSEOB", latitude: 35.1408431, longitude: 129.053016},
  // course3
  { name: "MOVIE", latitude:35.079882, longitude: 129.0436133 },
  { name: "DUREBAK", latitude: 35.07949254068601, longitude: 129.04421951141165},
  { name: "GGOMAK", latitude: 35.0779460439799, longitude: 129.04580128016855},
  { name: "OBSERVATORY", latitude: 35.07572953380022, longitude: 129.04862053308148},
  { name: "ROAD", latitude: 35.078208458786634, longitude: 129.04543594056992},
  { name: "TUNNEL", latitude: 35.07584487984777, longitude: 129.04764285326448},
]
// 만족한 값은 배열에서 지워주기 함수 생성

//만족한 값은 배열에서 지워주기 함수 생성
const test = () => {
  // tail 위치 반경
  // 범위 안에서 사용자 위치 빼고 다이아몬드 모양으로 범위 지정, 약 3분 거리
  const tail = 0.0021674054525;
  // 클릭했을 때 위치 가져ㅏ옴
  navigator.geolocation.getCurrentPosition((pos) => {
    const userLatitude = pos.coords.latitude;
    const userLongitude = pos.coords.longitude;
    // 포지션만큼 반복문 돌림
    for (let i = 0; i < position.length; i++) {
      const pos_lati = position[i].latitude;
      const pos_long = position[i].longitude;
      let distanceX = pos_lati - userLatitude;
      let distanceY = pos_long - userLongitude;
      let xyDistance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

      if(xyDistance>= tail){
        return position[i].name
      }
      //  (내위치 + 경도)와 (내위치 - 경도) => 세로 범위 && (내위치 + 위도)와 (내위치 - 위도) => 가로 범위
      // if ((pos_lati - tail <= userLatitude && userLatitude <= pos_lati + tail) && (pos_long - tail <= userLongitude && userLongitude <= pos_long + tail)) {
      //   return position[i].name
      // } 
    }
    return 
  });
  
}



function doFetch(type) {

  // if(test() == type) {
    fetch("/qr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        type: type,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.success) {
          bottomMsg("QR  확인 되셨습니다! ", "success");
        } else {
          bottomMsg("인증실패", "error");
        }
        setTimeout(startScan, 3000);
      });
  // } else {
  //   alert('해당 장소가 아닙니다. 범위 내에서 QR 확인을 해주세요!')
  // }

  
}

function startScan() {
  let video = document.createElement("video");
  let canvasElement = document.getElementById("canvas");
  let canvas = canvasElement.getContext("2d");

  function drawLine(begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  // 카메라 사용시
  navigator.mediaDevices
    .getUserMedia(
      { video: { facingMode: "environment" } }
      // { video: true }
      )
    .then(function (stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", true); // iOS 사용시 전체 화면을 사용하지 않음을 전달
      video.play();
      requestAnimationFrame(tick);
    });

  function tick() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      // 읽어들이는 비디오 화면의 크기
      //canvasElement.height = video.videoHeight;
      //canvasElement.width = video.videoWidth;
      canvasElement.height = 850;
      canvasElement.width = 500;
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      let imageData = canvas.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      // const waitText = document.querySelector(".wait-text");
      // waitText.classList.add("hidden");

      // QR코드 인식에 성공한 경우
      if (code) {
        // 인식한 QR코드의 영역을 감싸는 사용자에게 보여지는 테두리 생성
        drawLine(
          code.location.topLeftCorner,
          code.location.topRightCorner,
          "#FF0000"
        );
        drawLine(
          code.location.topRightCorner,
          code.location.bottomRightCorner,
          "#FF0000"
        );
        drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner,
          "#FF0000"
        );
        drawLine(
          code.location.bottomLeftCorner,
          code.location.topLeftCorner,
          "#FF0000"
        );
        // QR코드 메시지 출력
        return doFetch(code.data);
      }
    }
    requestAnimationFrame(tick);
  }
}
startScan();
