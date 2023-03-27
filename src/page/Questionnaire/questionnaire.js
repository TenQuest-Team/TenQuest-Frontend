import AddCss from "../../component/addCss.js";

export default function Questionnaire({$target, initialState}){
    new Header({
        $target
    });

    const $filterDiv = document.createElement('div');
    $target.appendChild($filterDiv);

    const $answerListDiv = document.createElement('div');
    $target.appendChild($answerListDiv);

    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }
    this.render = () => {

    }

    this.render();
}