const toDoForm = document.querySelector('.js-toDoForm'),
  //js-toDoForm 클래스를 가진 form 요소를 특정하여 저장한 상수
  toDoInput = toDoForm.querySelector('input'),
  //input 태그를 특정하여 저장한 상수
  toDoList = document.querySelector('.js-toDoList');
//js-toDoList 클래스를 가진 ul을 특정하여 저장한 상수

const TODO_LS = 'toDo'; //이유: 여러군데 써야 되는데 오타 생길수 있어서 방지
let toDos = [];
//로컬 저장소에 저장할 여러 값을 위한 배열

function deleteToDo(event) {
  //()안에 event는 이벤트가 있을 시 실행하는 함수라는 뜻
  const btn = event.target;
  // 이벤트가 일어난 요소 (버튼)을 특정하여 저장한 상수
  const li = btn.parentNode;
  // 버튼의 부모 요소인 li를 특정한 상수
  toDoList.removeChild(li);
  //toDoList ul에서 자식인 li를 제거
  const cleanToDos = toDos.filter(function (toDo) {
    //배열의 모든 아이템을 통해 함수를 실행, 값이 true 인것만 가지고 새로운 배열 생성
    //toDos 배열안의 각요소에 있어 함수를 실행, 배열 내 조건을 만족하는 요소를 반환 => 그 값을 cleanToDos에 저장
    // 즉, 위에서 버튼을 눌러 요소를 제거한 값을 새로 저장
    return toDo.id !== parseInt(li.id);
    //toDo 매개변수의 id가 li의 id와 다르면 킵, 같으면 거름 true or false
  });
  toDos = cleanToDos;
  //toDos 배열을 cleanToDos(toDos 배열을 조건으로 거른( 삭제한 ) 값을 저장)
  saveToDo();
}

function saveToDo() {
  //toDo를 로컬 저장소에 저장하는 함수

  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
  //로컬 저장소에 저장한 TODO_LS를 toDos 배열안의 객체를 문자열로 바꾼 것으로 설정
}

function paintToDo(text) {
  //로컬 저장소의 toDo를 ul에 보여주는 함수

  const li = document.createElement('li');
  // li 태그를 생성하는 코드를 저장한 상수
  const delBtn = document.createElement('button');
  // 버튼태크를 생성하는 코드를 저장한 상수
  delBtn.innerText = 'X';
  delBtn.addEventListener('click', deleteToDo);
  //버튼 안의 텍스트를 지정
  const span = document.createElement('span');
  //span 태크를 생성하는 코드를 저장한 상수
  const newId = toDos.length + 1;
  //toDos 배열의 길이 + 1 ( 배열의 순서는 0부터 시작하니까) 를 저장한 상수
  span.innerText = text;
  //span의 텍스트를 매개변수 입력값으로 지정
  li.appendChild(span);
  //li안에 span 요소를 삽입
  li.appendChild(delBtn);
  //li안에 delBtn 요소를 삽입
  li.id = newId;
  //li의 id 는 newId의 값 즉, toDos.length + 1;
  toDoList.appendChild(li);
  //toDoList (ul)에 li요소를 삽입
  const toDoObj = {
    // toDoObj라는 객체 생성해서 객체에 , text값을 매개변수 입력값으로 설정, id는 newId 값으로 설정
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  //toDos 배열에 toDoObj 객체를 삽입
  saveToDo();
  //saveTodo 함수 호출
}

function handleSubmit(event) {
  //이벤트가 있을 경수 실행하는 함수라는 뜻
  //submit 이벤트 발생시 특정 동작을 하는 함수

  event.preventDefault();
  //기본 이벤트(새로고침)를 죽임
  const currentValue = toDoInput.value;
  // toDoInput에  입력값을 저장한 상수
  paintToDo(currentValue);
  // painToDo함수를 호출 (input입력값을 text 매개변수로 받음)
}

function loadToDo() {
  // 로컬 저장소의 toDo 값을 불러오는 함수
  const loadedToDo = localStorage.getItem(TODO_LS);
  // toDo 값을 불러와서 저장한 함수
  if (loadedToDo !== null) {
    // toDo가 로컬 저장소에 저장되어 있다면
    const parsedTodos = JSON.parse(loadedToDo);
    // toDo 객체 JSON으로 변환한 것을 저장한 상수
    parsedTodos.forEach(function (toDo) {
      //toDo는 로컬 저장소 안의 toDo에 저장된 각 스트링, 그것을 받아 paintToDo 함수를 실행해 화면에 표시
      // 배열 안의 제이슨 객체들에 있어 각자 함수를 실행
      paintToDo(toDo.text);
      // 저장된 투두리스트를 toDo 텍스트로 해서 화면에 계속 표시
    });
  }
}

function init() {
  //위의 모든 함수를 실행하는 함수
  loadToDo();
  //loadToDo함수를 호출 -> 로컬 저장소에 저장된 값을 불러오고, 화면의 ul에 표기
  toDoForm.addEventListener('submit', handleSubmit);
  // submit 이벤트 발생시 handleSubmit함수를 실행
}

init();
//init 함수 실행
