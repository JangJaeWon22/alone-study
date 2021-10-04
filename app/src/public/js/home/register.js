"use strict";

//js파일 defer로 읽게 함(제일 먼저 읽게 해서 값을 가져올수 있도록 함)
const id = document.querySelector("#id"), //html을 읽을 수 있도록 하는 document(최상위) 활용
  nickname = document.querySelector("#nickname"),
  psword = document.querySelector("#psword"),
  confirmPsword = document.querySelector("#confirmPsword"),
  registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
    if(!id.value) return alert("아이디를 입력해주세요.");
    if (psword.value !== confirmPsword.value) {return alert ("비밀번호가 일치하지 않습니다.")};
  const req = {
    //register을 요청하는 데이터라서 변수명 req라고 함.
    id: id.value,
    nickname: nickname.value,
    psword: psword.value,
  };

  fetch("/register", {
    method: "POST",
    headers: {
      "content-Type": "application/json", // 헤더에 JSON데이터로 보낸다고 알려줌
    },
    body: JSON.stringify(req),
  }) 
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        alert(res.msg)
        location.href = "/login";
      } else {
        alert(res.errorMassage);
      }
    })
    .catch((err) => {
      console.error(new Error("회원가입 중 에러 발생"));
    });
}
