import './App.css';
import {Route, Routes} from "react-router-dom";
import CattleFn from "@/pages/cattle/Cattle";
import AdminLayout from "@/layout/Layout";
import BreedsFn from "@/pages/breeds/Breeds";
import LiveStockFn from "@/pages/livestock/Livestock";
import FeedsTypesFn from "@/pages/feedsTypes/FeedsType";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AdminLayout/>}>
                    <Route path="cattle" element={<CattleFn/>}/>
                    <Route path="breeds" element={<BreedsFn/>}/>
                    <Route path="livestock" element={<LiveStockFn/>}/>
                    <Route path="feedsTypes" element={<FeedsTypesFn/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
