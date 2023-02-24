import Header from "../../component/header.js";
import AddCss from "../../component/addCss.js";

export default function CreateTemplatePreset({ $target, initialState }) {
    new AddCss({
        href: "./page/CreateTemplate/createTemplate.css"
    });
    
    new Header({
        $target
    });

    const $presetList = document.createElement('div');
    $target.appendChild($presetList);

    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        $presetList.innerHTML = `
            <button> Create My Own Template </button>
            ${this.state.map(({presetName}) => `
                <div class="preset">
                    <p>${presetName}</p>
                    <button class="btn">?</button>
                </div>
            `).join('')}       
        `;
    }

    this.render();
}

/*
<ul>
                ${this.state.map(({templateName}) => `<li>${templateName}</li>`).join('')}
            </ul> 
            */