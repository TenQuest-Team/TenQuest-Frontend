import Login from "./page/Login/login.js";
import HomePage from "./page/HomePage.js";
import SignUp from "./page/SignUp/signUp.js";
import FindID from "./page/FindID/findID.js";
import FindPW from "./page/FindPW/findPW.js";
import Header from "./component/header.js";
import Home from "./page/Home/home.js";
import CreateTemplatePreset from "./page/CreateTemplate/createTemplatePreset.js";
import Category from "./component/category.js";
import CreateQuestions from "./page/CreateQuestions/createQuestions.js";
import FinishSubmitAnswer from "./page/FinishSubmitAnswer/finishSubmitAnswer.js";
import ViewAnswers from "./page/ViewAnswers/viewAnswers.js";
/*
export default function App({ $target }){
    
    new Login({
        $target
    });
    

    /*
    const data = [
        {
            templateName: "답 해주삼",
            time: "2023-02-15"
        },
        {
            templateName: "바보들",
            time: "2023-02-10"
        }
    ];

    new Home({
        $target,
        initialState: data
    });
    */

    /*
    const data = [
        {
            presetName: "For Friends"
        },
        {
            presetName: "For IceBreaking"
        },
        {
            presetName: "For Business Members"
        }
    ];

    new CreateTemplatePreset({
        $target,
        initialState: data
    });
    */

    /*
    const data = [
        {
            question: "내 mbti 뭐게?"
        },
        {
            question: "나의 어떤 성격이 좋아?"
        },
        {
            question: "나 소심해?"
        }
    ]

    new CreateQuestions({
        $target,
        initialState: data
    })
    */

    /*
    const data = [
        {
            nickName: '메롱',
            time: '2023-02-23'
        },
        {
            nickName: '누구게',
            time: '2023-02-20'
        },
        {
            nickName: '안녕!!',
            time: '2023-02-10'
        }
    ];

    new ViewAnswers({
        $target,
        initialState1: data,
    })
}*/

export default function App({ $target }){
    const homePage = new HomePage({$target});
    const loginPage = new Login({$target});
    
    this.route = () => {

        const { pathname } = location;

        $target.innerHTML = '';
        if(pathname === '/'){
            loginPage.render();
        }
        else if(pathname.indexOf('/login') > -1) {
            loginPage.render();
        }
    }

    this.init = () => {
        this.route();
    }

    window.addEventListener('click', e => {
        if(e.target.className === 'link'){
            e.preventDefault();
            let href;
            if(e.target.tagName === 'BUTTON'){
                href = e.target.dataset.href;
            } else{
                href = e.target.href;
            }
            history.pushState(null, null, href.replace(location.origin, ''));
            this.route();
        }
    })

    window.addEventListener('popstate', () => this.route());

    this.init();
}