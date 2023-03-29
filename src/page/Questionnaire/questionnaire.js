import AddCss from "../../component/addCss.js";
import Header from "../../component/header.js";
import { request } from "../../api.js";

export default function Questionnaire({$target, initialState}){
    

    const $questionListDiv = document.createElement('ol');

    this.state = initialState;

    this.setState = async nextState => {
        const questions = await request(`/api/v1/templates/template-id?value=${nextState}`);
        this.state = questions.data;
        console.log(this.state.templateDocList)
        this.render();
    }

    const $label = document.createElement('label');
    const $p = document.createElement('p');
    $p.innerText = '닉네임을 입력하세요.';
    const $input = document.createElement('input');
    $input.setAttribute('id', 'enteredNickname');
    $input.setAttribute('type', 'text');
    $label.appendChild($p);

    const $chekcboxIsPublic = document.createElement('input');
    const $checkboxLabel = document.createElement('label');
    $checkboxLabel.innerText = '다른 사용자들에게 답변 비공개';
    $chekcboxIsPublic.setAttribute('id', 'replier_isPublic');
    $chekcboxIsPublic.setAttribute('type', 'checkbox');
    $checkboxLabel.setAttribute('for', 'replier_isPublic');

    const $submitAnswerBtn = document.createElement('button');
    $submitAnswerBtn.innerText = "submit answer";
    $submitAnswerBtn.setAttribute('id', 'submitAnswerBtn');

    this.render = () => {
        new Header({
            $target
        });                    //const questionContent = await request(`/api/v1/questions/content/questionId?value=${questionId}`);

        $target.appendChild($questionListDiv);
        
        /*
        $questionListDiv.innerHTML = `
            <ul>
                ${this.state.templateDocList.map( async({ questionId }) => {
                
                    const questionContent = await request(`/api/v1/questions/content/questionId?value=${questionId}`);
                    if(questionContent){
                        return `
                            <li>
                                <label><p>${questionContent.data}</p></label>
                                <input type="text" data-questionId="${questionId}">
                            </li>
                        `;
                    }
                }).join('')}
            </ul>
        `
        */

        
        $target.appendChild($label);
        $target.appendChild($input);

        this.state.templateDocList.map(async ({questionId}) => {
            const questionContent = await request(`/api/v1/questions/content/questionId?value=${questionId}`);
            const $li = document.createElement('li');
            const $label = document.createElement('label');
            const $p = document.createElement('p');
            $p.innerText = questionContent.data;
            const $input = document.createElement('input');
            $input.setAttribute('data-questionId', questionId);
            $input.setAttribute('type', 'text');
            $label.appendChild($p);
            $li.appendChild($label);
            $li.appendChild($input);
            $questionListDiv.appendChild($li);
            return
        })

        $target.appendChild($questionListDiv);

        $target.appendChild($chekcboxIsPublic);
        $target.appendChild($checkboxLabel);

        $target.appendChild($submitAnswerBtn);
    }
}