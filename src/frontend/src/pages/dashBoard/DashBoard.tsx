
import ExpIncNtDisplay from "@/pages/dashBoard/ExpIncNtDisplay";
import NetProfitChart from "@/pages/dashBoard/NetProfitChart";
import React, {useState} from "react";
import {FilterValues} from "@/pages/types/Types";
import ValueChainListings from "@/pages/dashBoard/ValueChainListings";

export default function DashBoard() {
    const [selectedFilterValue, setSelectedFilterValue] = useState<FilterValues|undefined>(undefined)

    return (
        <main className='mx-3 mt-16 sm:ml-[300px] sm:mt-3'>
            <ValueChainListings setSelectedFilterValue={setSelectedFilterValue}/>
            <ExpIncNtDisplay  selectedFilterValue={selectedFilterValue}/>
            <NetProfitChart selectedFilterValue={selectedFilterValue}/>
        </main>
    )
}