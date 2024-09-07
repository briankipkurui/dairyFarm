
import {useCallback, useEffect, useMemo, useState} from "react";

import Spinner from "@/pages/spinnner/Spinner";

import {Button} from "@/components/ui/button";
import {Breeds} from "@/pages/types/Types";
import {BreedsColumns} from "@/pages/breeds/BreedsColumns";
import {BreedsDataTables} from "@/pages/breeds/BreedsDataTables";
import {getBreeds} from "@/apiCalls/apiCalls";


export default function BreedsFn() {
    const [data, setData] = useState<Breeds[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchBreeds = async () =>
        getBreeds()
            .then((res: any) => res.json())
            .then((data: any) => {
                setData(data)
            }).catch((err: any) => {
        }).finally(() => setLoading(false))


    useEffect(() => {
        fetchBreeds()
    }, [])


    const editFunctionCall = (breeds: Breeds) => {}

    const deleteFunctionCall = async (breeds: Breeds) => {}


    const onDelete = useCallback(
        (breeds: Breeds) => deleteFunctionCall(breeds),
        []
    )

    const onEdit = useCallback(
        (breeds: Breeds) => editFunctionCall(breeds),
        []
    )

    const CattleColumnsData = useMemo(() => BreedsColumns({ onEdit, onDelete }), [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <main className='mx-3 mt-16 sm:ml-[300px] sm:mt-3'>

            <Button
                variant='default'
                className="flex items-center justify-end"
            >
                Add Breeds
            </Button>

            <BreedsDataTables columns={CattleColumnsData} data={data}  />
        </main>
    )
}