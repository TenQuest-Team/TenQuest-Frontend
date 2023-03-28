import Login from "./page/Login/login.js";
import HomePage from "./page/HomePage.js";
import SignUp from "./page/SignUp/signUp.js";
import FindID from "./page/FindID/findID.js";
import FindPW from "./page/FindPW/findPW.js";
import Questionnaire from "./page/Questionnaire/questionnaire.js";
import Header from "./component/header.js";
import Home from "./page/Home/home.js";
import Category from "./component/category.js";
import CreateQuestions from "./page/CreateQuestions/createQuestions.js";
import FinishSubmitAnswer from "./page/FinishSubmitAnswer/finishSubmitAnswer.js";
import ViewAnswers from "./page/ViewAnswers/viewAnswers.js";
import { initRouter } from "./router.js";
import TemplateListPage from "./page/TemplateListPage/templateListPage.js";
import PresetTemplateListPage from "./page/PresetTemplateList/PresetTemplateListPage.js";
import ViewAnswersByQuestion from "./page/ViewAnswersByQuestion/viewAnswersByQuestion.js";
import ShareTemplatePage from "./page/ShareTemplatePage/shareTemplatePage.js";

export default function App({ $target }){
    
    
   
    
    this.route = () => {

        const { pathname } = location;
        const loginPage = new Login({$target});
        const findIDPage = new FindID({$target});
        const findPWPage = new FindPW({$target});
        const signUpPage = new SignUp({$target});
        const homePage = new HomePage({$target});
        const templateListPage = new TemplateListPage({$target});
        const presetTemplateListPage = new PresetTemplateListPage({$target});
        const createTemplatePage = new CreateQuestions({
            $target,
            initialState: []
        });
        const viewAnswersPage = new ViewAnswers({
            $target,
            initialState: []
        });
        const viewAnswersByQuestionPage = new ViewAnswersByQuestion({
            $target,
            initialState: []
        });
        const shareTemplatePage = new ShareTemplatePage({$target});
        const questionnairePage = new Questionnaire({$target, initialState: []})

        $target.innerHTML = '';
        if(pathname === '/'){
            homePage.render();
        }
        else if(pathname.indexOf('/login') > -1) {
            loginPage.render();
        } else if(pathname.indexOf('/findID') > -1){
            findIDPage.render();
        } else if(pathname.indexOf('/findPW') > -1) {
            findPWPage.render();
        } else if(pathname.indexOf('/signUp') > -1){
            signUpPage.render();
        } else if(pathname.indexOf('/templates') > -1){
            templateListPage.setState();
        } else if(pathname.indexOf('/template/preset') > -1){
            presetTemplateListPage.setState();
        } else if(pathname.indexOf('/createNewTemplate') > -1) {
            createTemplatePage.setState();
        } else if(pathname.indexOf('/template/') === 0){
            const [,,templateId] = pathname.split('/');
            viewAnswersPage.setState(templateId);
        } else if(pathname.indexOf('/view/') === 0){
            const [,,templateDocId,questionId] = pathname.split('/');
            viewAnswersByQuestionPage.setState({templateDocId, questionId});
        } else if(pathname.indexOf('/shareTemplate') > -1) {
            shareTemplatePage.render();
        } else if(pathname.indexOf('/reply/') === 0) {
            const [,,templateId] = pathname.split('/');
            questionnairePage.setState(templateId);
        }

    }

    this.route();
    initRouter(() => this.route());
    /*
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
*/
    window.addEventListener('popstate', () => this.route());

    
}