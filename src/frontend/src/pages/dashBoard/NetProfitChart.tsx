
import {useCallback, useEffect, useState} from "react";
import {getAllValueChains, getNetProfit} from "@/apiCalls/apiCalls";
import { BarChart, Bar, XAxis, YAxis,Label, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";

const NetProfitChart = () => {
    // const [netProfit, setNetProfit] = useState([
    //     { valueChain: 'Value Chain 1', netProfit: 20000 },
    //     { valueChain: 'Value Chain 2', netProfit: 10000 },
    //     { valueChain: 'Value Chain 3', netProfit: 5000 }
    // ])

    const [netProfit, setNetProfit] = useState([])


    const fetchValueChains = useCallback(async () => {
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
        fetchValueChains();
    }, [fetchValueChains]);

    return (
        <>
            {/*<div className="bg-white shadow-md rounded-lg p-6">*/}
            {/*    <h2 className="text-xl font-semibold text-gray-700 mb-4">Net Profit for Value Chains</h2>*/}
            {/*    <ResponsiveContainer width="100%" height={400}>*/}
            {/*        <BarChart data={netProfit} margin={{top: 20, right: 30, left: 20, bottom: 20}}>*/}
            {/*            <CartesianGrid strokeDasharray="3 3"/>*/}
            {/*            <XAxis dataKey="valueChain">*/}
            {/*                <Label value="Value Chains" offset={-10} position="insideBottom"/>*/}
            {/*            </XAxis>*/}
            {/*            <YAxis>*/}
            {/*                <Label value="Net Profit (Ksh)" angle={-90} position="insideLeft"/>*/}
            {/*            </YAxis>*/}
            {/*            <Tooltip/>*/}
            {/*            <Legend/>*/}
            {/*            <Bar dataKey="netProfit" fill="#4caf50" barSize={50} radius={[10, 10, 0, 0]}/>*/}
            {/*        </BarChart>*/}
            {/*    </ResponsiveContainer>*/}
            {/*</div>*/}


            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Net Profit for Value Chains</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={netProfit} margin={{top: 20, right: 30, left: 20, bottom: 20}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name">
                            <Label value="Value Chains" offset={-10} position="insideBottom"/>
                        </XAxis>
                        <YAxis>
                            <Label value="Net Profit (Ksh)" angle={-90} position="insideLeft"/>
                        </YAxis>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="netProfit" fill="#4caf50" barSize={50} radius={[10, 10, 0, 0]}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>


            {/*<div className="bg-white shadow-lg rounded-lg p-6">*/}
            {/*    <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Net Profit Overview</h2>*/}
            {/*    <div className="w-full h-96">*/}
            {/*        <ResponsiveContainer width="100%" height={400}>*/}
            {/*            <BarChart data={netProfit}>*/}
            {/*                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/>*/}
            {/*                <XAxis dataKey="valueChainId" tick={{fill: '#4b5563'}}/>*/}
            {/*                <YAxis tick={{fill: '#4b5563'}}/>*/}
            {/*                <Tooltip/>*/}
            {/*                <Legend/>*/}
            {/*                <Bar dataKey="netProfit" fill="#82ca9d" barSize={40} radius={[10, 10, 0, 0]}/>*/}
            {/*            </BarChart>*/}
            {/*        </ResponsiveContainer>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </>
    )
}
export default NetProfitChart