import React, {useCallback, useEffect, useMemo, useState} from "react";
import {getAllFeedingRecords} from "@/apiCalls/apiCalls";
import {FeedingRecords} from "@/pages/types/Types";
import Spinner from "@/pages/spinnner/Spinner";
import {Button} from "@/components/ui/button";
import {FeedingRecordsColumns} from "@/pages/feedingRecords/FeedingRecordsColumns";
import {FeedingRecordsDataTable} from "@/pages/feedingRecords/FeedingRecordsDataTables";


export default function FeedingRecordsFn() {
    const [data, setData] = useState<FeedingRecords[]>([])
    const [loading, setLoading] = useState<boolean>(true)


    const fetchFeedingRecords = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllFeedingRecords();
            const data = await res.json();
            setData(data);
        } catch (err) {
            console.error("Error fetching breeds:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFeedingRecords();
    }, [fetchFeedingRecords])

    const editFunctionCall = (feedingRecords: FeedingRecords) => {
    }

    const deleteFunctionCall = async (feedingRecords: FeedingRecords) => {
    }

    const onDelete = useCallback(
        (feedingRecords: FeedingRecords) => deleteFunctionCall(feedingRecords),
        []
    )

    const onEdit = useCallback(
        (feedingRecords: FeedingRecords) => editFunctionCall(feedingRecords),
        []
    )

    const FeedingRecordsColumnsData = useMemo(() => FeedingRecordsColumns({onEdit, onDelete}), [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <main className='mx-3 mt-16 sm:ml-[300px] sm:mt-3'>
            <Button
                variant='default'
                className="flex items-center justify-end"
                // onClick={() => setShowAddFeedingFormulasDrawer(!showAddFeedingFormulasDrawer)}
            >
                Add FeedingRecords
            </Button>
            <FeedingRecordsDataTable columns={FeedingRecordsColumnsData} data={data}/>

        </main>
    )
}