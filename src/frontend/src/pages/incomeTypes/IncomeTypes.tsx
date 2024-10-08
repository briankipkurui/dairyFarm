import React, {useCallback, useEffect, useMemo, useState} from "react";

import Spinner from "@/pages/spinnner/Spinner"
import {Button} from "@/components/ui/button"
import {IncomeTypes} from "@/pages/types/Types"
import {getAllIncomesTypes} from "@/apiCalls/apiCalls"
import {IncomeTypesColumns} from "@/pages/incomeTypes/IncomeTypesColumns"
import {IncomeTypesDataTables} from "@/pages/incomeTypes/IncomeTypesDataTables"
import AddIncomeTypeDrawer from "@/pages/incomeTypes/AddIncomeTypesDrawer";


export default function IncomeTypeFn() {
    const [data, setData] = useState<IncomeTypes[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [showAddIncomeTypeDrawer, setShowAddIncomeTypeDrawer] = useState<boolean>(false)


    const fetchIncomeTypes = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllIncomesTypes();
            const data = await res.json();
            setData(data);
        } catch (err) {
            console.error("Error fetching breeds:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchIncomeTypes();
    }, [fetchIncomeTypes]);

    const editFunctionCall = (incomeTypes: IncomeTypes) => {
    }

    const deleteFunctionCall = async (incomeTypes: IncomeTypes) => {
    }


    const onDelete = useCallback(
        (incomeTypes: IncomeTypes) => deleteFunctionCall(incomeTypes),
        []
    )

    const onEdit = useCallback(
        (incomeTypes: IncomeTypes) => editFunctionCall(incomeTypes),
        []
    )

    const IncomesColumnsData = useMemo(() => IncomeTypesColumns({onEdit, onDelete}), [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <main className='mx-3 mt-16 sm:ml-[300px] sm:mt-3'>
            <Button
                variant='default'
                className="flex items-center justify-end"
                onClick={() => setShowAddIncomeTypeDrawer(!showAddIncomeTypeDrawer)}
            >
                Add Income Types
            </Button>
            <IncomeTypesDataTables columns={IncomesColumnsData} data={data}/>
            <AddIncomeTypeDrawer
                showAddIncomeTypeDrawer={showAddIncomeTypeDrawer}
                setShowAddIncomeTypeDrawer={setShowAddIncomeTypeDrawer}
                fetchIncomeTypes={fetchIncomeTypes}
            />
        </main>
    )
}