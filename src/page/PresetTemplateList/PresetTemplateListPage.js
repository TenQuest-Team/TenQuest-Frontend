import TemplateList from "../../component/templateList.js";
import { push } from "../../router.js";
import { request } from "../../api.js";
import Header from "../../component/header.js";

export default function PresetTemplateListPage({
  $target
}) {

  const $body = document.createElement('div');
  $body.className = 'body';
    
  const $page = document.createElement('div');
  $page.id = 'presetTemplateListDiv';
  $page.className = 'page';
  
  const $h2 = document.createElement('h2');
  $h2.innerText = 'Preset Template List';
  $h2.setAttribute("class", 'list-title');

  const $createOwnTemplate = document.createElement('button');
  $createOwnTemplate.innerText = "create own template";
  $createOwnTemplate.setAttribute("class", "createTemplate-btn");
  $page.appendChild($h2);
    $page.appendChild($createOwnTemplate);

  const presetTemplateList = new TemplateList({
    $target: $page,
    initialState: [],
    type: "PresetTemplateList"
  });
/*  $target.classList.add('preset-tmp-list');*/

  this.setState = async () => {
    const templates = await request(`/api/v1/presets`);
    presetTemplateList.setState(templates.data);
    this.render();
  }

  
  this.render = async () => {
    new Header({
      $target 
    });
    
    $body.appendChild($page);
    $target.appendChild($body);

  }

  $createOwnTemplate.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('presetId');
    push('/createNewTemplate');
  })
}