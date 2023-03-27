import { request } from "../api.js";

export default function Category({ $target }){
    const $categoryDiv = document.createElement('div');
    $target.appendChild($categoryDiv);
    $categoryDiv.id = "categoryDiv";

    const $head = document.getElementsByTagName('head')[0];
    const $link = document.createElement('link');
    $link.href = "./src/component/category.css";
    $link.rel = "stylesheet";
    $head.appendChild($link);

    this.render = async () => {
        const categoryData = await request(`/api/v1/categories`);
        const categories = categoryData.data;
        
        if(categories) {
            $categoryDiv.innerHTML = `
                ${categories.map(({ categoryName, categoryId }) => `
                    <button id="${categoryId}" class="category">${categoryName}</button>
                `).join('')}
            `;
        }
    }

    //this.render();
}