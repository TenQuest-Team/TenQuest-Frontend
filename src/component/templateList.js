import { push } from "../router.js";
import AddCss from "./addCss.js";

export default function TemplateList({
  $target,
  initialState,
  type
}) {
  const $templateList = document.createElement('div');
  $templateList.id = 'templateListDiv'
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
        <ul id="templateListUl">
          ${this.state.map(template => `
            <li id="${template.templateId}" class="templateList"><p class="templateName">${template.templateName}</p><p class="createdAt">${template.createdAt.split('T')[0]}</p></li>
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
      sessionStorage.setItem('templateId', $li.id)
      push(`/template/${$li.id}`);
    }
  });

}