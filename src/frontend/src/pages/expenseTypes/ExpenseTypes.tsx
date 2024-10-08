import React, {useCallback, useEffect, useMemo, useState} from "react";

import Spinner from "@/pages/spinnner/Spinner"
import {Button} from "@/components/ui/button"
import {ExpenseTypes} from "@/pages/types/Types"
import {getAllExpenseTypes} from "@/apiCalls/apiCalls"
import {ExpenseTypesDataTables} from "@/pages/expenseTypes/ExpenseTypesDataTables";
import {ExpenseTypesColumns} from "@/pages/expenseTypes/ExpenseTypesColumns";
import AddExpenseTypesDrawer from "@/pages/expenseTypes/AddExpenseTypesDrawer";


export default function ExpenseTypeFn() {
    const [data, setData] = useState<ExpenseTypes[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [showAddExpenseTypeDrawer, setShowAddExpenseTypeDrawer] = useState<boolean>(false)


    const fetchExpenseTypes = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllExpenseTypes();
            const data = await res.json();
            setData(data);
        } catch (err) {
            console.error("Error fetching breeds:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchExpenseTypes();
    }, [fetchExpenseTypes]);

    const editFunctionCall = (expenseTypes: ExpenseTypes) => {
    }

    const deleteFunctionCall = async (expenseTypes: ExpenseTypes) => {
    }


    const onDelete = useCallback(
        (expenseTypes: ExpenseTypes) => deleteFunctionCall(expenseTypes),
        []
    )

    const onEdit = useCallback(
        (expenseTypes: ExpenseTypes) => editFunctionCall(expenseTypes),
        []
    )

    const ExpenseTypesColumnsData = useMemo(() => ExpenseTypesColumns({onEdit, onDelete}), [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <main className='mx-3 mt-16 sm:ml-[300px] sm:mt-3'>
            <Button
                variant='default'
                className="flex items-center justify-end"
                onClick={() => setShowAddExpenseTypeDrawer(!showAddExpenseTypeDrawer)}
            >
                Add Expense Types
            </Button>
            <ExpenseTypesDataTables columns={ExpenseTypesColumnsData} data={data}/>
            <AddExpenseTypesDrawer
                showAddExpenseTypeDrawer={showAddExpenseTypeDrawer}
                setShowAddExpenseTypeDrawer={setShowAddExpenseTypeDrawer}
                fetchExpenseTypes={fetchExpenseTypes}
            />
        </main>
    )
}