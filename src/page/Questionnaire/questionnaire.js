import AddCss from "../../component/addCss.js";
import Header from "../../component/header.js";
import { request } from "../../api.js";

export default function Questionnaire({$target, initialState}){
    

    const $questionListDiv = document.createElement('div');

    this.state = initialState;

    this.setState = async nextState => {
        const questions = await request(`/api/v1/templates/template-id?value=${nextState}`);
        this.state = questions.data;
        console.log(this.state.templateDocList)
        this.render();
    }

    this.render = () => {
        new Header({
            $target
        });

        $questionListDiv.innerHTML = `
            <ul>
                ${this.state.templateDocList.map(async ({ questionId }) => {
                    //const questionContent = await request(`/api/v1/questions/content/questionId?value=${questionId}`);
                    
                    return `
                        <li>
                            <label><p>umm</p></label>
                            <input type="text" data-questionId="${questionId}">
                        </li>
                    `
                }).join('')}
            </ul>
        `
        console.log($questionListDiv)
        $target.appendChild($questionListDiv);
    }
}