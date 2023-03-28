import Header from "../../component/header.js";
import Category from "../../component/category.js";
import { request } from "../../api.js";
import Question from "../../component/question.js";
import AddCss from "../../component/addCss.js";

export default function CreateQuestions({ $target, initialState }){
    new AddCss({
        href: "./src/page/CreateQuestions/createQuestions.css"
    });

    const memberId = localStorage.getItem('memberId');
    const $categoryListDiv = document.createElement('div');
    $categoryListDiv.id = "categoryListDiv";

    const $questionListDiv = document.createElement('div');
    $questionListDiv.id = "questionListDiv";

    this.state = initialState;
    const $selectedListDiv = document.createElement('div');
    $selectedListDiv.id = "selectedListDiv";

    $selectedListDiv.innerHTML = `
        <p>[Selected Questions]</p>
    `
    const $selectedList = document.createElement('ol');
    $selectedList.id = "selectedList";
    $selectedListDiv.appendChild($selectedList);

    const $createButton = document.createElement('button');
    $createButton.textContent = "Create Template!";
    $createButton.id = "createButton";
    
    const categoryId = sessionStorage.getItem('selectedCategory');

    this.setState = async () => {
        const questions = await request(`/api/v1/questions/contents/questionCategoryIdAndAccessId?questionCategoryId=${categoryId}&accessId=root`);

        this.state = questions.data;
        this.render();
    }
    
    const header = new Header({ $target });
    
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
        new AddCss({
            href: "./page/CreateQuestions/createQuestions.css"
        });

        new Header({
            $target
        });

        const questionList = new Question({
            $target: $questionListDiv,
            initialState: this.state
        }).render()
        
        $target.appendChild($categoryListDiv);
        $target.appendChild($questionListDiv);
        $target.appendChild($selectedListDiv);
        $target.appendChild($createButton);
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

            const questions = await request(`/api/v1/questions/contents/questionCategoryIdAndAccessId?questionCategoryId=${buttonDataset.categoryid}&accessId=root`);

            $questionListDiv.innerHTML = "";

            this.state = questions.data;
            new Question({
                $target: $questionListDiv,
                initialState: this.state
            }).render()
        }
    });

    $createButton.addEventListener('click', async (e) => {
        e.preventDefault();

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
                "templateName": "임시 제목",
                "isPublic": true
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
        
    })
}