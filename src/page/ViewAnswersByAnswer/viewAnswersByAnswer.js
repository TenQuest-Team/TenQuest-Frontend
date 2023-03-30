import Header from "../../component/header.js";
import Category from "../../component/category.js";
import { request } from "../../api.js";
import AddCss from "../../component/addCss.js";
import { push } from "../../router.js";

export default function ViewAnswersByAnswer({$target, initialState }){
    const $body = document.createElement('div');
    $body.class = 'body';
    $target.appendChild = $body;
    
    const $answerListDiv = document.createElement('div');

    const memberId = sessionStorage.getItem("memberId");
    this.state = initialState;

    const $answerList = document.createElement('ul');
    $answerListDiv.appendChild($answerList);

    let questionContent = '';
    const questionContentList = [];
    this.setState = async nextState => {
        const answerDoc = await request(`/api/v1/answers/replyerId?value=${nextState}`)
        this.state = answerDoc.data;

        const templateDoc = await(request(`/api/v1/templates/template-id?value=${sessionStorage.getItem('templateId')}`))
        const templateDocList = templateDoc.data.templateDocList;
        if(templateDocList){
            templateDocList.map(({questionContent}) => 
                questionContentList.push(questionContent)
            );
        }
        this.render();
    }

    const $h2 = document.createElement('h2');
    let count = 0;
    this.render = () => {
        new Header({
            $target
        });
    
        console.log(questionContentList)
        $h2.innerText = sessionStorage.getItem('replyerName');
        $target.appendChild($h2); 
           
        
        this.state.map( ({answerContent}) => {
            const $li = document.createElement('li');
            $li.innerText = `
                Q. ${questionContentList[count++]}
                A. ${answerContent}
            `;
            $answerList.appendChild($li);
            return
        })
        
        console.log($answerList)
        $target.appendChild($answerListDiv);
    }
}