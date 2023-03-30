import { push } from "../../router.js";

export default function ShareTemplatePage({$target}) {
  const $body = document.createElement('div');
    $body.class = 'body';
  
  const $creationCompleteDiv = document.createElement('div');
  $creationCompleteDiv.id = 'creationCompleteDiv';
  
  const $shareButton = document.createElement('button');
  $shareButton.innerText = "링크 공유하기";

  this.render = () => {
    const $successMessage = document.createElement('p');
    $successMessage.innerText = "질문지가 성공적으로 생성되었습니다!"
  
    
    $creationCompleteDiv.appendChild($successMessage);
    $creationCompleteDiv.appendChild($shareButton);
    $body.appendChild($creationCompleteDiv);
    $target.appendChild($body);

  }

  $shareButton.addEventListener('click', () => {
    const [,,templateId] = location.pathname.split('/');
    const shareTitle = "공유하기 기능 테스트";
    const shareText = "공유하기 기능입니다";
    const contentURL = `/reply/${templateId}`;
    let URLPreFix = "";

    URLPreFix = URLPreFix + "//" + location.host;
    console.log(URLPreFix)
    const shareURL = URLPreFix + contentURL;

    if(navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareURL
      })
      .then(() => console.log('successful share'))
      .catch(e => console.log('error sharing', e));
    } else {
      alert('공유하기를 ~~');
    }
  });
}