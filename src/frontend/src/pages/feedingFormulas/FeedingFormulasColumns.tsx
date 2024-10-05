import {ColumnDef} from "@tanstack/react-table"
import {Breeds, FeedingFormulas, FeedsTypes} from "@/pages/types/Types";
import BreedsRowActions from "@/pages/breeds/BreedsRowActions";
import FeedsTypesRowActions from "@/pages/feedsTypes/FeedsTypesRowActions";


interface rowActionProps {
    onEdit: (data: any) => void
    onDelete: (data: any) => void
}

export const FeedingFormulasColumns = ({onEdit, onDelete}: rowActionProps): ColumnDef<FeedingFormulas>[] => {

    const columns: ColumnDef<FeedingFormulas>[] = [
        {
            accessorKey: "id",
            header: "id",
            cell: ({ row }) => {
                const value: FeedingFormulas = row.original
                return value.feedingFormulasIds.feedTypeId
            },
        },
        {
            accessorKey: "livestockTypes",
            header: "livestockTypes",
            cell: ({ row }) => {
                const value: FeedingFormulas = row.original
                return value.livestockTypes.name
            },
        },
        {
            accessorKey: "feedsTypes",
            header: "feedsTypes",
            cell: ({ row }) => {
                const value: FeedingFormulas = row.original
                return value.feedsTypes.name
            },
        },
        {
            accessorKey: "quantityKg",
            header: "quantityKg",
        },
        {
            accessorKey: "feedingFrequency",
            header: "feedingFrequency",
        },
        {
            accessorKey: "feedingTime",
            header: "feedingTime",
        },
        {
            accessorKey: "waterLiters",
            header: "waterLiters",
        },
        {
            accessorKey: "supplements",
            header: "supplements",
        },
        {
            accessorKey: "createdAt",
            header: "createdAt",
        },
        {
            id: "actions",
            header: 'Actions',
            cell: ({row}) => <FeedsTypesRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
        }
    ]

    return columns
}
