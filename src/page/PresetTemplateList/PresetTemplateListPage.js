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
    href: "./src/page/PresetTemplateList/presetTemplateListPage.css"
  });


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

  const $h2 = document.createElement('h2');
  $h2.innerText = '<Preset Template List>';
  $h2.setAttribute("class", 'preset-title');

  const $createOwnTemplate = document.createElement('button');
  $createOwnTemplate.innerText = "create own template";
  $createOwnTemplate.setAttribute("id", "createOwnTemplate");
//  $createOwnTemplate.classList.add("create-tmp-btn");

  const $link = document.createElement('link');
  $link.setAttribute('rel', 'stylesheet');
  $link.setAttribute('href', './src/page/PresetTemplateListPage/presetTemplateListPage.css');
  this.render = async () => {
//    document.head.appendChild($link);
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