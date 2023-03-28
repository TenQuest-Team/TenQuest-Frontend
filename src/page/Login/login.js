import { request } from "../../api.js";
import { push } from "../../router.js";
import Header from "../../component/header.js";
import AddCss from "../../component/addCss.js";

export default function Login({ $target }) {
    const $loginForm = document.createElement("form");
    $loginForm.setAttribute('method', 'post');

    new AddCss({
        href: "./src/page/Login/login.css"
    });

    this.render = () => {
        new Header({
            $target 
        });
        
        $loginForm.innerHTML = `
            <label for="user_id">아이디</label>
            <input type = "text" id="user_id" name = "user_id">
            <br>
            <label for="user_pw">비밀번호</label>
            <input type = "password" id="user_pw" name = "user_pw">
            <br>
            <button id="login_btn"> 로그인 </button>
            <button id="find_id_btn"> 아이디 찾기 </button>
            <button id="find_pw_btn"> 비밀번호 찾기 </button>
            <button id="sign_up_btn"> 회원가입 </button>
        `
        $target.appendChild($loginForm);
        document.querySelector('#login_btn').addEventListener('click', checkLogin);

    }

    //this.render();

    const $loginButton = document.querySelector('#login_btn');
    if($loginButton){
        $loginButton.addEventListener('click', checkLogin);
    }

    //$2a$10$c1JRvr9js1IBDdmfQNrwDOpSVs4zYwvmC1qCb6peigEPIL3MbFjHe
    async function checkLogin(e) {
        e.preventDefault();
        const input_id = document.querySelector('#user_id');
        const input_pw = document.querySelector('#user_pw');
        /*
        const memberInfo = await request(`/api/v1/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: input_id.value,
                password: input_pw.value
            })
        });
        */

        const memberInfo = await request(`/api/v1/members/userId?value=${input_id.value}`);
        console.log(memberInfo)
        const memberId = memberInfo.data.memberId;
        const userPassword = memberInfo.data.userInfo;
        const userName = memberInfo.data.userName;

        if(input_pw.value === userPassword) {
            alert(userName + "님 환영합니다.");
            localStorage.setItem('memberId', memberId);
            push('/templates');
        }
        
    }
}