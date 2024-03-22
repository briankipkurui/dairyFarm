import './App.css';
import LandingPage from "./landingPage/LandingPage";
import {Route, Routes} from "react-router-dom";
import Missing from "./utils/Missing";
import AdminLayout from "./layout/AdminLayout";
import Cows from "./admin/cows/Cows";

function App() {
    return (
        <>

            <Routes>
                <Route path="/" element={<LandingPage/>}>

                </Route>
                <Route path="*" element={<Missing/>}/>
                <Route path="/admin" element={<AdminLayout/>}>
                    <Route path="cows" element={<Cows/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
