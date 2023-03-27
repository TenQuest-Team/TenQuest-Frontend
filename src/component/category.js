import { request } from "../api.js";

export default function Category({ $target, initialState }){
    const $categoryDiv = document.createElement('div');
    $target.appendChild($categoryDiv);
    $categoryDiv.id = "categoryDiv";

    const $head = document.getElementsByTagName('head')[0];
    const $link = document.createElement('link');
    $link.href = "./src/component/category.css";
    $link.rel = "stylesheet";
    $head.appendChild($link);

    this.state = initialState;

    if(this.state !== []){
        console.log(this.state)
        this.render =  () => {
            $categoryDiv.innerHTML = `
                ${this.state.map(({ categoryName, categoryId }) => `
                    <button id="${categoryId}" class="viewAnswersCategory">${categoryName}</button>
                `).join('')}
            `;
        }
    } else {
        this.render = async () => {
            const categoryData = await request(`/api/v1/categories`);
            const categories = categoryData.data;
            
            if(categories) {
                $categoryDiv.innerHTML = `
                    ${categories.map(({ categoryName, categoryId }) => `
                        <button id="${categoryId}" class="questionCategory">${categoryName}</button>
                    `).join('')}
                `;
            }
        }
    }
}