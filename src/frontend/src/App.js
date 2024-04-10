import './App.css';
import LandingPage from "./landingPage/LandingPage";
import {Route, Routes} from "react-router-dom";
import Missing from "./utils/Missing";
import AdminLayout from "./layout/AdminLayout";
import Cows from "./admin/cows/Cows";
import Production from "./admin/production/Production";
import SingleCow from "./admin/cows/SingleCow";
import Breeds from "./admin/breeds/Breeds";
import Livestock from "./admin/livestock/Livestock";

function App() {
    return (
        <>

            <Routes>
                <Route path="/" element={<LandingPage/>}>

                </Route>
                <Route path="*" element={<Missing/>}/>
                <Route path="/admin" element={<AdminLayout/>}>
                    <Route path="cows" element={<Cows/>}/>
                    <Route path="production" element={<Production/>}/>
                    <Route path=":cattleId" element={<SingleCow/>}/>
                    <Route path="breeds" element={<Breeds/>}/>
                    <Route path="livestock" element={<Livestock/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
