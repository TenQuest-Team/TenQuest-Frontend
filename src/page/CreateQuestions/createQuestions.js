import Header from "../../component/header.js";
import Category from "../../component/category.js";
import Question from "../../component/question.js";
import AddCss from "../../component/addCss.js";


export default function CreateQuestions({ $target, initialState }){
    new AddCss({
        href: "./page/CreateQuestions/createQuestions.css"
    });

    new Header({
        $target
    });

    new Category({
        $target,
        initialState: [
            {
                categoryName: "성격",
                cartegoryID: 1
            },
            {
                categoryName: "외모",
                cartegoryID: 2
            },
            {
                categoryName: "사건",
                cartegoryID: 3
            },
            {
                categoryName: "사용자 생성",
                cartegoryID: 4
            }
        ]
    });
/*
    const $head = document.getElementsByTagName('head')[0];
    const $link = document.createElement('link');
    $link.href = "./page/CreateQuestions/createQuestions.css";
    $link.rel = "stylesheet";
    $head.appendChild($link);
*/
    const $questionList = document.createElement('div');
    $target.appendChild($questionList);
    $questionList.id = "questionList";

    this.state = initialState;

    const $selectedList = document.createElement('div');
    $target.appendChild($selectedList);
    $selectedList.id = "selectedList";

    $selectedList.innerHTML = `
        <p>[Selected Questions]</p>
    `

    const $createButton = document.createElement('button');
    $target.appendChild($createButton);
    $createButton.textContent = "Create Template!";
    $createButton.id = "createButton";
    
    this.render = () => {
        this.state.forEach(({ question }, index) => {
            new Question({
                $target: $questionList,
                text: question,
                id: index
            })
        })
    }

    this.render();
    
}

function addSelectedList(){
    
}