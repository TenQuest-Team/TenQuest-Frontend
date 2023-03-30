import Header from "../../component/header.js";
import Category from "../../component/category.js";
import { request } from "../../api.js";
import AddCss from "../../component/addCss.js";
import { push } from "../../router.js";

export default function ViewAnswersByQuestion({$target, initialState }){
    const $body = document.createElement('div');
    $body.class = 'body';
    $target.appendChild = $body;
    
    const $answerListDiv = document.createElement('div');

    const memberId = sessionStorage.getItem("memberId");
    this.state = initialState;

    const $answerList = document.createElement('ul');
    $answerListDiv.appendChild($answerList);

    let questionContent = '';
    
    this.setState = async nextState => {
        const answerDoc = await request(`/api/v1/answers/docId?value=${nextState.templateDocId}`)
        this.state = answerDoc.data;

        const questionRes = await request(`/api/v1/questions/content/questionId?value=${nextState.questionId}`)
        questionContent = questionRes.data;
        this.render();
    }

    const $h2 = document.createElement('h2');

    this.render = () => {
        new Header({
            $target
        });
    
        $h2.innerText = questionContent;
        $target.appendChild($h2);    
        
        this.state.map(({answerContent}) => {
            const $li = document.createElement('li');
            $li.innerText = answerContent;
            $answerList.appendChild($li);
        })
        
        $target.appendChild($answerListDiv);
    }
}