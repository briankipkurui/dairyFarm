import React, {useCallback, useEffect, useMemo, useState} from "react";

import Spinner from "@/pages/spinnner/Spinner"
import {Button} from "@/components/ui/button"
import {IncomeTypes, Roles} from "@/pages/types/Types"
import {getAllIncomesTypes, getAllRoles} from "@/apiCalls/apiCalls"
import {IncomeTypesColumns} from "@/pages/incomeTypes/IncomeTypesColumns"
import {IncomeTypesDataTables} from "@/pages/incomeTypes/IncomeTypesDataTables"
import AddIncomeTypeDrawer from "@/pages/incomeTypes/AddIncomeTypesDrawer";
import {RolesColumns} from "@/pages/roles/RolesColumns";
import AddRolesDrawer from "@/pages/roles/AddRolesDrawer";


export default function RolesFn() {
    const [data, setData] = useState<Roles[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [showAddRolesDrawer, setShowAddRolesDrawer] = useState<boolean>(false)


    const fetchRoles = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllRoles();
            const data = await res.json();
            setData(data);
        } catch (err) {
            console.error("Error fetching breeds:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    const editFunctionCall = (roles: Roles) => {
    }

    const deleteFunctionCall = async (roles: Roles) => {
    }


    const onDelete = useCallback(
        (roles: Roles) => deleteFunctionCall(roles),
        []
    )

    const onEdit = useCallback(
        (roles: Roles) => editFunctionCall(roles),
        []
    )

    const RolesColumnsData = useMemo(() => RolesColumns({onEdit, onDelete}), [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <main className='mx-3 mt-16 sm:ml-[300px] sm:mt-3'>
            <Button
                variant='default'
                className="flex items-center justify-end"
                onClick={() => setShowAddRolesDrawer(!showAddRolesDrawer)}
            >
                Add Roles
            </Button>
            <IncomeTypesDataTables columns={RolesColumnsData} data={data}/>
            <AddRolesDrawer
                showAddRolesDrawer={showAddRolesDrawer}
                setShowAddRolesDrawer={setShowAddRolesDrawer}
                fetchRoles={fetchRoles}
            />
        </main>
    )
}