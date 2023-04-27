import Header from "../../component/header.js";
import Category from "../../component/category.js";
import { request } from "../../api.js";
import { push } from "../../router.js";

export default function ViewAnswersByQuestion({$target, initialState }){
    const $body = document.createElement('div');
    $body.className = 'body';
    
    const $page = document.createElement('div');
    $page.id = 'viewAnswersByQuestionPage';

    const $answerListDiv = document.createElement('div');
    $answerListDiv.className = 'answerListDiv';

    const memberId = sessionStorage.getItem("memberId");
    this.state = initialState;


    const $answerList = document.createElement('ul');
    $answerListDiv.appendChild($answerList);
    $answerList.style.listStyle = 'none';

    let questionContent = '';
    
    this.setState = async nextState => {
        const answerDoc = await request(`/api/v1/answers/docId?value=${nextState.templateDocId}`)
        
        if(answerDoc){
            this.state = answerDoc.data;
        } 
        const questionRes = await request(`/api/v1/questions/content/questionId?value=${nextState.questionId}`)
        questionContent = questionRes.data;
        this.render();
    }


      
//    const $h2 = document.createElement('h2');

    this.render = () => {
        new Header({
            $target
        });
    
        /*$h2.innerText = questionContent;
        $questionContentDiv.appendChild($h2);   */
        const $questionBoxDiv = document.createElement('div')
        $questionBoxDiv.className = 'question-box';
        const $questionContentDiv = document.createElement('div');
        $questionContentDiv.className = 'questionTitleDiv';
        $questionContentDiv.innerText = questionContent;

        $questionBoxDiv.appendChild($questionContentDiv);
        $page.appendChild($questionBoxDiv);



        for(let i = 0; i < this.state.length; i++) {
            const {answerContent} = this.state[i];
            const $answerBoxDiv = document.createElement('div');
            $answerBoxDiv.className = 'answer-box'
            const $answerContentDiv = document.createElement('div');
            $answerContentDiv.className = 'answer'
            $answerContentDiv.innerText = `A. ${answerContent}`;
            $answerBoxDiv.appendChild($answerContentDiv);
            $answerList.appendChild($answerBoxDiv);
        }


        
        $page.appendChild($answerListDiv);
        $body.appendChild($page);

        $target.appendChild($body);

    }
}