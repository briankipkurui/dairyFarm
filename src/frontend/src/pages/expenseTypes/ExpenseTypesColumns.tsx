import {ColumnDef} from "@tanstack/react-table"
import {ExpenseTypes, IncomeTypes} from "@/pages/types/Types";
import BreedsRowActions from "@/pages/breeds/BreedsRowActions";


interface rowActionProps {
    onEdit: (data: any) => void
    onDelete: (data: any) => void
}

export const ExpenseTypesColumns = ({onEdit, onDelete}: rowActionProps): ColumnDef<ExpenseTypes>[] => {
    const columns: ColumnDef<ExpenseTypes>[] = [
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
            id: "actions",
            header: 'Actions',
            cell: ({row}) => <BreedsRowActions row={row} onEdit={onEdit} onDelete={onDelete}/>,
        }
    ]

    return columns
}
