import Header from "../../component/header.js";
import AddCss from "../../component/addCss.js";

export default function FindID({ $target }) {
    new Header({
        $target 
    });

    new AddCss({
        href: "./src/page/FindID/findID.css"
    });

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
            <button id="find_btn"> 찾기 </button>
        `
        $target.appendChild($findIDForm);
    }
}