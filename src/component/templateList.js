import { push } from "../router.js";

export default function TemplateList({
  $target,
  initialState,
  type
}) {
  const $templateList = document.createElement('div');
  $target.appendChild($templateList);

  this.state = initialState;
  this.setState = nextState => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {

    if(type === "TemplateList"){
      console.log(this.state)
      $templateList.innerHTML = `
        <ul>
          ${this.state.map(template => `
            <li id="${template.templateId}" class="templateList">${template.templateName}</li>
          `).join('')}
        </ul>
      `
    } else if(type === "PresetTemplateList") {
      $templateList.innerHTML = `
        <ul>
          ${this.state.map(template => `
            <li id="${template.presetId}">${template.presetName}</li>
          `).join('')}
        </ul>
      `
    }
  } 

  
  $templateList.addEventListener('click', e => {
    const $li = e.target.closest('.templateList');
    console.log($li)
    if($li){
      push(`/template/${$li.id}`);
    }
  });

}