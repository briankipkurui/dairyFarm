import React, {useCallback, useEffect, useMemo, useState} from "react";
import {getAllIncomes} from "@/apiCalls/apiCalls";
import {Incomes} from "@/pages/types/Types";
import Spinner from "@/pages/spinnner/Spinner";
import {Button} from "@/components/ui/button";
import {IncomesColumns} from "@/pages/income/IncomesColumns";
import {IncomesDataTable} from "@/pages/income/IncomesDataTables";
import AddIncomeDrawer from "@/pages/income/AddIncomesDrawer";


export default function IncomesFn() {
    const [data, setData] = useState<Incomes[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [showAddIncomeDrawer, setShowAddIncomeDrawer] = useState<boolean>(false)

    const fetchIncomes = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllIncomes();
            const data = await res.json();
            setData(data);
        } catch (err) {
            console.error("Error fetching breeds:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchIncomes();
    }, [fetchIncomes])

    const editFunctionCall = (incomes: Incomes) => {
    }

    const deleteFunctionCall = async (incomes: Incomes) => {
    }

    const onDelete = useCallback(
        (incomes: Incomes) => deleteFunctionCall(incomes),
        []
    )

    const onEdit = useCallback(
        (incomes: Incomes) => editFunctionCall(incomes),
        []
    )

    const IncomesColumnsData = useMemo(() => IncomesColumns({onEdit, onDelete}), [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <main className='mx-3 mt-16 sm:ml-[300px] sm:mt-3'>
            <Button
                variant='default'
                className="flex items-center justify-end"
                onClick={() => setShowAddIncomeDrawer(!showAddIncomeDrawer)}
            >
                Add Incomes
            </Button>
            <IncomesDataTable columns={IncomesColumnsData} data={data}/>
            <AddIncomeDrawer
                showAddIncomeDrawer={showAddIncomeDrawer}
                setShowAddIncomeDrawer={setShowAddIncomeDrawer}
                fetchIncomes={fetchIncomes}
            />
        </main>
    )
}