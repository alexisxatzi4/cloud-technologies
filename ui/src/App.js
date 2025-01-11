import './assets/css/global.css'
import {
  HashRouter,
} from "react-router-dom";
import Header from './components/layout/Header';
import Body from './components/layout/Body';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { AlertProvider } from './components/utils/GlobalAlert';
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
    //https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm
    return (
        <HashRouter>
            <AlertProvider>
                <div className='global'>
                    <Header />
                    <Body />
                </div>
            </AlertProvider>
        </HashRouter>
    );
}

export default App;
