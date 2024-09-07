
import {useCallback, useEffect, useMemo, useState} from "react";


import Spinner from "@/pages/spinnner/Spinner";
import {Button} from "@/components/ui/button";
import { Livestock} from "@/pages/types/Types";
import {LiveStockColumns} from "@/pages/livestock/LiveStockColumns";
import {LivestockDataTables} from "@/pages/livestock/LiveStockDataTables";
import {getLivestock} from "@/apiCalls/apiCalls";


export default function LiveStockFn() {
    const [data, setData] = useState<Livestock[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchLiveStocks = async () =>
        getLivestock()
            .then((res: any) => res.json())
            .then((data: any) => {
                setData(data)
            }).catch((err: any) => {
        }).finally(() => setLoading(false))


    useEffect(() => {
        fetchLiveStocks()
    }, [])


    const editFunctionCall = (livestock: Livestock) => {}

    const deleteFunctionCall = async (livestock: Livestock) => {}


    const onDelete = useCallback(
        (livestock: Livestock) => deleteFunctionCall(livestock),
        []
    )

    const onEdit = useCallback(
        (livestock: Livestock) => editFunctionCall(livestock),
        []
    )

    const LiveStockColumnsData = useMemo(() => LiveStockColumns({ onEdit, onDelete }), [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <main className='mx-3 mt-16 sm:ml-[300px] sm:mt-3'>
            <Button
                variant='default'
                className="flex items-center justify-end"
            >
                Add livestock
            </Button>
            <LivestockDataTables columns={LiveStockColumnsData} data={data}  />
        </main>
    )
}