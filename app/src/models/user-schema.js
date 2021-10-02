"use strict";

class userSchema {
  static #users = {
    // static 선언 해서 정적 변수로 사용 하지만 외부에서 불러올 수 있는걸 아무도 모르게 해야됨 그래서 은닉화 함.
    id: ["qwer", "1234", "nick"],
    psword: ["qwer", "1234", "1212"],
    nickname: ["qwer", "qwer", "god"],
  };

  static getUsers(...dataFields) {
    //은닉화된 변수를 반환 하기 위해선 정적 변수로 바꿔야됨 (클래스 자체에서 메소드에 접근할려면 필요함 또한 반환된 값으로 컨트롤러에서도 불러오려면 필요함.)
    const users = this.#users;
    //새로운 사람들 저장 하기 위함.
    //reduce (새롭게 생길 object,) 변수명) 마지막 {}의 뜻은 object로 만든다는 뜻  /// console.log 찍으면 {} id undefined psword
    const newUsers = dataFields.reduce((newUser, dataFields) => {
      //키값을 물어봄 있으면 true
      if (users.hasOwnProperty(dataFields)) {
        newUser[dataFields] = users[dataFields];
      }
      return newUser;
    }, {});
    //저장된 user정보 오브젝트로 나옴 // console.log(newUsers); 
    return newUsers; //은닉화된 변수 반환
  }
}

module.exports = userSchema;
