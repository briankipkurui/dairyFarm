import ValueChainListings from "@/pages/dashBoard/ValueChainListings";
import ExpIncNtDisplay from "@/pages/dashBoard/ExpIncNtDisplay";
import NetProfitChart from "@/pages/dashBoard/NetProfitChart";

export default function DashBoard() {

    return (
        <main className='mx-3 mt-16 sm:ml-[300px] sm:mt-3'>
            <ValueChainListings/>
            <ExpIncNtDisplay/>
            <NetProfitChart/>
        </main>
    )
}