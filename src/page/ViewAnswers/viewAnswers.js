import Header from "../../component/header.js";
import Category from "../../component/category.js";
import { request } from "../../api.js";
import AddCss from "../../component/addCss.js";

export default function ViewAnswers({$target, initialState }){
    new AddCss({
        href: "./src/page/ViewAnswers/viewAnswers.css"
    });
    
    const $answerListDiv = document.createElement('div');

    const memberId = localStorage.getItem("memberId");
    this.state = initialState;

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

        const $answerList = document.createElement('ul');
        $answerListDiv.appendChild($answerList);

        this.state.map(async ({questionId}) => {
            const questionContent = await request(`/api/v1/questions/content/questionId?value=${questionId}`);
            const $li = document.createElement('li');
            $li.innerText = questionContent.data;
            $answerList.appendChild($li);
        })

        $target.appendChild($answerListDiv);
    }
}