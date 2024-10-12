import {ColumnDef} from "@tanstack/react-table"
import {Breeds, Expenses, FeedingFormulas, FeedsTypes, Incomes, Permissions, ValueChains,} from "@/pages/types/Types";
import FeedsTypesRowActions from "@/pages/feedsTypes/FeedsTypesRowActions";


interface rowActionProps {
    onEdit: (data: any) => void
    onDelete: (data: any) => void
}

export const ValueChainsColumns = ({onEdit, onDelete}: rowActionProps): ColumnDef<ValueChains>[] => {

    const columns: ColumnDef<ValueChains>[] = [
        {
            accessorKey: "id",
            header: "id",
        },
        {
            accessorKey: "name",
            header: "name",
        },
        {
            accessorKey: "createdAt",
            header: "createdAt",
        },
        {
            accessorKey: "updatedAt",
            header: "updatedAt",
        },
        {
            id: "actions",
            header: 'Actions',
            cell: ({row}) => <FeedsTypesRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
        }
    ]

    return columns
}
