import Header from "../../component/header.js";

export default function Home({ $target, initialState }) {


    new Header({
        $target
    });

    const $templateList = document.createElement('div');
    $target.appendChild($templateList);

    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        $templateList.innerHTML = `
            <button> Create New Template </button>
            <ul>
                ${this.state.map(({templateName, time}) => `<li>${templateName}<span></span>${time}</li>`).join('')}
            </ul>         
        `;
    }

    this.render();
}