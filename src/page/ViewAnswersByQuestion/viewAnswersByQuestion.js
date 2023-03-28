import Header from "../../component/header.js";
import Category from "../../component/category.js";
import { request } from "../../api.js";
import AddCss from "../../component/addCss.js";
import { push } from "../../router.js";

export default function ViewAnswersByQuestion({$target, initialState }){
    /*
    new AddCss({
        href: "./src/page/ViewAnswers/viewAnswers.css"
    });
    */
    const $answerListDiv = document.createElement('div');

    const memberId = localStorage.getItem("memberId");
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
            //$li.setAttribute('class', 'template-doc-questions');
            //$li.setAttribute('data-quesiontId', questionId);
            //$li.setAttribute('data-templateDocId', templateDocId);
            $li.innerText = answerContent;
            $answerList.appendChild($li);
        })
        
        $target.appendChild($answerListDiv);
    }
/*
    $answerList.addEventListener('click', e => {
        const $question = e.target.closest('.template-doc-questions');
        
        const dataset = $question.dataset;

        if($question){
            push(`/view/template-id=${dataset.templatedocid}/${dataset.questionid}`);
        }
    })
    */
}