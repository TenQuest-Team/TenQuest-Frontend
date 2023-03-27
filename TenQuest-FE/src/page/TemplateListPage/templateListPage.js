import TemplateList from "../../component/templateList.js";
import { push } from "../../router.js";
import { request } from "../../api.js";
import Header from "../../component/header.js";

export default function TemplateListPage({
  $target
}) {
  const memberId = localStorage.getItem('memberId');
  const $page = document.createElement('div');

  const templateList = new TemplateList({
    $target: $page,
    initialState: [],
    type: "TemplateList"
  });

  this.setState = async () => {
    console.log(memberId)
    const templates = await request(`/api/v1/templates?member-id=${memberId}`);
    templateList.setState(templates.data);
    this.render();
  }

  const $createTemplate = document.createElement('button');
  $createTemplate.innerText = "create template";
  $createTemplate.setAttribute("id", "createTemplate");

  this.render = async () => {
    new Header({
      $target 
    });
    $target.appendChild($createTemplate);
    $target.appendChild($page);
  }
  
  $createTemplate.addEventListener('click', (e) => {
    e.preventDefault();
    history.replaceState(null, null, '/template/preset')
    push('/template/preset');
  })
}