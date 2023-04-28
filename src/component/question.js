export default function Question({ $target, initialState, selectedPreset }){
    this.state = initialState;
    
    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    if(!selectedPreset) {
        this.render = () =>{
            $target.innerHTML = `
                ${this.state.map(({ questionId, questionContent }) => `
                <li>
                    <input type="checkbox" id="${questionId}" value="${questionContent}" class="question-item">
                    <label for="${questionId}"> ${questionContent}</label>
                </li>
                `).join('')}
                
            `
        }
    } else {
        this.render = () =>{
            $target.innerHTML = `
                ${this.state.map(({ questionId, questionContent }) => `
                    <li class="selectedQuestion" id="selected_${questionId}">
                        ${questionContent} <button class="deleteQuestion"><img src="/Icons/Style=Filled.png"></button>
                    </li>
                `).join('')}
                
            `
        } 
    }
}