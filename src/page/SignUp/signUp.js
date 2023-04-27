import Header from "../../component/header.js";
import { request } from "../../api.js";
import { push } from "../../router.js";

export default function SignUp({ $target }) {


    const $body = document.createElement('div');
    $body.className = 'body';
    
    const $signUpDiv = document.createElement('div');
    $signUpDiv.id = 'signUpDiv';

    const $signUpForm = document.createElement("form");
    $signUpForm.id = "signUpForm";

    this.render = () => {
        new Header({
            $target 
        });
        
        $signUpForm.innerHTML = `
            <div class="joinP">회원가입</div>
            <label for="user_id">아이디</label>
            <input  type = "text" class ="sign-up-input" id="user_id" name = "user_id" placeholder = "ID">
            <button id="overlap_check_btn" class ="check-btn">중복 검사</button>
            <br>
            <label for="user_pw">비밀번호</label>
            <input type = "password" class ="sign-up-input" id="user_pw" name = "user_pw" placeholder = "Password">
            <br>
            <label for="check_user_pw">비밀번호 확인</label>
            <input type = "password" class ="sign-up-input" id="check_user_pw" name = "check_user_pw" placeholder = "Check Password">
            <br>
            <label for="user_name">이름</label>
            <input type = "text" class ="sign-up-input" id="user_name" name = "user_name" placeholder = "Name">
            <br>
            <label for="user_email">이메일</label>
            <input type = "text" class ="sign-up-input" id="user_email" name = "user_email" placeholder = "E-mail">
            <br>
            <button id="signUp_btn" class="join-btn"> 가입하기 </button>
        `
        
        $signUpDiv.appendChild($signUpForm);
        $body.appendChild($signUpDiv);
        $target.appendChild($body);

        const $overlapCheckButton = document.querySelector('#overlap_check_btn');
        if($overlapCheckButton){
            $overlapCheckButton.addEventListener('click', checkOverlap);
        }
        const $signUpButton = document.querySelector('#signUp_btn');
        if($signUpButton){
            $signUpButton.addEventListener('click', signUp);
        }
    }    
}

let checkOverlapCount = 0;
let isOverlap = false;

async function checkOverlap(e) {
    e.preventDefault();
    isOverlap = false;
    checkOverlapCount++;

    const userId = document.querySelector('#user_id').value;

    const members = await request(`/api/v1/members`);
    members.data.some(member => {
        if(member.userId === userId) {
            isOverlap = true;
        }
        return (member.userId === userId)
    });

    if(isOverlap) {
        alert("아이디가 중복되었습니다. 다른 아이디를 입력해주세요.");
        document.querySelector('#user_id').value = '';
    } else{
        alert("사용 가능한 아이디입니다.");
    }
}

async function signUp(e) {
    e.preventDefault();

    const userId = document.querySelector('#user_id').value;
    const userPw = document.querySelector('#user_pw').value;
    const checkUserPw = document.querySelector('#check_user_pw').value;
    const userName = document.querySelector('#user_name').value;
    const userEmail = document.querySelector('#user_email').value;

    if(checkOverlapCount > 0){
        
        const requestBody = {
            "userId": userId,
            "userInfo": userPw,
            "userName": userName,
            "userEmail": userEmail
        };
        
        if(userPw === checkUserPw) {
            const signUpRes = await request('/api/v1/members', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if(signUpRes.code === 201){
                alert(userName + "님의 회원가입이 완료되었습니다.");
                push("/");
            }
        } else {
            alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
            document.querySelector('#check_user_pw').value = '';
            document.querySelector('#user_pw').value = '';
        }
    } else{
        alert("아이디 중복 검사를 진행해주세요.")
    }
}