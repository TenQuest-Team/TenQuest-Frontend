import Header from "../../component/header.js";

export default function FindPW({ $target }) {

    const $body = document.createElement('div');
    $body.className = 'body';

    const $findPWDiv = document.createElement('div');
    $findPWDiv.class = 'body';

    const $findPWForm = document.createElement("form");
    $findPWDiv.appendChild($findPWForm);

    this.render = () => {
        new Header({
            $target 
        });

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
            <button class="find-form-btn" id="find_btn"> 찾기 </button>
        `
        $body.appendChild($findPWDiv);
        $target.appendChild($body);

    }
}