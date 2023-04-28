import Header from "../../component/header.js";
import Category from "../../component/category.js";
import { request } from "../../api.js";
import Question from "../../component/question.js";
import { push } from "../../router.js";

export default function CreateQuestions({ $target, initialState }){
    const $body = document.createElement('div');
    $body.className = 'body';
    
    const memberId = sessionStorage.getItem('memberId');
    const userId = sessionStorage.getItem('userId');

    const $categoryListDiv = document.createElement('div');
    $categoryListDiv.className = "categoryListDiv";

    const $questionListDiv = document.createElement('div');
    $questionListDiv.id = "questionListDiv";

    const $questionList = document.createElement('ul');
    $questionList.id = "questionList";
    $questionListDiv.appendChild($questionList);

    this.state = initialState;
    const $selectedListDiv = document.createElement('div');
    $selectedListDiv.id = "selectedListDiv";

    $selectedListDiv.innerHTML = `
        <p id="selectedDivTitle">[Selected Questions]</p>
        <button id="create-private-question">
            new question
        </button>
    `
    const $selectedList = document.createElement('ol');
    $selectedList.id = "selectedList";
    $selectedListDiv.appendChild($selectedList);

    const $createButton = document.createElement('button');
    $createButton.textContent = "Create Template!";
    $createButton.id = "createButton";
    
    const $modal = document.createElement('div');
    $modal.className = "modal hidden";

    const createTemplateModal = `
        <p><strong>Create Your Own Template!</strong></p>
        <label for="newTemplateTitle"><p>템플릿 제목을 입력해주세요.</p></label>
        <input id="newTemplateTitle" type="text">
        <br>
        <br>
        <input id="checkIsPublic" type="checkbox">
        <label for="checkIsPublic">템플릿 비공개</label>
        <br>
        <br>
        <button class="createSubmitBtn">템플릿 생성하기</button>
        <button class="closeBtn">닫기</button>
    `

    const createPrivateQuestionModal = `
        <p><strong>Create Your Own Question!</strong></p>
        <input class="newPrivateQuestion" type="text" placeholder="질문을 작성해주세요.">
        <br>
        <br>
        <button class="createQuestionBtn">질문 생성하기</button>
        <button class="closeBtn">닫기</button>
    `
    $questionListDiv.appendChild($modal);
    
    let presetQuestions = [];
    this.setState = async () => {
        const presetId = sessionStorage.getItem("presetId");

        const questions = await request(`/api/v1/questions/contents/questionCategoryIdAndAccessId?questionCategoryId=1&accessId=root`);

        this.state = questions.data;

        if(presetId !== null) {
            const presetQuestionsRes = await request(`/api/v1/presets/preset-id?value=${presetId}`);
            presetQuestions = presetQuestionsRes.data.presetDocList;
            console.log(presetQuestions)
        }
        
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

    const $category4 = document.createElement('button');
    $category4.setAttribute("data-categoryId", "0");
    $category4.setAttribute("class", "categories");
    $category4.innerText = '사용자 생성';

    $categoryListDiv.appendChild($category1);
    $categoryListDiv.appendChild($category2);
    $categoryListDiv.appendChild($category3);
    $categoryListDiv.appendChild($category4);

    this.render = () => {

        new Header({
            $target
        });

        new Question({
            $target: $questionList,
            initialState: this.state,
            selectedPreset: false
        }).render()
        $category1.style.backgroundColor = '#D3CFF8';
        $category1.style.color = 'white';

        new Question({
            $target: $selectedList,
            initialState: presetQuestions,
            selectedPreset: true
        }).render();

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
                $li.setAttribute("id", `selected_${$input.id}`);
                $li.setAttribute("class", "selectedQuestion");
                $li.innerHTML = `${$input.value} <button class="deleteQuestion"><img src="/Icons/Style=Filled.png"></button>
                `;
                $selectedList.appendChild($li) 
                console.log($li)
            } else{
                const element = $selectedList.querySelector(`li[id="selected_${$input.id}"]`);
                $selectedList.removeChild(element);
                $input.checked = false;
            }
        }
    });

    let privateQuestionArr = [];
    $selectedListDiv.addEventListener('click', async e => {
        e.preventDefault();

        const $deletebutton = e.target.closest('.deleteQuestion');
        const $clickedButton = e.target;

        if($deletebutton){
            console.log($deletebutton.parentNode)
            const deleteQuestionId = $deletebutton.parentNode.id;
            const deleteQuestionClass = $deletebutton.parentNode.className;
            const element = $selectedList.querySelector(`li[id="${deleteQuestionId}"]`);
            $selectedList.removeChild(element);
            if(deleteQuestionClass === "selectedQuestion") {
                $questionListDiv.querySelector(`input[id="${deleteQuestionId.split('_')[1]}"]`).checked = false;
            } else {
                console.log(deleteQuestionId)
                await request(`/api/v1/questions/question-id?value=${deleteQuestionId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        }

        if($clickedButton.id === "create-private-question") {
            $modal.innerHTML = `
                <div class="bg"></div>
                <div class="modalBox">
                    ${createPrivateQuestionModal}
                </div>  
            `;

            if(document.querySelector('.modal')){

                document.querySelector('.modal').classList.remove("hidden");
            }
            
            document.querySelector('.closeBtn').addEventListener('click', () => {
                console.log('x')
                document.querySelector('.modal').classList.add("hidden");
            });

            const $createQuestionBtn = $modal.querySelector('.createQuestionBtn');
            const $inputPrivateQuestion = $modal.querySelector('.newPrivateQuestion');
            $inputPrivateQuestion.focus();

            $createQuestionBtn.addEventListener('click', async () => {
                const createQuestionRes = await request('/api/v1/questions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        questionContent: $inputPrivateQuestion.value,
                        questionCreatedBy: memberId
                    })
                })

                const $li = document.createElement('li');
                $li.setAttribute("class", "selectedQuestion");
                $li.id = `selected_${createQuestionRes.data.questionId}`;
                $li.innerHTML = `${$inputPrivateQuestion.value} <button class="deleteQuestion"><img src="/Icons/Style=Filled.png"></button>
                `;
                $selectedList.appendChild($li);

                document.querySelector('.modal').classList.add("hidden");
            })
        }
    });

    $categoryListDiv.addEventListener('click', async (e) => {
        e.preventDefault();

        const button = e.target.closest('.categories');
        const buttonDataset = button.dataset;
        
        
        if(button){
            if(buttonDataset.categoryid === '1'){
                $category1.style.backgroundColor = '#D3CFF8';
                $category2.style.backgroundColor = '#eee';
                $category3.style.backgroundColor = '#eee';
                $category4.style.backgroundColor = '#eee';

                $category1.style.color = 'white';
                $category2.style.color = 'black';
                $category3.style.color = 'black';
                $category4.style.color = 'black';
            } else if(buttonDataset.categoryid === '2'){
                $category1.style.backgroundColor = '#eee';
                $category2.style.backgroundColor = '#D3CFF8';
                $category3.style.backgroundColor = '#eee';
                $category4.style.backgroundColor = '#eee';

                $category1.style.color = 'black';
                $category2.style.color = 'white';
                $category3.style.color = 'black';
                $category4.style.color = 'black';
            } else if(buttonDataset.categoryid === '3'){
                $category1.style.backgroundColor = '#eee'; 
                $category2.style.backgroundColor = '#eee';
                $category3.style.backgroundColor = '#D3CFF8';
                $category4.style.backgroundColor = '#eee';

                $category1.style.color = 'black';
                $category2.style.color = 'black';
                $category3.style.color = 'white';
                $category4.style.color = 'black';
            } else if(buttonDataset.categoryid === '0'){
                $category1.style.backgroundColor = '#eee';
                $category2.style.backgroundColor = '#eee';
                $category3.style.backgroundColor = '#eee';
                $category4.style.backgroundColor = '#D3CFF8';

                $category1.style.color = 'black';
                $category2.style.color = 'black';
                $category3.style.color = 'black';
                $category4.style.color = 'white';
            }

            const questions = await request(`/api/v1/questions/contents/questionCategoryIdAndAccessId?questionCategoryId=${buttonDataset.categoryid}&accessId=${buttonDataset.categoryid === "0" ? memberId : 'root'}`);
            console.log(questions)
            $questionList.innerHTML = "";
            $questionListDiv.appendChild($modal);

            this.state = questions.data;

            new Question({
                $target: $questionList,
                initialState: this.state
            }).render()
        }
    });

    $createButton.addEventListener('click', async (e) => {
        $modal.innerHTML = `
            <div class="bg"></div>
            <div class="modalBox">
                ${createTemplateModal}
            </div>  
        `;
        e.preventDefault();

        const createdPrivateQuestions = $selectedList.querySelectorAll('.privateQuestions');
        createdPrivateQuestions.forEach(element => {
            let questionContent = element.innerText;

            privateQuestionArr.push({
                questionContent: questionContent.slice(0, questionContent.length-1),
                questionCreatedBy: memberId
            })
        })

        if(document.querySelector('.modal')){

            document.querySelector('.modal').classList.remove("hidden");
        }
        
        document.querySelector('.closeBtn').addEventListener('click', () => {
            console.log('x')
            document.querySelector('.modal').classList.add("hidden");
        })



        const selectedQuestions = $selectedListDiv.querySelectorAll(".selectedQuestion");
        selectedQuestions.forEach(element => console.log(element))


        document.querySelector('.createSubmitBtn').addEventListener('click', async () => {
            console.log("click!!!!!!!!!!!!")
            const selectedQuestions = $selectedListDiv.querySelectorAll(".selectedQuestion");
            console.log(selectedQuestions)
            const selectedQuestionsArray = [];
            for(let i=0; i<selectedQuestions.length; i++){
                selectedQuestionsArray.push({
                    questionOrder: (i+1),
                    questionId: selectedQuestions[i].id.split('_')[1]
                });
            }
            console.log(selectedQuestionsArray)

            const $newTemplateTitle = document.querySelector('#newTemplateTitle');
            $newTemplateTitle.focus();
            
            const requestBody = {
                templateDto: {
                    templateName: $newTemplateTitle.value,
                    isPublic: !(document.querySelector('#checkIsPublic').checked)
                },
                templateDocList: selectedQuestionsArray
            }   
            
            const createdPost = await request(`/api/v1/templates/${memberId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            },
            "동일한 이름의 템플릿이 존재합니다. 다른 이름을 입력해주세요."
            );

            if(createdPost){
                push(`/shareTemplate/${createdPost.data.templateDto.templateId}`);
            }
        })
    })    
}