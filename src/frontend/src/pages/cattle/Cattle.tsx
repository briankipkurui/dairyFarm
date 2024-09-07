import {useCallback, useEffect, useMemo, useState} from "react";

import Spinner from "@/pages/spinnner/Spinner";
import {CattleColumns} from "@/pages/cattle/CattleColumns";
import {CattleDataTables} from "@/pages/cattle/CattleDataTables";
import {Button} from "@/components/ui/button";
import {Cattle} from "@/pages/types/Types";
import {getAllCows} from "@/apiCalls/apiCalls";
import AddCattleDrawer from "@/pages/cattle/AddCattleDrawer";


export default function CattleFn() {
    const [data, setData] = useState<Cattle[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [addCattleDrawer, showAddCattleDrawer] = useState(false);

    const fetchAllCows = async () =>
        getAllCows()
            .then((res: any) => res.json())
            .then((data: any) => {
                setData(data)
            }).catch((err: any) => {
        }).finally(() => setLoading(false))


    useEffect(() => {
        fetchAllCows()
    }, [])


    const editFunctionCall = (cattle: Cattle) => {
    }

    const deleteFunctionCall = async (cattle: Cattle) => {
    }


    const onDelete = useCallback(
        (cattle: Cattle) => deleteFunctionCall(cattle),
        []
    )

    const onEdit = useCallback(
        (cattle: Cattle) => editFunctionCall(cattle),
        []
    )

    const CattleColumnsData = useMemo(() => CattleColumns({onEdit, onDelete}), [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <main className='mx-3 mt-16 sm:ml-[300px] sm:mt-3'>

            <Button
                variant='default'
                className="flex items-center justify-end"
                onClick={() => showAddCattleDrawer(!addCattleDrawer)}
            >
                Add Cattle
            </Button>
            <CattleDataTables columns={CattleColumnsData} data={data}/>
            <AddCattleDrawer
                addCattleDrawer={addCattleDrawer}
                showAddCattleDrawer={showAddCattleDrawer}
                fetchAllCows={fetchAllCows}
            />
        </main>
    )
}