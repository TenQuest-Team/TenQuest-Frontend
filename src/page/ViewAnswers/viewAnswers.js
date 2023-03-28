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

    const memberId = localStorage.getItem("memberId");
    this.state = initialState;

    const $answerList = document.createElement('ul');
    $answerListDiv.appendChild($answerList);
//        const templateDoc = await request(`/api/v1/templates/${memberId}/template-id?value=${nextState}`)

    this.setState = async nextState => {
        const replyerDoc = await request(`/api/v1/answers/replyerNames/templateId?value=${nextState}`)
        this.state = replyerDoc.data;
        this.render();
    }

    const $category1 = document.createElement('button');
    $category1.setAttribute("data-categoryId", "1");
    $category1.className = "categories";
    $category1.innerText = '성격';

    const $category2 = document.createElement('button');
    $category2.setAttribute("data-categoryId", "2");
    $category2.className = "categories";
    $category2.innerText = '외모';
    
    this.render = () => {
        new Header({
            $target
        });
    
        /*
        new Category({
            $target,
            initialState: [
                {
                    categoryName: 'Answers',
                    categoryId: 1
                },
                {
                    categoryName: 'Questions',
                    categoryId: 2
                }
            ]
        }).render();
        */

        this.state.map(({replyerId, replyerName}) => {
            const $li = document.createElement('li');
            $li.setAttribute('class', 'replyerList');
            $li.setAttribute('data-replyerId', replyerId);
            $li.innerText = replyerName;
            $answerList.appendChild($li);
        })

        $target.appendChild($answerListDiv);
    }

    $answerList.addEventListener('click', e => {
        const $question = e.target.closest('.template-doc-questions');
        const dataset = $question.dataset;

        if($question){
            push(`/view/${dataset.templatedocid}/${dataset.questionid}`);
        }
    })
}