import React, {useCallback, useEffect, useMemo, useState} from "react";

import Spinner from "@/pages/spinnner/Spinner";
import {CattleColumns} from "@/pages/cattle/CattleColumns";
import {CattleDataTables} from "@/pages/cattle/CattleDataTables";
import {Button} from "@/components/ui/button";
import {Cattle} from "@/pages/types/Types";
import {getAllCows, getBreeds} from "@/apiCalls/apiCalls";
import AddCattleDrawer from "@/pages/cattle/AddCattleDrawer";
import UpdateCattleDrawer from "@/pages/cattle/UpdateCattleDrawer";
import AddRelationShipDrawer from "@/pages/cattle/AddRelationShipDrawer";
import FamilyTreeMainDrawer from "@/pages/cattle/FamilyTreeMain";


export default function CattleFn() {
    const [data, setData] = useState<Cattle[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [addCattleDrawer, showAddCattleDrawer] = useState(false);
    const [cattleData, setCattleData] = useState<Cattle | undefined>(undefined)
    const [updateCattleDrawer, showUpdateCattleDrawer] = useState(false);
    const [addRelationShipDrawer, showRelationShipDrawer] = useState(false);
    const [familyTreeMainDrawer, showFamilyTreeMainDrawer] = useState<boolean>(false)


    const fetchAllCows = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllCows();
            const data = await res.json();
            setData(data);
        } catch (err) {
            console.error("Error fetching breeds:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllCows(); // Fetch once on mount
    }, [fetchAllCows]);


    const editFunctionCall = (cattle: Cattle) => {
        setCattleData(cattle)
        showUpdateCattleDrawer(!updateCattleDrawer)
    }

    const deleteFunctionCall = async (cattle: Cattle) => {
    }
    const onAddRelationShipFunctionCall = async (cattle: Cattle) => {
        setCattleData(cattle)
        showRelationShipDrawer(!addRelationShipDrawer)
    }
    const onViewFamilyTreeFunctionCall = async (cattle: Cattle) => {
        setCattleData(cattle)
        showFamilyTreeMainDrawer(!familyTreeMainDrawer)
    }


    const onDelete = useCallback(
        (cattle: Cattle) => deleteFunctionCall(cattle),
        []
    )

    const onEdit = useCallback(
        (cattle: Cattle) => editFunctionCall(cattle),
        []
    )
    const onAddRelationShip = useCallback(
        (cattle: Cattle) => onAddRelationShipFunctionCall(cattle),
        []
    )

    const onViewFamilyTree = useCallback(
        (cattle: Cattle) => onViewFamilyTreeFunctionCall(cattle),
        []
    )

    const CattleColumnsData = useMemo(() => CattleColumns({onEdit, onDelete, onAddRelationShip, onViewFamilyTree}), [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <main className='mx-3 mt-16 sm:ml-[300px] sm:mt-3'>
            <Button
                variant='default'
                className="flex items-center justify-end"
                onClick={() => showAddCattleDrawer(!addCattleDrawer)}
            >
                Create Cattle
            </Button>
            <CattleDataTables columns={CattleColumnsData} data={data}/>
            <AddCattleDrawer
                addCattleDrawer={addCattleDrawer}
                showAddCattleDrawer={showAddCattleDrawer}
                fetchAllCows={fetchAllCows}
            />
            {cattleData && (
                <UpdateCattleDrawer
                    updateCattleDrawer={updateCattleDrawer}
                    showUpdateCattleDrawer={showUpdateCattleDrawer}
                    cattle={cattleData}
                    setCattleData={setCattleData}
                    getAllCows={getAllCows}
                />
            )}
            {cattleData && (<AddRelationShipDrawer
                addRelationShipDrawer={addRelationShipDrawer}
                showRelationShipDrawer={showRelationShipDrawer}
                cattle={cattleData}
                setCattleData={setCattleData}
            />)}
            {cattleData && (<FamilyTreeMainDrawer
                familyTreeMainDrawer={familyTreeMainDrawer}
                showFamilyTreeMainDrawer={showFamilyTreeMainDrawer}
                cattle={cattleData}
                setCattleData={setCattleData}
            />)}

        </main>
    )
}