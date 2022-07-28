`Team project`
## Open API를 활용한 GPS 인증 구현 앱 '걸어서 문화마을' 개발

> [구현페이지](https://go-to-munwha.herokuapp.com)     
> [결과보고서](https://github.com/0-un/gps_api_munwha/blob/main/%E1%84%80%E1%85%A5%E1%86%AF%E1%84%8B%E1%85%A5%E1%84%89%E1%85%A5-%E1%84%86%E1%85%AE%E1%86%AB%E1%84%92%E1%85%AA%E1%84%86%E1%85%A1%E1%84%8B%E1%85%B3%E1%86%AF.pdf)     
	[시연영상](https://youtu.be/lzbTWDG-ql8)       
👆 상세 내용은 해당 링크들을 통해 확인해주세요!

## 프로젝트 소개 (2022.06.01 ~ 2022.06.28)
- 지역 경제 활성화를 위한 GPS 인증 구현 스탬프 투어 앱 '걸어서 문화마을' 개발
- 문화마을 별 스탬프 지도가 존재하며, 하나의 문화마을 스탬프 지도 완성시 기념품 증정
- 전체 스탬프 지도 완성 시, 모바일 이용권 증정

## 기획의도 
- 지역 경제 활성화
- 기존 문화 마을 내 스탬프 투어 문제점 개선

## 개발 언어 및 기술 
- Kakao Map API, Node.js, express, EJS, Javascript, 반응형 웹(HTML5, CSS3)

## 담당 직무
- 프론트엔드
- Node.js, express, EJS, Javascript, Open API(Kakao Map API) 사용
- Open API 활용 GPS 인증 및 QR 확인 구현
- 프로젝트 관련 자료 조사 및 정리
- 워크플로우 제작
- 최종 발표 자료 정리 및 설계
- heroku 연동

## 구현 기능
- Node.js로 express를 사용하여 가상 DB를 구축하여 개발
	- 기존의 QR 위치에 가서 인증을 할 수 없어 가상 DB를 만들고 임시로 QR 데이터를 집어 넣어 스탬프 인증을 구현했다
- 각 코스의 GPS 좌표를 입력하여 코스 설계 및 카카오 맵 API의 지도에 마커 표시
-  사용자의 현재 위치와 코스 별 QR 범위 지정 및 대조 후, 거리 계산으로 QR 인증 구현
- QR 인증 완료한 지도의 마커 이미지 교체 및 스탬프 적립
- 각 스탬프 지도 별 적립 갯수 구현 및 지도 완성 시 이미지 추가


## 배운 점 & 아쉬운 점
>**배운 점**
- 계속 퍼블리싱을 맡다가 처음으로 프론트엔드를 맡았는데, `JavaScript`만 사용했던 저번 프로젝트들과 달리 이번 프로젝트 부터 갑자기 `Node.js`와 `express`, `EJS`를 사용해서 조금 당황했다. 
- 처음 사용해보는 프레임워크들이 어려웠고 `EJS`는 개념조차 이해하기 어려웠으나, 실무 개발자님께 계속해서 여쭤보고 스스로 코드를 분석함을 통해 프로젝트 말미에는 익숙해진 모습을 보고 뿌듯했다.
- 저번 프로젝트 때, 협업하는 과정에서 코드들이 꼬인 경험이 있어 이번 프로젝트 때는 기본적인 태그와 서버 구조 및 `JavaScript`  개발 을 전부 구현한 후 퍼블리셔 팀원들에게 넘겼더니, 서로 작업하기 훨씬 편리했다. 쌓인 경험들이 도움이 되는 것 같아 흡족했다.
-  사용자와 QR 범위 계산에서 애를 먹었는데, 기존에 진행 중인 [게임 프로젝트](https://github.com/0-un/windmill-fox)에서 아이템끼리 충돌 검사를 하며 썼던 코드를 참고해서 구현을 완료할 수 있게 되었다.

<details>
<summary>사용자와 QR 범위 계산 코드 👈</summary>

<div markdown="1">

```javascript
//만족한 값은 배열에서 지워주기 함수 생성
const  test = () => {

// tail : 위치 반경
const  tail = 0.0021674054525;

// 클릭했을 때 위치 가져옴
navigator.geolocation.getCurrentPosition((pos) => {

const  userLatitude = pos.coords.latitude;
const  userLongitude = pos.coords.longitude;

// 포지션만큼 반복문 돌림

for (let  i = 0; i < position.length; i++) {

const  pos_lati = position[i].latitude;
const  pos_long = position[i].longitude;

let  distanceX = pos_lati - userLatitude;
let  distanceY = pos_long - userLongitude;

let  xyDistance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

if(xyDistance>= tail){
return  position[i].name
}}
return
});
}

```
</div>
</details>

- 당시 충돌검사 코드에 대해 이해하느라 꽤 힘이 들었는데 이렇게 다른 분야에서도 응용할 수 있다는 점이 신기했고, 배움에 대한 의지를 더욱 굳세게 만들어주는 경험이었다.
- 처음으로 함수를 사용한 개발 코드를 작성했다. 당시 약 4개월간 `JavaScript` 스터디를 진행 중이었는데 함수를 이해하는데 꽤나 시간이 들었다. 실무 프로젝트에서 처음으로 도움 없이 혼자 함수로 코드를 개발할 수 있게 되었고, 추후 피드백을 통해 더욱 깔끔하고 간결한 코드가 완성 되었다. 한 번의 결석없이 매주 스터디에 참여하여 공부했던 기억들이 떠오르며 스스로의 발전에 뿌듯했다.

<details>
<summary> 각 스탬프 지도 별 적립 갯수 구현 및 지도 완성 시 이미지 추가 코드 👈</summary>

<div markdown="2">

```javascript
// db 데이터 가져오기

const  dbValue = document.getElementById("db-value").value;
const  dbArray = dbValue.split(",");

const  GAMCHEON = [ "MUSEUM", "SKYMARU", "BREAD", "B612", "GAMNAE", "GREEN", "DOGHOUSE", "SALT"];
const  HOCHEON = ["EOSEULLEONG", "STAIR180", "PLATFORM", "DRAMA", "MUNWHA", "CLOUDSTAIR", "STAR100", "LEEJUNGSEOB",];
const  HUINNYEOUL= ["MOVIE", "DUREBAK", "GGOMAK", "OBSERVATORY", "ROAD", "TUNNEL",];

function  stampNumber() {
// 감천에 대한 부분 확인 후 적용
let  GAMCHEON_count = 0;

for (let  i = 0; i < dbArray.length; i++) {
for (let  j = 0; j < GAMCHEON.length; j++) {
if (dbArray[i] == GAMCHEON[j]) {

GAMCHEON_count++;
}}}

document.querySelector(".stamp_data1").innerHTML = `<p>${GAMCHEON_count}</p>`

if (GAMCHEON_count == 8) {
const  gamcheonStamp = document.querySelector(".gamcheon_stamp");
gamcheonStamp.classList.remove("hidden");
}

// 호천에 대한 부분 확인 후 적용
let  HOCHEON_count = 0;

for (let  i = 0; i < dbArray.length; i++) {
for (let  j = 0; j < HOCHEON.length; j++) {
if (dbArray[i] == HOCHEON[j]) {

HOCHEON_count++;
}}}

document.querySelector(".stamp_data2").innerHTML = `<p>${HOCHEON_count}</p>`

if (HOCHEON_count == 8) {
const  hocheonStamp = document.querySelector(".hocheon_stamp");
hocheonStamp.classList.remove("hidden");
}

// 흰여울에 대한 부분 확인 후 적용
let  HUINNYEOUL_count = 0;

for (let  i = 0; i < dbArray.length; i++) {
for (let  j = 0; j < HUINNYEOUL.length; j++) {
if (dbArray[i] == HUINNYEOUL[j]) {
HUINNYEOUL_count++;

}}}
document.querySelector(".stamp_data3").innerHTML = `<p>${HUINNYEOUL_count}</p>`

if (HUINNYEOUL_count == 6) {
const  huinnyeoulStamp = document.querySelector(".huinnyeoul_stamp");

huinnyeoulStamp.classList.remove("hidden");
}}
stampNumber();

```

</div>
</details>

   

> **아쉬운 점**
- 실무 개발자님이 기본적인 틀을 잡아 주셔서 많은 도움이 되었으나, 다음에는 스스로 처음부터 끝까지 서버를 구축해보고 싶다.
- 당시 다른 팀들보다 페이지가 많아 퍼블리싱 해야하는 분량이 꽤 있었고, 또한 당시 나를 제외한 다른 팀원들이 다같이 코로나에 걸리는 일도 발생하여 당황했던 기억이 난다. 다음 프로젝트 때는 이러한 일이 발생할 경우에 대한 대비사항을 마련해 두고 싶다.
