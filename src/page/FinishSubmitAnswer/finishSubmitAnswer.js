import AddCss from "../../component/addCss.js";

export default function FinishSubmitAnswer({$target}){
    new AddCss({
        href: "./page/FinishSubmitAnswer/finishSubmitAnswer.css"
    });
    
    const $readButton = document.createElement('button');
    $target.appendChild($readButton);
    $readButton.textContent = "다른 사람 답변 보기";
    $readButton.className = "finishPageButton"

    const $spanDiv = document.createElement('div');
    $target.appendChild($spanDiv);

    const $shareButton = document.createElement('button');
    $target.appendChild($shareButton);
    $shareButton.textContent = "+ 나만의 질문지 공유하기";
    $shareButton.className = "finishPageButton"
}