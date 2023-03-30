import TemplateList from "../../component/templateList.js";
import { push } from "../../router.js";
import { request } from "../../api.js";
import Header from "../../component/header.js";

export default function TemplateListPage({
  $target
}) {

  const $body = document.createElement('div');
    $body.class = 'body';
    
  const memberId = sessionStorage.getItem('memberId');

  const $page = document.createElement('div');
  $page.className = 'templateListPage';


  const templateList = new TemplateList({
    $target: $page,
    initialState: [],
    type: "TemplateList"
  });

  this.setState = async () => {
    const templates = await request(`/api/v1/templates/6552920f34e2495eb1d71e213366993c`);
    console.log(templates)
    templateList.setState(templates.data);
    this.render();
  }

  const $buttonDiv = document.createElement('div');
  $buttonDiv.className = 'createTemplateBtnDiv';

  const $createTemplate = document.createElement('button');
  $createTemplate.innerText = "create template";
  $createTemplate.setAttribute("id", "createTemplate");

  this.render = async () => {
    new Header({
      $target 
    });
    $body.appendChild($page);

    $buttonDiv.appendChild($createTemplate);
    $body.appendChild($buttonDiv);
    $target.appendChild($body);

  }
  
  $createTemplate.addEventListener('click', (e) => {
    e.preventDefault();
    history.replaceState(null, null, '/template/preset')
    push('/template/preset');
  });
}