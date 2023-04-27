import TemplateList from "../../component/templateList.js";
import { push } from "../../router.js";
import { request } from "../../api.js";
import Header from "../../component/header.js";

export default function TemplateListPage({
  $target
}) {

  const $body = document.createElement('div');
    $body.className = 'body';
    
  const memberId = sessionStorage.getItem('memberId');

  const $page = document.createElement('div');
  $page.className = 'page';

  const $h2 = document.createElement('h2');
  $h2.innerText = 'Template List';
  $h2.setAttribute("class", 'list-title');

  const templateList = new TemplateList({
    $target: $page,
    initialState: [],
    type: "TemplateList"
  });

  const loginedId = sessionStorage.getItem("memberId");

  this.setState = async () => {
    const templates = await request(`/api/v1/templates/${loginedId}`);
    console.log(templates)
    templateList.setState(templates.data);
    this.render();
  }

  const $buttonDiv = document.createElement('div');
  $buttonDiv.className = 'createTemplateBtnDiv';

  const $createTemplate = document.createElement('button');
  $createTemplate.innerText = "create template";
  $createTemplate.setAttribute("class", "createTemplate-btn");

  this.render = async () => {
    new Header({
      $target 
    });
    $body.appendChild($h2);

    $buttonDiv.appendChild($createTemplate);
    $body.appendChild($buttonDiv);
    $body.appendChild($page);
    $target.appendChild($body);

  }
  
  $createTemplate.addEventListener('click', (e) => {
    e.preventDefault();
    push('/template/preset');
  });
}