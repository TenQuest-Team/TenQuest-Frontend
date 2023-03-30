import AddCss from "../../component/addCss.js";
import Header from "../../component/header.js";
import { request } from "../../api.js";
import { push } from "../../router.js";

export default function Questionnaire({$target, initialState}){
    const $body = document.createElement('div');
    $body.class = 'body';
    $target.appendChild = $body;

    const $questionnaireDiv = document.createElement('div');
    $questionnaireDiv.id = 'questionnaireDiv';

    const $questionListDiv = document.createElement('div');
    $questionListDiv.id = 'questionListDiv';

    this.state = initialState;
    let templateId = '';
    this.setState = async nextState => {
        templateId = nextState;
        const questions = await request(`/api/v1/templates/template-id?value=${nextState}`);
        this.state = questions.data;
        this.render();
    }

    const $label = document.createElement('label');
    const $p = document.createElement('p');
    $p.innerText = '닉네임을 입력하세요.';
    const $input = document.createElement('input');
    $input.setAttribute('id', 'replyer_Nickname');
    $input.setAttribute('type', 'text');
    $label.appendChild($p);

    const $chekcboxIsPublic = document.createElement('input');
    const $checkboxLabel = document.createElement('label');
    $checkboxLabel.innerText = '다른 사용자들에게 답변 비공개';
    $chekcboxIsPublic.setAttribute('id', 'replyer_isPublic');
    $chekcboxIsPublic.setAttribute('type', 'checkbox');
    $checkboxLabel.setAttribute('for', 'replyer_isPublic');

    const $submitAnswerBtn = document.createElement('button');
    $submitAnswerBtn.innerText = "submit answer";
    $submitAnswerBtn.setAttribute('id', 'submitAnswerBtn');

    const docIdList = [];
    const answerContentList = [];

    this.render = () => {
        new Header({
            $target
        });                    
        $questionListDiv.innerHTML = `
            <ol>
                ${this.state.templateDocList.map(({questionId, questionContent }) => 
                    `
                            <li>
                                <label><p>${questionContent}</p></label>
                                <input type="text" data-questionId="${questionId}">
                            </li>
                        `
                    
                ).join('')}
            </ol>
        `
        this.state.templateDocList.forEach(({templateDocId}) => 
            docIdList.push(templateDocId)
        )

        
        $questionnaireDiv.appendChild($label);
        $questionnaireDiv.appendChild($input);

        $questionnaireDiv.appendChild($questionListDiv);

        $questionnaireDiv.appendChild($chekcboxIsPublic);
        $questionnaireDiv.appendChild($checkboxLabel);

        $questionnaireDiv.appendChild($submitAnswerBtn);

        $body.appendChild($questionnaireDiv);
    }

    $submitAnswerBtn.addEventListener('click', async () => {
        
        const questions = $questionListDiv.getElementsByTagName('input');
        for(let i=0; i<questions.length; i++){
            answerContentList.push(questions[i].value);
        }
        if(answerContentList.length === questions.length){
            console.log(docIdList)
            console.log(document.getElementById('replyer_Nickname').value)
            console.log(answerContentList)
            console.log(!(document.getElementById('replyer_isPublic').checked))
            const requestBody = {
                "docIdList": docIdList,
                "replyerName": document.getElementById('replyer_Nickname').value,
                "answerContentList": answerContentList,
                "isPublic": !(document.getElementById('replyer_isPublic').checked)
            }
            console.log(JSON.stringify(requestBody))
            await request('/api/v1/answers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })

            //e.preventDefault();
            push(`/submitAnswer/${templateId}`);
            
        }
    })
}