import React, {useCallback, useEffect, useMemo, useState} from "react";
import {getAllFeedsTypes} from "@/apiCalls/apiCalls";
import { FeedsTypes} from "@/pages/types/Types";
import {FeedTypeDataTable} from "@/pages/feedsTypes/FeedsTypeDataTable";
import Spinner from "@/pages/spinnner/Spinner";
import {FeedsTypesColumns} from "@/pages/feedsTypes/FeedsTypesColumns";
import {Button} from "@/components/ui/button";
import AddFeedsTypesDrawer from "@/pages/feedsTypes/AddFeedsTypesDrawer";


export default function FeedsTypesFn() {
    const [data, setData] = useState<FeedsTypes[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [showAddFeedTypeDrawer, setShowAddFeedTypeDrawer] = useState<boolean>(false)

    const fetchFeedsTypes = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllFeedsTypes();
            const data = await res.json();
            setData(data);
        } catch (err) {
            console.error("Error fetching breeds:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFeedsTypes();
    }, [fetchFeedsTypes])

    const editFunctionCall = (feedsTypes: FeedsTypes) => {
    }

    const deleteFunctionCall = async (feedsTypes: FeedsTypes) => {
    }

    const onDelete = useCallback(
        (feedsTypes: FeedsTypes) => deleteFunctionCall(feedsTypes),
        []
    )

    const onEdit = useCallback(
        (feedsTypes: FeedsTypes) => editFunctionCall(feedsTypes),
        []
    )

    const FeedsTypesColumnsData = useMemo(() => FeedsTypesColumns({onEdit, onDelete}), [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <main className='mx-3 mt-16 sm:ml-[300px] sm:mt-3'>
            <Button
                variant='default'
                className="flex items-center justify-end"
                onClick={() => setShowAddFeedTypeDrawer(!showAddFeedTypeDrawer)}
            >
                Add FeedsType
            </Button>
            <FeedTypeDataTable columns={FeedsTypesColumnsData} data={data}/>
            <AddFeedsTypesDrawer
                showAddFeedTypeDrawer={showAddFeedTypeDrawer}
                setShowAddFeedTypeDrawer={setShowAddFeedTypeDrawer}
                fetchFeedsTypes={fetchFeedsTypes}
            />
        </main>
    )
}