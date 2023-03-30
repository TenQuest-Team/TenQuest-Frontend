import { push } from "../../router.js";

export default function FinishSubmitAnswer({$target}){
    
    const $body = document.createElement('div');
    $body.className = 'body';
    
    const $readButton = document.createElement('button');
    $readButton.id - 'readAnswersBtn';
    $readButton.textContent = "다른 사람 답변 보기";
    
    const $spanDiv = document.createElement('div');

    const $shareButton = document.createElement('button');
    $shareButton.textContent = "+ 나만의 질문지 공유하기";
    $shareButton.id = "shareMyTemplateButton"

    this.state = '';

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        
        $body.appendChild($readButton);

        $body.appendChild($spanDiv);
        $body.appendChild($shareButton);
        $target.appendChild($body);

        
    }

    $readButton.addEventListener('click', () => {
        push(`/template/${this.state}`);
    })
    
    $shareButton.addEventListener('click', () => {
        sessionStorage.clear();
        push('/');
    })
}