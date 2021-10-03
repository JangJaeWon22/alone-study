"use strict";

const fs = require("fs").promises;

class userSchema {
  static #getUserInfo(data, id) {
    //stringify(문자열)가 아닌 parse(분석)
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users); // 키 값을 저장 => [id, psword, name]
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});
    return userInfo;
  }

  static #getUsers(data, isAll, dataFields) {
    const users = JSON.parse(data);
    if (isAll) return users;
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

  static getUsers(isAll, ...dataFields) {
    //static 사용 이유 : 은닉화된 변수를 반환 하기 위해선 정적 변수로 바꿔야됨 (클래스 자체에서 메소드에 접근할려면 필요함 또한 반환된 값으로 컨트롤러에서도 불러오려면 필요함.)
    //fs 불러와서 저장준비
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUsers(data, isAll, dataFields); //은닉화 한 메소드에서 새로운 user를 저장 할 수 있게 data, dataFields전달
      })
      .catch((err) => console.error);
  }

  //filedb의 내용 조회 (promise then)
  static getUserInfo(id) {
    //파일 db경로
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUserInfo(data, id); //은닉화 한 메소드에서 userInfo를 조회 할 수 있게 data,id 전달
      })
      .catch((err) => console.error);
  }

  //저장 부분
  static async save(clientInfo) {
    const users = await this.getUsers(true); //trun로 하면 모든 데이터를 가져옴 if(isAll)이 true일때 값 반환 한다고 정의햇음20번줄

    if (users.id.includes(clientInfo.id)) {
      throw "이미 존재하는 아이디입니다";
    }
    users.id.push(clientInfo.id);
    users.nickname.push(clientInfo.nickname);
    users.psword.push(clientInfo.psword);
    //(저장할 파일의 경로, 저장할 데이터 변수)
    fs.writeFile("./src/databases/users.json", JSON.stringify(users));
    return { success: true };
  }
}

module.exports = userSchema;
