export default function Category({ $target, initialState }){
    const $categoryDiv = document.createElement('div');
    $target.appendChild($categoryDiv);
    $categoryDiv.id = "categoryDiv";

    const $head = document.getElementsByTagName('head')[0];
    const $link = document.createElement('link');
    $link.href = "./component/category.css";
    $link.rel = "stylesheet";
    $head.appendChild($link);

    this.state = initialState;

    this.render = () => {

        $categoryDiv.innerHTML = `
            ${this.state.map(({ categoryName, categoryID }) => `
                <button id="${categoryID}"class="category">${categoryName}</button>
            `).join('')}
        `;
    }

    this.render();
}