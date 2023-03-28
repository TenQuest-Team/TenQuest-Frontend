import { request } from "../api.js";
import AddCss from "./addCss.js";
import { push } from "../router.js";

export default function Category({ $target, initialState }){
    const $categoryDiv = document.createElement('div');
    $target.appendChild($categoryDiv);
    $categoryDiv.id = "categoryDiv";

    new AddCss({
        href: "./src/component/category.css"
    });

    this.state = initialState;

    if(this.state !== []){
        console.log("umm")
        this.render = () => {
            $categoryDiv.innerHTML = `
                ${this.state.map(({ categoryName, categoryId }) => `
                    <button data-categoryId="${categoryId}" class="categories">${categoryName}</button>
                `).join('')}
            `;
        }
    }
        /*
    } else {
        console.log("e")
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
*/
    $categoryDiv.addEventListener('click', e => {
        const $category = e.target.closest('.categories');
        const categoryDataset = $category.dataset
        if($category){
          sessionStorage.setItem('selectedCategory', categoryDataset.categoryid);
          push('/createNewTemplate');
        }
    });
}