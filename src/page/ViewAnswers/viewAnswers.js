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

    this.setState = async nextState => {
        const templateDoc = await request(`/api/v1/templates/${memberId}/template-id?value=${nextState}`)
        this.state = templateDoc.data.templateDocList;
        console.log(this.state)
        this.render();
    }

    this.render = () => {
        new Header({
            $target
        });
    
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
        }).render()

        console.log(this.state)

        this.state.map(async ({questionId, templateDocId}) => {
            const questionContent = await request(`/api/v1/questions/content/questionId?value=${questionId}`);
            const $li = document.createElement('li');
            $li.setAttribute('class', 'template-doc-questions');
            $li.setAttribute('data-questionId', questionId);
            $li.setAttribute('data-templateDocId', templateDocId);
            $li.innerText = questionContent.data;
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