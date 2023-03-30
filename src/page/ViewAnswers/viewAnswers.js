import Header from "../../component/header.js";
import Category from "../../component/category.js";
import { request } from "../../api.js";
import AddCss from "../../component/addCss.js";
import { push } from "../../router.js";

export default function ViewAnswers({$target, initialState }){
    new AddCss({
        href: "./src/page/ViewAnswers/viewAnswers.css"
    });
    
    const $answerListDiv = document.createElement('div');

    const memberId = sessionStorage.getItem("memberId");
    this.state = initialState;

    const $answerList = document.createElement('ul');
    $answerListDiv.appendChild($answerList);

    this.setState = async nextState => {
        const replyerDoc = await request(`/api/v1/answers/replyerNames/templateId?value=${nextState}`)
        sessionStorage.setItem('templateId', nextState);
        sessionStorage.setItem('viewType', 'answers');
        this.state = replyerDoc.data;
        this.render();
    }

    const $category1 = document.createElement('button');
    $category1.setAttribute("data-categoryId", "1");
    $category1.className = "categories";
    $category1.innerText = 'Answers';

    const $category2 = document.createElement('button');
    $category2.setAttribute("data-categoryId", "2");
    $category2.className = "categories";
    $category2.innerText = 'Questions';
    
    this.render = () => {
        //new Header({$target});

        $target.appendChild($category1);
        $target.appendChild($category2);

        console.log(this.state)
        if(sessionStorage.getItem('viewType') === 'answers'){
            this.state.map(({replyerId, replyerName}) => {
                const $li = document.createElement('li');
                $li.setAttribute('class', 'replyerList');
                $li.setAttribute('data-replyerId', replyerId);
                $li.setAttribute('data-replyerName', replyerName);
                $li.innerText = replyerName;
                $answerList.appendChild($li);
            })
        } else {
            this.state.templateDocList.map(({templateDocId, questionContent, questionId}) => {
                const $li = document.createElement('li');
                $li.setAttribute('class', 'questionList');
                $li.setAttribute('data-templateDocId', templateDocId);
                $li.setAttribute('data-questionId', questionId);
                $li.innerText = questionContent;
                $answerList.appendChild($li);
            })
        }

        $target.appendChild($answerListDiv);
    }

    /*
    $answerList.addEventListener('click', e => {
        const $question = e.target.closest('.template-doc-questions');
        const dataset = $question.dataset;

        if($question){
            push(`/view/${dataset.templatedocid}/${dataset.questionid}`);
        }
    })
    */

    $answerList.addEventListener('click', e => {
        if(sessionStorage.getItem('viewType') === 'answers'){
            const $answer = e.target.closest('.replyerList');
            const dataset = $answer.dataset;
            if($answer){
                sessionStorage.setItem('replyerName', dataset.replyername);
                push(`/view/answer/${dataset.replyerid}`);
            }
        } else {
            const $answer = e.target.closest('.questionList');
            const dataset = $answer.dataset;
            
            if($answer){
                push(`/view/question/${dataset.templatedocid}/${dataset.questionid}`);
            }
        }
    })

    $category1.addEventListener('click', async() => {
        const templateDoc = await request(`/api/v1/answers/replyerNames/templateId?value=${sessionStorage.getItem('templateId')}`)
        this.state = templateDoc.data;
        sessionStorage.setItem('viewType', 'answers');
        $answerList.innerHTML = '';
        this.render();  
    })

    $category2.addEventListener('click', async () => {
        const templateDoc = await request(`/api/v1/templates/template-id?value=${sessionStorage.getItem('templateId')}`)
        this.state = templateDoc.data;
        sessionStorage.setItem('viewType', 'questions');
        $answerList.innerHTML = '';
        this.render();    
    })
}