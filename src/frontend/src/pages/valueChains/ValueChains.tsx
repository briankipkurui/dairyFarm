import React, {useCallback, useEffect, useMemo, useState} from "react";

import Spinner from "@/pages/spinnner/Spinner"
import {Button} from "@/components/ui/button"
import {ValueChains} from "@/pages/types/Types"
import {getAllValueChains} from "@/apiCalls/apiCalls"
import {ValueChainsColumns} from "@/pages/valueChains/ValueChainsColumns";
import {ValueChainsDataTable} from "@/pages/valueChains/ValueChainsDataTables";
import AddValueChainsDrawer from "@/pages/valueChains/AddValueChainsDrawer";
import AdaptiveValueChainFilter from "@/pages/valueChains/AdaptiveValueChainFilter";


export default function ValueChainsFn() {
    const [data, setData] = useState<ValueChains[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [showAddValueChainsDrawer, setShowAddValueChainsDrawer] = useState<boolean>(false)


    const fetchValueChains = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllValueChains();
            const data = await res.json();
            setData(data);
        } catch (err) {
            console.error("Error fetching breeds:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchValueChains();
    }, [fetchValueChains]);

    const editFunctionCall = (valueChains: ValueChains) => {
    }

    const deleteFunctionCall = async (valueChains: ValueChains) => {
    }


    const onDelete = useCallback(
        (valueChains: ValueChains) => deleteFunctionCall(valueChains),
        []
    )

    const onEdit = useCallback(
        (valueChains: ValueChains) => editFunctionCall(valueChains),
        []
    )

    const ValueChainsColumnsData = useMemo(() => ValueChainsColumns({onEdit, onDelete}), [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <main className='mx-3 mt-16 sm:ml-[300px] sm:mt-3'>
            <Button
                variant='default'
                className="flex items-center justify-end"
                onClick={() => setShowAddValueChainsDrawer(!showAddValueChainsDrawer)}
            >
                Add ValueChains
            </Button>

            <ValueChainsDataTable columns={ValueChainsColumnsData} data={data}/>
            <AddValueChainsDrawer
                showAddValueChainsDrawer={showAddValueChainsDrawer}
                setShowAddValueChainsDrawer={setShowAddValueChainsDrawer}
                fetchValueChains={fetchValueChains}
            />
        </main>
    )
}