"use strict";


const id = document.querySelector("#id"), //html을 읽을 수 있도록 하는 document(최상위) 활용
  psword = document.querySelector("#psword"),
  loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

if (localStorage.getItem("token")){
  getSelf(function () {
    alert("이미 로그인이 되어있습니다. 블로그 페이지로 이동합니다.");
    window.location.replace("/");
  });
}

function login() {
  if(!id.value) {return alert("아이디를 입력해주세요.")};
  if (!psword.value) {return alert ("비밀번호를 입력해주세요")};
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
        localStorage.setItem("token", res.token)
        location.href = "/";
      } else {
        alert(res.msg);

      }
    })
    .catch((err) => {
      //서버에서 이상이 생겼을때 (ex. router 지웠을때) new Error 은 콘솔에서 찍혀 나옴
      console.error(new Error("로그인 중 에러 발생"));
    });
}


