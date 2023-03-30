import Header from "../../component/header.js";

export default function FindID({ $target }) {
    new Header({
        $target 
    });

    const $body = document.createElement('div');
    $body.className= 'body';
    $target.appendChild($body);
    
    const $loginDiv = document.createElement('div');
    $loginDiv.className = 'loginDiv';

    const $findIDForm = document.createElement("form");

    this.render = () => {
        $findIDForm.innerHTML = `
            <p>[아이디 찾기]</p>
            <label for="user_name">이름</label>
            <input type = "text" id="user_name" name = "user_name">
            <br>
            <label for="user_email">이메일</label>
            <input type = "text" id="user_email" name = "user_email">
            <br>
            <button class="find-form-btn" id="find_btn"> 찾기 </button>
        `
        $loginDiv.appendChild($findIDForm);
        $body.appendChild($loginDiv);
    }
}