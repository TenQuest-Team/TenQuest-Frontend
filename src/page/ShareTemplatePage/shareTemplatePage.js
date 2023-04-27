import { push } from "../../router.js";

export default function ShareTemplatePage({$target}) {
  const $body = document.createElement('div');
    $body.className = 'body-share';
  
  const $creationCompleteDiv = document.createElement('div');
  $creationCompleteDiv.id = 'creationCompleteDiv';
  
  const $shareButton = document.createElement('button');
  $shareButton.innerText = "링크 복사하기";
  $shareButton.className = 'share-btn';
  this.render = () => {
    const $successMessage = document.createElement('div');
    $successMessage.className = 'success-Msg'
    $successMessage.innerText = "질문지가 성공적으로 생성되었습니다!"
  
    
    $creationCompleteDiv.appendChild($successMessage);
    $creationCompleteDiv.appendChild($shareButton);
    $body.appendChild($creationCompleteDiv);
    $target.appendChild($body);

  }

  $shareButton.addEventListener('click', () => {
    const [,,templateId] = location.pathname.split('/');
        const contentURL = location.host + `/reply/${templateId}`;
    navigator.clipboard.writeText(contentURL);
  });
}