import { push } from "../../router.js";

export default function ShareTemplatePage({$target}) {
  const $creationCompleteDiv = document.createElement('div');
  
  const $shareButton = document.createElement('button');
  $shareButton.innerText = "링크 공유하기";

  this.render = () => {
    const $successMessage = document.createElement('p');
    $successMessage.innerText = "질문지가 성공적으로 생성되었습니다!"
  
    
    $creationCompleteDiv.appendChild($successMessage);
    $creationCompleteDiv.appendChild($shareButton);
    $target.appendChild($creationCompleteDiv);
  }

  $shareButton.addEventListener('click', () => {
    const shareTitle = "공유하기 기능 테스트";
    const shareText = "공유하기 기능입니다";
    const contentURL = "/share/shareUrl";
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