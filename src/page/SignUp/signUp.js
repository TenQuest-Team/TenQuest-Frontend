import Header from "../../component/header.js";
import AddCss from "../../component/addCss.js";

export default function SignUp({ $target }) {
    new Header({
        $target 
    });

    const $signUpForm = document.createElement("form");

    new AddCss({
        href: "./src/page/SignUp/signUp.css"
    });

    this.render = () => {
        $signUpForm.innerHTML = `
            <p>[회원가입]</p>
            <label for="user_id">아이디</label>
            <input type = "text" id="user_id" name = "user_id" placeholder = "ID">
            <button id="overlap_check_btn">중복 검사</button>
            <br>
            <label for="user_pw">비밀번호</label>
            <input type = "password" id="user_pw" name = "user_pw" placeholder = "Password">
            <br>
            <label for="user_name">이름</label>
            <input type = "text" id="user_name" name = "user_name" placeholder = "Name">
            <br>
            <label for="user_email">이메일</label>
            <input type = "text" id="user_email" name = "user_email" placeholder = "E-mail">
            <br>
            <button id="login_btn"> 가입하기 </button>
        `
        $target.appendChild($signUpForm);
    }
}