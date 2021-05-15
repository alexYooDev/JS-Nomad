const API_KEY = '0234d99c21d5a3ea55cf9c1ae76d6025';
const COORDS = 'coords'; // 로컬 저장소에 저장할 'coords' 문자열을 저장한 함수
const weather = document.querySelector('.js-weather');

function getWeather(lat, lng) {
  //handleGeoSuccess 함수에서 전달 받은 매개상수로
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric
    `)
    .then(function (response) {
      return response.json();
      //then() : API 데이터를 받고 나서 함수를 호출 -> response 정보를 가저온다
      // response 안의 json 내용을 반환
    })
    .then(function (json) {
      //json으로 가공이 되면
      const temperature = Math.ceil(parseInt(json.main.temp));
      const location = json.name;
      weather.innerText = `${temperature}°C @ ${location}`;
      //json 내용을 콘솔에 찍음
    });
}

function saveCoords(coordsObj) {
  //좌표 정보를 저장하는 함수
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
  //로컬 저장소에 'coord' 문자열 내용을 저장된 좌표 객체로 설정;
}

function handleGeoSuccess(position) {
  // 지리 정보를 가져오는 함수
  const latitude = position.coords.latitude; //위도정보를 저장하는 상수
  const longitude = position.coords.longitude; //경도 정보를 저장하는 상수
  const coordsObj = {
    latitude,
    longitude,
  };
  //위도, 경도 정보 담은 상수를 객체에 저장;
  saveCoords(coordsObj);
  //좌표 저장 함수에 정보가 담긴 객체를 매개로 전달
  getWeather(latitude, longitude);
  //API로 날씨 정보를 가져오는 함수에 정의된 위도, 경도 상수를 매개로 전달
}

function handleGeoError() {
  console.log('Cannot access geo location');
}

function askForCoords() {
  //좌표를 묻는 aksForCoords 함수
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  //navigator API의 geolocation 객체 안 getCurrentPosition 함수 호출
  //(성공적으로 지리정보를 가져오는 함수, 에러를 담당하는 함수를 매개로 가져옴)
}

function loadCoords() {
  //좌표 호출 함수
  const loadedCoords = localStorage.getItem(COORDS); //로컬 저장소에 저장된 'coord' 문자열을 가져와 저장한 상수

  if (loadedCoords === null) {
    //불러온 함수가 없다면
    askForCoords(); //좌표를 묻고
  } else {
    //있다면
    const parsedCoords = JSON.parse(loadedCoords);
    // String화 되어 저장되있는 좌표정보를 JSON형태로 변환해서 parsedCoords에 저장
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
    //날씨정보를 가져오는 함수에 JSON변환된 위도, 경도 정보를 보낸다.
  }
}
function init() {
  //모든 함수를 실행하는 실행 함수 init()
  loadCoords(); //loadCoord() 함수 호출
}

init(); //init 함수 호출

/*
const COORDS = 'coords';

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
}

function handleGeoError() {
  console.log('Cannot access geo coordinates');
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoord() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    loadCoord();
  }
}

function init() {
  loadCoord();
}

init();
*/
