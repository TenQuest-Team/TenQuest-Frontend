import Header from "../../component/header.js";

export default function FindPW({ $target }) {
    new Header({
        $target 
    });

    const $findPWForm = document.createElement("form");
    $target.appendChild($findPWForm);

    this.render = () => {
        $findPWForm.innerHTML = `
            <p>[비밀번호 찾기]</p>
            <label for="user_name">아이디</label>
            <input type = "text" id="user_id" name = "user_id">
            <br>
            <label for="user_name">이름</label>
            <input type = "text" id="user_name" name = "user_name">
            <br>
            <label for="user_email">이메일</label>
            <input type = "text" id="user_email" name = "user_email">
            <br>
            <button id="find_btn"> 찾기 </button>
        `
    }

    this.render();
}