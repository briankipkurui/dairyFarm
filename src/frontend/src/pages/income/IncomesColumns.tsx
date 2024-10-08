import {ColumnDef} from "@tanstack/react-table"
import {Breeds, FeedingFormulas, FeedsTypes, Incomes} from "@/pages/types/Types";
import FeedsTypesRowActions from "@/pages/feedsTypes/FeedsTypesRowActions";


interface rowActionProps {
    onEdit: (data: any) => void
    onDelete: (data: any) => void
}

export const IncomesColumns = ({onEdit, onDelete}: rowActionProps): ColumnDef<Incomes>[] => {

    const columns: ColumnDef<Incomes>[] = [
        {
            accessorKey: "id",
            header: "id",
        },
        {
            accessorKey: "incomeTypes",
            header: "Income Types",
            cell: ({ row }) => {
                const value: Incomes = row.original
                return value.incomeTypes.name
            },
        },
        {
            accessorKey: "amount",
            header: "Amount",
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            accessorKey: "transactionDate",
            header: "TransactionDate",
        },
        {
            accessorKey: "updatedAt",
            header: "Updated At",
        },
        {
            id: "actions",
            header: 'Actions',
            cell: ({row}) => <FeedsTypesRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
        }
    ]

    return columns
}
