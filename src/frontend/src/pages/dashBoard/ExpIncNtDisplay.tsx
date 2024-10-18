import {TrendingDown, TrendingUp} from "lucide-react";
import {useCallback, useEffect, useState} from "react";
import {getEachValueChainExpense, getEachValueChainIncome, getNetProfit} from "@/apiCalls/apiCalls";
import {EachValueChainExpense, eachValueChainIncomes, NetProfit} from "@/pages/types/Types";

const ExpIncNtDisplay = () => {
    const [eachValueChainIncome, setEachValueChainIncome] = useState([])
    const [eachValueChainExpense, setEachValueChainExpense] = useState([])
    const [netProfit, setNetProfit] = useState([])


    const fetchValueChains = useCallback(async () => {
        try {
            const res = await getEachValueChainIncome();
            const data = await res.json();
            setEachValueChainIncome(data);
        } catch (err) {
            console.error("Error fetching breeds:", err);
        }
    }, []);

    useEffect(() => {
        fetchValueChains();
    }, [fetchValueChains]);

    const fetchEachValueChainExpense = useCallback(async () => {
        try {
            const res = await getEachValueChainExpense();
            const data = await res.json();
            setEachValueChainExpense(data);
        } catch (err) {
            console.error("Error fetching breeds:", err);
        }
    }, []);

    useEffect(() => {
        fetchEachValueChainExpense();
    }, [fetchEachValueChainExpense]);


    const fetchNetProfit = useCallback(async () => {
        try {
            const res = await getNetProfit();
            const data = await res.json();
            console.log("this is the data.....",data)
            setNetProfit(data);
        } catch (err) {
            console.error("Error fetching breeds:", err);
        }
    }, []);

    useEffect(() => {
        fetchNetProfit();
    }, [fetchNetProfit]);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Income Card */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-700">Incomes</h2>
                    <div className="mt-4">
                        {eachValueChainIncome.map((income: eachValueChainIncomes) => (
                            <div key={income.valueChainId} className="flex justify-between items-center py-2">
                                <p className="text-sm text-gray-700">{income.valueChain}</p>
                                <p className="text-sm font-semibold text-green-500">Ksh {income.amount.toLocaleString()}</p>
                                <TrendingUp className="w-5 h-5 text-green-500 ml-2"/>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Expense Card */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-700">Expenses</h2>
                    <div className="mt-4">
                        {eachValueChainExpense.map((eachValueChainExpense: EachValueChainExpense) => (
                            <div key={eachValueChainExpense.valueChainId}
                                 className="flex justify-between items-center py-2">
                                <p className="text-sm text-gray-700">{eachValueChainExpense.valueChain}</p>
                                <p className="text-sm font-semibold text-green-500">Ksh {eachValueChainExpense.amount.toLocaleString()}</p>
                                <TrendingDown className="w-5 h-5 text-red-500 ml-2"/>
                                {/*<TrendingDown className="w-10 h-10    text-red-500"/>*/}

                            </div>
                        ))}
                    </div>
                </div>


                {/* Net Profit Card */}


                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-700">Net Profit</h2>
                    <div className="mt-4">
                        {netProfit.map((netProfit: NetProfit) => (
                            <div key={netProfit.valueChainId} className="flex justify-between items-center py-2">
                                <p className="text-sm text-gray-700">{netProfit.name}</p>

                                {/* Display profit value, color based on positive or negative */}
                                <p className={`text-sm font-semibold ${netProfit.netProfit >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
                                    Ksh {netProfit.netProfit.toLocaleString()}
                                </p>

                                {/* Display either TrendingUp or TrendingDown based on net profit */}
                                {netProfit.netProfit >= 0 ? (
                                    <TrendingUp className="w-5 h-5 text-blue-500 ml-2"/>
                                ) : (
                                    <TrendingDown className="w-5 h-5 text-red-500 ml-2"/>
                                )}
                            </div>
                        ))}
                    </div>
                </div>


            </div>

        </>
    )
}
export default ExpIncNtDisplay