import React, {useCallback, useEffect, useMemo, useState} from "react";
import {getAllExpenses} from "@/apiCalls/apiCalls";
import {Expenses} from "@/pages/types/Types";
import Spinner from "@/pages/spinnner/Spinner";
import {Button} from "@/components/ui/button";
import {ExpensesColumns} from "@/pages/expense/ExpenseColumns";
import {ExpensesDataTable} from "@/pages/expense/ExpenseDataTables";
import AddExpenseDrawer from "@/pages/expense/AddExpenseDrawer";


export default function ExpenseFn() {
    const [data, setData] = useState<Expenses[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [showAddExpenseDrawer, setShowAddExpensesDrawer] = useState<boolean>(false)

    const fetchExpenses = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllExpenses();
            const data = await res.json();
            setData(data);
        } catch (err) {
            console.error("Error fetching breeds:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses])

    const editFunctionCall = (expenses: Expenses) => {
    }

    const deleteFunctionCall = async (expenses: Expenses) => {
    }

    const onDelete = useCallback(
        (expenses: Expenses) => deleteFunctionCall(expenses),
        []
    )

    const onEdit = useCallback(
        (expenses: Expenses) => editFunctionCall(expenses),
        []
    )

    const ExpensesColumnsData = useMemo(() => ExpensesColumns({onEdit, onDelete}), [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <main className='mx-3 mt-16 sm:ml-[300px] sm:mt-3'>
            <Button
                variant='default'
                className="flex items-center justify-end"
                onClick={() => setShowAddExpensesDrawer(!showAddExpenseDrawer)}
            >
                Add Expense
            </Button>
            <ExpensesDataTable columns={ExpensesColumnsData} data={data}/>
            <AddExpenseDrawer
                showAddExpenseDrawer={showAddExpenseDrawer}
                setShowAddExpensesDrawer={setShowAddExpensesDrawer}
                fetchExpenses={fetchExpenses}
            />
        </main>
    )
}