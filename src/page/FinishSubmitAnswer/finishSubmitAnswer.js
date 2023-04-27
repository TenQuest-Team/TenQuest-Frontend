import { push } from "../../router.js";

export default function FinishSubmitAnswer({$target}){
    
    const $body = document.createElement('div');
    $body.className = 'body';

    const $tenquest = document.createElement('p');
    $tenquest.innerText = 'Tenquest';
    $tenquest.id = "tenquest";


    const $submitMessage = document.createElement('p');
    $submitMessage.innerText = '답변이 제출되었습니다!';
    $submitMessage.id = "submitMessage"

    const $readButton = document.createElement('button');
    $readButton.id = "readAnswersBtn";
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

        $body.appendChild($tenquest);
        $body.appendChild($submitMessage);

        if(sessionStorage.getItem('template_isPublic') === "true"){
            $body.appendChild($readButton);
        }
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