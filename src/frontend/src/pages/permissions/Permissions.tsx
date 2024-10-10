import React, {useCallback, useEffect, useMemo, useState} from "react";

import Spinner from "@/pages/spinnner/Spinner"
import {Button} from "@/components/ui/button"
import {Permissions} from "@/pages/types/Types"
import {getAllPermissions} from "@/apiCalls/apiCalls"
import {PermissionsColumns} from "@/pages/permissions/PermissionsColumns";
import {PermissionsDataTable} from "@/pages/permissions/PermissionsDataTables";
import AddPermissionsDrawer from "@/pages/permissions/AddPermissionsDrawer";


export default function PermissionsFn() {
    const [data, setData] = useState<Permissions[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [showAddPermissionsDrawer, setShowAddPermissionsDrawer] = useState<boolean>(false)


    const fetchPermissions = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllPermissions();
            const data = await res.json();
            setData(data);
        } catch (err) {
            console.error("Error fetching breeds:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPermissions();
    }, [fetchPermissions]);

    const editFunctionCall = (permissions: Permissions) => {
    }

    const deleteFunctionCall = async (permissions: Permissions) => {
    }


    const onDelete = useCallback(
        (permissions: Permissions) => deleteFunctionCall(permissions),
        []
    )

    const onEdit = useCallback(
        (permissions: Permissions) => editFunctionCall(permissions),
        []
    )

    const PermissionsColumnsData = useMemo(() => PermissionsColumns({onEdit, onDelete}), [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <main className='mx-3 mt-16 sm:ml-[300px] sm:mt-3'>
            <Button
                variant='default'
                className="flex items-center justify-end"
                onClick={() => setShowAddPermissionsDrawer(!showAddPermissionsDrawer)}
            >
                Add Permissions
            </Button>
            <PermissionsDataTable columns={PermissionsColumnsData} data={data}/>
            <AddPermissionsDrawer
                showAddPermissionsDrawer={showAddPermissionsDrawer}
                setShowAddPermissionsDrawer={setShowAddPermissionsDrawer}
                fetchPermissions={fetchPermissions}
            />
        </main>
    )
}