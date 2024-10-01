import React, {useCallback, useEffect, useMemo, useState} from "react";
import Spinner from "@/pages/spinnner/Spinner";
import {Button} from "@/components/ui/button";
import {Livestock} from "@/pages/types/Types";
import {LiveStockColumns} from "@/pages/livestock/LiveStockColumns";
import {LivestockDataTables} from "@/pages/livestock/LiveStockDataTables";
import {deteleLiveStock, getLivestock} from "@/apiCalls/apiCalls"
import AddLivestockDrawerForm from "@/pages/livestock/AddLiveStockDrawer";
import UpdateLivestockDrawerForm from "@/pages/livestock/UpdateLiveStockDrawer";
import {errorNotification, successNotification} from "@/utils/Notification";


export default function LiveStockFn() {
    const [data, setData] = useState<Livestock[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [showAddLiveStockDrawer, setShowAddLiveStockDrawer] = useState<boolean>(false)
    const [showUpdateLiveStockDrawer, setShowUpdateLiveStockDrawer] = useState<boolean>(false)
    const [liveStockData, setLiveStockData] = useState<Livestock | undefined>(undefined)


    const fetchLiveStocks = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getLivestock()
            const data = await res.json()
            setData(data);
        } catch (err) {
            console.error("Error fetching breeds:", err)
        } finally {
            setLoading(false)
        }
    }, [])


    useEffect(() => {
        fetchLiveStocks()
    }, [fetchLiveStocks])

    const deleteCustomerById = (customerId: any) => {
        deteleLiveStock(customerId).then(() => {
            successNotification(
                "assets successfully added",
                ` was added to the system`,
                'topRight'
            )
            fetchLiveStocks()
        }).catch(err => {
            err.response.json().then((res: any) => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`,
                    "bottomLeft"
                )
            });
        })
    }


    const editFunctionCall = (livestock: Livestock) => {
        setLiveStockData(livestock)
        setShowUpdateLiveStockDrawer(!showUpdateLiveStockDrawer)
    }

    const deleteFunctionCall = async (livestock: Livestock) => {
        deleteCustomerById(livestock.id)
    }


    const onDelete = useCallback(
        (livestock: Livestock) => deleteFunctionCall(livestock),
        []
    )

    const onEdit = useCallback(
        (livestock: Livestock) => editFunctionCall(livestock),
        []
    )

    const LiveStockColumnsData = useMemo(() => LiveStockColumns({onEdit, onDelete}), [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <main className='mx-3 mt-16 sm:ml-[300px] sm:mt-3'>
            <Button
                variant='default'
                className="flex items-center justify-end"
                onClick={() => setShowAddLiveStockDrawer(!showAddLiveStockDrawer)}
            >
                Add livestock
            </Button>
            <LivestockDataTables columns={LiveStockColumnsData} data={data}/>

            <AddLivestockDrawerForm
                showAddLiveStockDrawer={showAddLiveStockDrawer}
                setShowAddLiveStockDrawer={setShowAddLiveStockDrawer}
                fetchLiveStocks={fetchLiveStocks}
            />

            {liveStockData && (
                <UpdateLivestockDrawerForm
                    showUpdateLiveStockDrawer={showUpdateLiveStockDrawer}
                    setShowUpdateLiveStockDrawer={setShowUpdateLiveStockDrawer}
                    LiveStock={liveStockData}
                    fetchLiveStocks={fetchLiveStocks}
                    setLiveStockData={setLiveStockData}
                />
            )}
        </main>
    )
}