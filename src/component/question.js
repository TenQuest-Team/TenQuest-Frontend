export default function Question({ $target, initialState }){
    const $questionList = document.createElement('ul');
    $questionList.setAttribute("id", "questions");
    $target.appendChild($questionList);
    
    this.state = initialState;

    console.log(initialState)
    /*
    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }
*/
    this.render = () =>{
        $questionList.innerHTML = `
            ${this.state.map(({ questionId, questionContent }) => `
            <li>
                <input type="checkbox" id="${questionId}" value="${questionContent}" class="question-item">
                <label for="${questionId}"> ${questionContent}</label>
            </li>
            `).join('')}
            
        `
    }
}