import Header from "../../component/header.js";
import Category from "../../component/category.js";
import { request } from "../../api.js";
import Question from "../../component/question.js";
import { push } from "../../router.js";

export default function CreateQuestions({ $target, initialState }){
    const $body = document.createElement('div');
    $body.className = 'body';
    
    const memberId = sessionStorage.getItem('memberId');
    const $categoryListDiv = document.createElement('div');
    $categoryListDiv.class = "categoryListDiv";

    const $questionListDiv = document.createElement('div');
    $questionListDiv.id = "questionListDiv";

    this.state = initialState;
    const $selectedListDiv = document.createElement('div');
    $selectedListDiv.id = "selectedListDiv";

    $selectedListDiv.innerHTML = `
        <p id="selectedDivTitle">[Selected Questions]</p>
    `
    const $selectedList = document.createElement('ol');
    $selectedList.id = "selectedList";
    $selectedListDiv.appendChild($selectedList);

    const $createButton = document.createElement('button');
    $createButton.textContent = "Create Template!";
    $createButton.id = "createButton";
    
    const $modal = document.createElement('div');
    $modal.className = "modal hidden";

    $modal.innerHTML = `
        <div class="bg"></div>
        <div class="modalBox">
            <p><strong>Create Your Own Question!</strong></p>
            <label for="newTemplateTitle"><p>템플릿 제목을 입력해주세요.</p></label>
            <input id="newTemplateTitle" type="text">
            <br>
            <br>
            <input id="checkIsPublic" type="checkbox">
            <label for="checkIsPublic">템플릿 비공개</label>
            <br>
            <br>
            <button class="createSubmitBtn">템플릿 생성하기</button>
            <button class="closeBtn">✖</button>
        </div>  
    `;

    $questionListDiv.appendChild($modal);
    
    this.setState = async () => {
        const questions = await request(`/api/v1/questions/contents/questionCategoryIdAndAccessId?questionCategoryId=1&accessId=root`);

        this.state = questions.data;
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

    const $category3 = document.createElement('button');
    $category3.setAttribute("data-categoryId", "3");
    $category3.setAttribute("class", "categories");
    $category3.innerText = '인간관계';

    $categoryListDiv.appendChild($category1);
    $categoryListDiv.appendChild($category2);
    $categoryListDiv.appendChild($category3);

    this.render = () => {

        new Header({
            $target
        });

        const questionList = new Question({
            $target: $questionListDiv,
            initialState: this.state
        }).render()
        $category1.style.backgroundColor = '#007bff';

        $body.appendChild($categoryListDiv);
        $body.appendChild($questionListDiv);
        $body.appendChild($selectedListDiv);
        $body.appendChild($createButton);

        $target.appendChild($body);

    } 

    const category = document.getElementsByClassName('questionCategory');
    console.log(category)

    $questionListDiv.addEventListener('click', (e) => {
        const $input = e.target.closest('.question-item');

        if($input){
            const checkStatus = $input.checked;            

            if(checkStatus) {
                const $li = document.createElement('li');
                $li.setAttribute("id", $input.id);
                $li.setAttribute("class", "selectedQuestion");
                $li.innerHTML = `${$input.value} <button class="deleteQuestion">X</button>
                `;
                $selectedList.appendChild($li) 
                console.log($li  )
            } else{
                const element = $selectedList.querySelector(`li[id="${$input.id}"]`);
                $selectedList.removeChild(element);
                $input.checked = false;
            }
        }
    });

    $selectedListDiv.addEventListener('click', e => {
        e.preventDefault();

        const $button = e.target.closest('.deleteQuestion');

        if($button){
            const deleteQuestionId = $button.parentNode.id;
            const element = $selectedList.querySelector(`li[id="${deleteQuestionId}"]`);
            $selectedList.removeChild(element);
            $questionListDiv.querySelector(`input[id="${deleteQuestionId}"]`).checked = false;
        }
    });

    $categoryListDiv.addEventListener('click', async (e) => {
        e.preventDefault();

        const button = e.target.closest('.categories');
        const buttonDataset = button.dataset;
        
        
        if(button){
            if(buttonDataset.categoryid === '1'){
                $category1.style.backgroundColor = '#007bff';
                $category2.style.backgroundColor = '#eee';
                $category3.style.backgroundColor = '#eee';
            } else if(buttonDataset.categoryid === '2'){
                $category1.style.backgroundColor = '#eee';
                $category2.style.backgroundColor = '#007bff';
                $category3.style.backgroundColor = '#eee';
            } else if(buttonDataset.categoryid === '3'){
                $category1.style.backgroundColor = '#eee';
                $category2.style.backgroundColor = '#eee';
                $category3.style.backgroundColor = '#007bff';
            }

            const questions = await request(`/api/v1/questions/contents/questionCategoryIdAndAccessId?questionCategoryId=${buttonDataset.categoryid}&accessId=root`);

            $questionListDiv.innerHTML = "";
            $questionListDiv.appendChild($modal);
            this.state = questions.data;
            new Question({
                $target: $questionListDiv,
                initialState: this.state
            }).render()
        }
    });

    $createButton.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log(document.querySelector('.modal'))
        if(document.querySelector('.modal')){

            document.querySelector('.modal').classList.remove("hidden");
        }
        
        document.querySelector('.closeBtn').addEventListener('click', () => {
            console.log('x')
            document.querySelector('.modal').classList.add("hidden");
        })

        document.querySelector('.createSubmitBtn').addEventListener('click', async () => {
            const selectedQuestions = $selectedListDiv.getElementsByClassName("selectedQuestion");
        
            const selectedQuestionsArray = [];
            for(let i=0; i<selectedQuestions.length; i++){
                selectedQuestionsArray.push({
                    "questionOrder": (i+1),
                    "questionId": selectedQuestions[i].id
                });
            }
            
            const requestBody = {
                "templateDto": {
                    "templateName": document.querySelector('#newTemplateTitle').value,
                    "isPublic": !(document.querySelector('#checkIsPublic').checked)
                },
                "templateDocList": selectedQuestionsArray
            }   
            
            const createdPost = await request(`/api/v1/templates/${memberId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            console.log(createdPost)
            if(createdPost){
                push(`/shareTemplate/${createdPost.data.templateDto.templateId}`);
            }
        })
    })
}