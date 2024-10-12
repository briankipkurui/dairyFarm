import {ColumnDef} from "@tanstack/react-table"
import {Breeds, Expenses, FeedingFormulas, FeedsTypes, Incomes} from "@/pages/types/Types";
import FeedsTypesRowActions from "@/pages/feedsTypes/FeedsTypesRowActions";


interface rowActionProps {
    onEdit: (data: any) => void
    onDelete: (data: any) => void
}

export const ExpensesColumns = ({onEdit, onDelete}: rowActionProps): ColumnDef<Expenses>[] => {

    const columns: ColumnDef<Expenses>[] = [
        {
            accessorKey: "id",
            header: "id",
        },
        {
            accessorKey: "expenseType",
            header: "ExpenseTypes",
            cell: ({ row }) => {
                const value: Expenses = row.original
                return value.expenseType.name
            },
        },
        {
            accessorKey: "valueChains",
            header: "ValueChains",
            cell: ({ row }) => {
                const value: Expenses = row.original
                return value.valueChains.name
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
