"use strict";

//js파일 defer로 읽게 함(제일 먼저 읽게 해서 값을 가져올수 있도록 함)
const id = document.querySelector("#id"), //html을 읽을 수 있도록 하는 document(최상위) 활용
  psword = document.querySelector("#psword"),
  loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

function login() {
  const req = {
    //login을 요청하는 데이터라서 변수명 req라고 함.
    id: id.value,
    psword: psword.value,
  };

  //fetch 활용 -> 서버랑 프론트단이랑 어떤 경로로 교환을 할지 정함.
  //비교해보자!! 문자열로 아에 다 바꿔서 보내줌.
  // console.log(req);
  // console.log(JSON.stringify(req));
  fetch("/login", {
    method: "POST",
    headers: {
      "content-Type": "application/json", // 헤더에 JSON데이터로 보낸다고 알려줌
    },
    body: JSON.stringify(req), // req데이터를 JSON데이터로 감싸 전달
  }) //fetch then으로 응답값(res)를 받았음 //확인 결과 .then((res) => console.log(res.json()));
    .then((res) => res.json())
    //fetch에서 받은 응답값이 promise 값으로 넘어와서 then으로 제가공 // 확인 결과 .then((res) => console.log(res));
    .then((res) => {
      if (res.success) {
        location.href = "/";
      } else {
        console.log(res)
        alert(res.errorMassage);

      }
    })
    .catch((err) => {
      //서버에서 이상이 생겼을때 (ex. router 지웠을때) new Error 은 콘솔에서 찍혀 나옴
      console.error(new Error("로그인 중 에러 발생"));
    });
}


