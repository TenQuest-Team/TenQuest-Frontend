import { request } from "../../api.js";
import Header from "../../component/header.js";

export default function Login({ $target }) {
    

    const $loginForm = document.createElement("form");
    $loginForm.setAttribute('method', 'post');

    this.render = () => {
        new Header({
            $target 
        });
        
        $loginForm.innerHTML = `
            <label for="user_id">아이디</label>
            <input type = "text" id="user_id" name = "user_id">
            <br>
            <label for="user_pw">비밀번호</label>
            <input type = "text" id="user_pw" name = "user_pw">
            <br>
            <button id="login_btn"> 로그인 </button>
            <button id="find_id_btn"> 아이디 찾기 </button>
            <button id="find_pw_btn"> 비밀번호 찾기 </button>
            <button id="sign_up_btn"> 회원가입 </button>
        `
        $target.appendChild($loginForm);
    }

   // this.render();

    
    fetch(`https://tenquest.run.goorm.site/get/member/userId?value=tester01`,
        {mode: 'no-cors'})
    .then(user => {
        console.log(user);
        return user.json()
    })
    .then(userdata => console.log(userdata)) 
    
   // .then(userJSON => console.log(userJSON));

    
    const $loginButton = document.querySelector('#login_btn');
    //$loginButton.addEventListener('click', checkLogin);
}
/*
function checkLogin() {
    const user_id = document.querySelector('#user_id');
    const fetchOptionData_test = (user_id) => {
        alert(user_id.value);
        return request(`/get/members`)
            .then(user => 
                console.log(user)
            )
    }
    const fetchOptionData = (user_id) => {
        return request(`/products/${productID}`)
            .then(product => {
                this.setState({
                  ...this.setState,
                  product,
                  optionData: [], // 이후에 optionData 새로 불러올 것이기 때문에 그냥 빈 데이터 넣어두기
                  selectedOptions: []
                })
                return request(`/product-options?product.id=${product.id}`)
            })
            .then(productOptions => {
                // product option들을 가지고 재고 조회
                // option 갯수만큼 stock에 대한 요청을 해야 함
                // => Promise.all로 productOptions와 stock 데이터를 한 번에 넘김
                return Promise.all([
                    Promise.resolve(productOptions), // product options
                    Promise.all( // option의 재고 조회
                        productOptions.map(productOption => productOption.id).map(id => {
                            return request(`/product-option-stock?productOption.id=${id}`)
                        })
                    )
                ])
            })
            .then(data => {
                const [ productOptions, stocks ] = data;
                const optionData = productOptions.map((productOption, i) => {
                    const stock = stocks[i][0].stock;
    
                    return {
                        optionId: productOption.id,
                        optionName: productOption.optionName,
                        optionPrice: productOption.optionPrice,
                        stock: stock.stock
                    }
                })
                
                this.setState({
                  ...this.setState,
                  optionData
                })
                productOptionsComponent.setState(optionData);
            })
    
        }
  
        fetchOptionData_test(user_id);
}*/