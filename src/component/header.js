import Login from "../page/Login/login.js";
export default function Header({ $target }){
    const $header = document.createElement('div');
    $header.className = 'header'

    const $beforeButton = document.createElement('button');
    $beforeButton.className = 'beforeButton';
    $beforeButton.innerText = '<'

    const $logout = document.createElement('button');
    $logout.className = 'logout-Btn';
    $logout.innerText = 'Logout';

    const $h1 = document.createElement("h1");
    $h1.className = "title";
    $h1.textContent = "Ten Quest";
    $header.appendChild($beforeButton);

    $header.appendChild($h1);
    
    this.render = () => {
        if (sessionStorage.getItem('memberId') !== null) {
            $header.appendChild($logout); // memberId가 존재할 경우 로그아웃 버튼을 추가함
            $logout.style.display = "block";
        } else {
            $logout.style.display = "none";
        }
        $target.appendChild($header);
    }

    this.render();

    $beforeButton.addEventListener('click', () => {
        history.back();
        return false;
    })

    $logout.addEventListener('click', () => {
        sessionStorage.clear();
        const loginPage = new Login({$target});
        $target.innerHTML = '';
        loginPage.render();

    })
}

