import TemplateList from "../../component/templateList.js";
import { push } from "../../router.js";
import { request } from "../../api.js";
import Header from "../../component/header.js";
import AddCss from "../../component/addCss.js";

export default function PresetTemplateListPage({
  $target
}) {
  const $page = document.createElement('div');

  new AddCss({
    href: "./src/page/PresetTemplateListPage/presetTemplateListPage.css"
  });

  const presetTemplateList = new TemplateList({
    $target: $page,
    initialState: [],
    type: "PresetTemplateList"
  });

  this.setState = async () => {
    const templates = await request(`/api/v1/presets`);
    presetTemplateList.setState(templates.data);
    this.render();
  }

  const $h2 = document.createElement('h2');
  $h2.innerText = '<Preset Template List>';

  const $createOwnTemplate = document.createElement('button');
  $createOwnTemplate.innerText = "create own template";
  $createOwnTemplate.setAttribute("id", "createOwnTemplate");

  this.render = async () => {
    new Header({
      $target 
    });
    $target.appendChild($h2);
    $target.appendChild($createOwnTemplate);
    $target.appendChild($page);
  }

  $createOwnTemplate.addEventListener('click', (e) => {
    e.preventDefault();
    push('/createNewTemplate');
  })
}