import Header from "../../component/header.js";
import Category from "../../component/category.js";

export default function ViewAnswers({$target, initialState1}){
    new Header({
        $target
    });

    new Category({
        $target,
        initialState: [
            {
                categoryName: 'Answers',
                categoryID: 1
            },
            {
                categoryName: 'Questions',
                categoryID: 2
            }
        ]
    })
    
    const $answerListDiv = document.createElement('div');
    $target.appendChild($answerListDiv);

    
    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        $answerListDiv.innerHTML = `
            <ul>
                ${this.state.map(({nickName, time}) => 
                    `<li>${nickName} || ${time}</li>`
                ).join('')}
            </ul>
        `
    }

    this.render();
}