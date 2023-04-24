import Header from "../../component/header.js";
import Category from "../../component/category.js";
import { request } from "../../api.js";
import { push } from "../../router.js";

export default function ViewAnswersByAnswer({$target, initialState }){
    const $body = document.createElement('div');
    $body.className = 'body';
    
    const $page = document.createElement('div');
    $page.id = 'viewAnswersByAnswerPage';

    const $answerListDiv = document.createElement('div');
    $answerListDiv.className = 'answerListDiv';

    const memberId = sessionStorage.getItem("memberId");
    this.state = initialState;

    const $answerList = document.createElement('ul');
    $answerListDiv.appendChild($answerList);
    $answerList.style.listStyle = 'none'

    let questionContent = '';
    const questionContentList = [];
    this.setState = async nextState => {
        const answerDoc = await request(`/api/v1/answers/replyerId?value=${nextState}`)
        this.state = answerDoc.data;

        const templateDoc = await(request(`/api/v1/templates/template-id?value=${sessionStorage.getItem('templateId')}`))
        const templateDocList = templateDoc.data.templateDocList;
        if(templateDocList){
            templateDocList.map(({questionContent}) => 
                questionContentList.push(questionContent)
            );
        }
        this.render();
    }

    const $replyerNameDiv = document.createElement('div');
    $replyerNameDiv.className = 'viewDocTitleDiv';

    const $h2 = document.createElement('h2');
    let count = 0;
    this.render = () => {
        new Header({
            $target
        });
    
        console.log(questionContentList)
        $h2.innerText = `${sessionStorage.getItem('replyerName')} 님의 답변`;
        $replyerNameDiv.appendChild($h2); 
           

        for(let i = 0; i < this.state.length; i++) {
          const { answerContent, questionContent } = this.state[i];

          const $questionBox = document.createElement('div');
          $questionBox.classList.add('question-box');
          const $question = document.createElement('div');
          $question.classList.add('question');
          $question.innerText = `Q. ${questionContentList[i]}`;
          const $answerBox = document.createElement('div');
          $answerBox.classList.add('answer-box');
          const $answer = document.createElement('div');
          $answer.classList.add('answer');
          $answer.innerText = `A. ${answerContent}`;

          $answerBox.appendChild($answer);
          $questionBox.appendChild($question);
          $questionBox.appendChild($answerBox);
          $answerList.appendChild($questionBox);
        }

        $page.appendChild($replyerNameDiv);
        $page.appendChild($answerListDiv);
        $body.appendChild($page);
        $target.appendChild($body);

    }
}