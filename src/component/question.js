export default function Question({ $target, text, id }){
    const $questionDiv = document.createElement('div');
    $target.appendChild($questionDiv);
    $questionDiv.className = "question";

    const $head = document.getElementsByTagName('head')[0];
    const $link = document.createElement('link');
    $link.href = "./component/question.css";
    $link.rel = "stylesheet";
    $head.appendChild($link);

    this.render = () =>{
        $questionDiv.innerHTML = `
            <input type="checkbox" id="${id}" value="${text}>
            <label for="${id}">${text}</label>
        `
    }

    this.render();
}