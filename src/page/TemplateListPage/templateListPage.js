import TemplateList from "../../component/templateList.js";
import { push } from "../../router.js";
import { request } from "../../api.js";
import Header from "../../component/header.js";
import AddCss from "../../component/addCss.js";

export default function TemplateListPage({
  $target
}) {
  const memberId = sessionStorage.getItem('memberId');
  const $page = document.createElement('div');

  new AddCss({
    href: "./src/page/TemplateListPage/templateListPage.css"
  });

  const templateList = new TemplateList({
    $target: $page,
    initialState: [],
    type: "TemplateList"
  });

  this.setState = async () => {
    const templates = await request(`/api/v1/templates/${memberId}`);
    console.log(templates)
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
    $target.appendChild($page);

    $target.appendChild($createTemplate);
  }
  
  $createTemplate.addEventListener('click', (e) => {
    e.preventDefault();
    history.replaceState(null, null, '/template/preset')
    push('/template/preset');
  });
}