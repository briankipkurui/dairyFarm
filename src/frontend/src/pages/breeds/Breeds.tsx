import React, {useCallback, useEffect, useMemo, useState} from "react";

import Spinner from "@/pages/spinnner/Spinner";

import {Button} from "@/components/ui/button";
import {Breeds, Livestock} from "@/pages/types/Types";
import {BreedsColumns} from "@/pages/breeds/BreedsColumns";
import {BreedsDataTables} from "@/pages/breeds/BreedsDataTables";
import {deleteBreed, getBreeds} from "@/apiCalls/apiCalls";
import AddBreedsDrawer from "@/pages/breeds/AddBreedsDrawer"
import UpdateBreedsDrawer from "@/pages/breeds/UpdateBreedsDrawer";
import {errorNotification, successNotification} from "@/utils/Notification";


export default function BreedsFn() {
    const [data, setData] = useState<Breeds[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [breedsData, setBreedsData] = useState<Breeds | undefined>(undefined)
    const [showAddBreedsDrawer, setShowAddBreedsDrawer] = useState<boolean>(false)
    const [showUpdateBreedsDrawer, setShowUpdateBreedsDrawer] = useState<boolean>(false)


    const fetchBreeds = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getBreeds();
            const data = await res.json();
            setData(data);
        } catch (err) {
            console.error("Error fetching breeds:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBreeds(); // Fetch once on mount
    }, [fetchBreeds]);

    const deleteBreedById = (breedId: any) => {

        deleteBreed(breedId).then(() => {
            successNotification(
                "assets successfully added",
                ` was added to the system`,
                'topRight'
            )
        }).catch((err:any) => {
            err.response.json().then((res: any) => {
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`,
                    "bottomLeft"
                )
            });
        })
    }

    const editFunctionCall = (breeds: Breeds) => {
        setBreedsData(breeds)
        setShowUpdateBreedsDrawer(!showUpdateBreedsDrawer)
    }

    const deleteFunctionCall = async (breeds: Breeds) => {deleteBreedById(breeds.id)}


    const onDelete = useCallback(
        (breeds: Breeds) => deleteFunctionCall(breeds),
        []
    )

    const onEdit = useCallback(
        (breeds: Breeds) => editFunctionCall(breeds),
        []
    )

    const CattleColumnsData = useMemo(() => BreedsColumns({onEdit, onDelete}), [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <main className='mx-3 mt-16 sm:ml-[300px] sm:mt-3'>

            <Button
                variant='default'
                className="flex items-center justify-end"
                onClick={() => setShowAddBreedsDrawer(!showAddBreedsDrawer)}
            >
                Add Breeds
            </Button>

            <BreedsDataTables columns={CattleColumnsData} data={data}/>
            <AddBreedsDrawer
                showAddBreedsDrawer={showAddBreedsDrawer}
                setShowAddBreedsDrawer={setShowAddBreedsDrawer}
                fetchBreeds={fetchBreeds}
            />
            {breedsData && (
                <UpdateBreedsDrawer
                    showUpdateBreedsDrawer={showUpdateBreedsDrawer}
                    setShowUpdateBreedsDrawer={setShowUpdateBreedsDrawer}
                    fetchBreeds={fetchBreeds}
                    breeds={breedsData}
                    setBreedsData={setBreedsData}
                />
            )}
        </main>
    )
}