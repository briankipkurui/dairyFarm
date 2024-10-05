import React, {useCallback, useEffect, useMemo, useState} from "react";
import {getAllFeedingFormulas} from "@/apiCalls/apiCalls";
import {FeedingFormulas} from "@/pages/types/Types";
import {FeedTypeDataTable} from "@/pages/feedsTypes/FeedsTypeDataTable";
import Spinner from "@/pages/spinnner/Spinner";
import {Button} from "@/components/ui/button";
import {FeedingFormulasColumns} from "@/pages/feedingFormulas/FeedingFormulasColumns";
import {FeedingFormulasDataTable} from "@/pages/feedingFormulas/FeedingFormulasDataTables";
import AddFeedingFormulasDrawer from "@/pages/feedingFormulas/AddFeedingFormulasDrawer";


export default function FeedingFormulasFn() {
    const [data, setData] = useState<FeedingFormulas[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [showAddFeedingFormulasDrawer, setShowAddFeedingFormulasDrawer] = useState<boolean>(false)


    const fetchFeedsFormulas = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllFeedingFormulas();
            const data = await res.json();
            setData(data);
        } catch (err) {
            console.error("Error fetching breeds:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFeedsFormulas();
    }, [fetchFeedsFormulas])

    const editFunctionCall = (feedingFormulas: FeedingFormulas) => {
    }

    const deleteFunctionCall = async (feedingFormulas: FeedingFormulas) => {
    }

    const onDelete = useCallback(
        (feedingFormulas: FeedingFormulas) => deleteFunctionCall(feedingFormulas),
        []
    )

    const onEdit = useCallback(
        (feedingFormulas: FeedingFormulas) => editFunctionCall(feedingFormulas),
        []
    )

    const FeedsFormulasColumnsData = useMemo(() => FeedingFormulasColumns({onEdit, onDelete}), [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <main className='mx-3 mt-16 sm:ml-[300px] sm:mt-3'>
            <Button
                variant='default'
                className="flex items-center justify-end"
                onClick={() => setShowAddFeedingFormulasDrawer(!showAddFeedingFormulasDrawer)}
            >
                Add FeedsFormulas
            </Button>
            <FeedingFormulasDataTable columns={FeedsFormulasColumnsData} data={data}/>
            <AddFeedingFormulasDrawer
                showAddFeedingFormulasDrawer={showAddFeedingFormulasDrawer}
                setShowAddFeedingFormulasDrawer={setShowAddFeedingFormulasDrawer}
                fetchFeedsFormulas={fetchFeedsFormulas}
            />

        </main>
    )
}