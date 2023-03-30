import { request } from "../../api.js";
import { push } from "../../router.js";
import Header from "../../component/header.js";

export default function Login({ $target }) {
    const $header = document.createElement('div');
    $header.className = 'header'

    const $body = document.createElement('div');
    $body.className = 'body';
    
    const $titleDiv = document.createElement('div');
    $titleDiv.id = 'titleDiv';

    const $title = document.createElement('h1');
    $title.innerText = 'Ten Quest';
    $title.className = "title";
    $titleDiv.appendChild($title);

    const $loginDiv = document.createElement('div');
    $loginDiv.id = 'loginDiv';

    const $loginForm = document.createElement("form");
    $loginForm.setAttribute('method', 'post');
    $loginForm.className = 'loginForm';


    this.render = () => {
        
        /*
        new Header({
            $target 
        });
        */
        $target.appendChild($header);
        $loginForm.innerHTML = `
            <label for="user_id"></label>
            <input type = "text" class ="login-input" id="user_id" name = "user_id" placeholder="ID">
            <br>
            <label for="user_pw"></label>
            <input type = "password" class ="login-input" id="user_pw" name = "user_pw" placeholder="Password">
            <br>
            <button class = "login-btn" id="login_btn"> 로그인 </button>
            <button class = "find-form-btn" id="find_id_btn"> ID 찾기 </button>
            <button class = "find-form-btn" id="find_pw_btn"> PW 찾기 </button>
            
                <button class = "join-form-btn" id="submit_btn"> 회원가입 </button>
        `
        //<span>use your account</span>
        $loginDiv.appendChild($loginForm);
        $body.appendChild($titleDiv);
        $body.appendChild($loginDiv);
        $target.appendChild($body);
        const $loginButton = document.querySelector('#login_btn');
        if($loginButton){
            $loginButton.addEventListener('click', checkLogin);
        }

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
        const userPassword = 'spdlqj12!!';
        const userName = memberInfo.data.userName;
       
        if(input_pw.value === userPassword) {
            alert(userName + "님 환영합니다.");
            sessionStorage.setItem('memberId', memberId);
            push('/templates');
        } else {
            console.log("umm")
        }
        
    }
}