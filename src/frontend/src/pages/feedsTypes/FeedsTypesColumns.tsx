import {ColumnDef} from "@tanstack/react-table"
import {Breeds, FeedsTypes} from "@/pages/types/Types";
import BreedsRowActions from "@/pages/breeds/BreedsRowActions";
import FeedsTypesRowActions from "@/pages/feedsTypes/FeedsTypesRowActions";


interface rowActionProps {
    onEdit: (data: any) => void
    onDelete: (data: any) => void
}

export const FeedsTypesColumns = ({onEdit, onDelete}: rowActionProps): ColumnDef<FeedsTypes>[] => {

    const columns: ColumnDef<FeedsTypes>[] = [
        {
            accessorKey: "id",
            header: "id",
        },
        {
            accessorKey: "name",
            header: "name",
        },
        {
            accessorKey: "description",
            header: "description",
        },
        {
            accessorKey: "proteinPct",
            header: "proteinPct",
        },
        {
            accessorKey: "fatPct",
            header: "fatPct",
        },
        {
            accessorKey: "fiberPct",
            header: "fiberPct",
        },
        {
            accessorKey: "energy",
            header: "energy",
        },
        {
            accessorKey: "costPerKg",
            header: "costPerKg",
        },
        {
            id: "actions",
            header: 'Actions',
            cell: ({row}) => <FeedsTypesRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
        }
    ]

    return columns
}
