import Header from "../../component/header.js";
import Category from "../../component/category.js";
import { request } from "../../api.js";
import Question from "../../component/question.js";
import AddCss from "../../component/addCss.js";


export default function CreateQuestions({ $target, initialState }){
    new AddCss({
        href: "./src/page/CreateQuestions/createQuestions.css"
    });

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
    

    this.setState = async () => {
        const questions = await request(`/api/v1/questions`);
        console.log(questions)
        templateList.setState(templates.data);
        this.render();
      }
    
    const header = new Header({ $target });
    const categoryDiv = new Category({
        $target
    });
    const questionList = new Question({
        $target: $questionListDiv,
        initialState: this.state
    })

    this.render = () => {
        new AddCss({
            href: "./page/CreateQuestions/createQuestions.css"
        });

        new Header({
            $target
        });
    
        const categoryDiv = new Category({
            $target,
            initialState: []
        });

        if(categoryDiv.render()){
            $target.appendChild($questionListDiv);
            $target.appendChild($selectedListDiv);
            $target.appendChild($createButton);

            
        }
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
                $li.innerHTML = `${$input.value} <button class="deleteQuestion">X</button>
                `;
                $selectedList.appendChild($li) 
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

    /*
        $createButton.addEventListener('click', (e) => {
            e.preventDefault();
            push('/createNewTemplate');
        });
    */
}