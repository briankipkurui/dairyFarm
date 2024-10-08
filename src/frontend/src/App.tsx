import './App.css';
import {Route, Routes} from "react-router-dom";
import CattleFn from "@/pages/cattle/Cattle";
import AdminLayout from "@/layout/Layout";
import BreedsFn from "@/pages/breeds/Breeds";
import LiveStockFn from "@/pages/livestock/Livestock";
import FeedsTypesFn from "@/pages/feedsTypes/FeedsType";
import FeedingFormulasFn from "@/pages/feedingFormulas/FeedingFormulas";
import FeedingRecordsFn from "@/pages/feedingRecords/FeedingRecords";
import IncomeTypeFn from "@/pages/incomeTypes/IncomeTypes";
import ExpenseTypeFn from "@/pages/expenseTypes/ExpenseTypes";
import IncomesFn from "@/pages/income/Incomes";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AdminLayout/>}>
                    <Route path="cattle" element={<CattleFn/>}/>
                    <Route path="breeds" element={<BreedsFn/>}/>
                    <Route path="livestock" element={<LiveStockFn/>}/>
                    <Route path="feedsTypes" element={<FeedsTypesFn/>}/>
                    <Route path="feedingFormulas" element={<FeedingFormulasFn/>}/>
                    <Route path="feedingRecords" element={<FeedingRecordsFn/>}/>
                    <Route path="incomeTypes" element={<IncomeTypeFn/>}/>
                    <Route path="expenseTypes" element={<ExpenseTypeFn/>}/>
                    <Route path="incomes" element={<IncomesFn/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
