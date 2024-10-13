import {TrendingDown, TrendingUp} from "lucide-react";

const ExpIncNtDisplay = () => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Income Card */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Income</h2>
                            <p className="mt-2 text-2xl font-bold text-green-500">Ksh 50,000</p>
                        </div>
                        <TrendingUp className="w-10 h-10 text-green-500"/>
                    </div>
                </div>

                {/* Expense Card */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Expenses</h2>
                            <p className="mt-2 text-2xl font-bold text-red-500">Ksh 30,000</p>
                        </div>
                        <TrendingDown className="w-10 h-10 text-red-500"/>
                    </div>
                </div>

                {/* Net Profit Card */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Net Profit</h2>
                            <p className="mt-2 text-2xl font-bold text-blue-500">Ksh 20,000</p>
                        </div>
                        <TrendingUp className="w-10 h-10 text-blue-500"/>
                    </div>
                </div>
            </div>

        </>
    )
}
export default ExpIncNtDisplay