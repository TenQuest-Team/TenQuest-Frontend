import TemplateList from "../../component/templateList.js";
import { push } from "../../router.js";
import { request } from "../../api.js";
import Header from "../../component/header.js";

export default function PresetTemplateListPage({
  $target
}) {
  const $page = document.createElement('div');

  const presetTemplateList = new TemplateList({
    $target: $page,
    initialState: [],
    type: "PresetTemplateList"
  });

  this.setState = async () => {
    //const templates = await request(`/presets`);
    //presetTemplateList.setState(templates);
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