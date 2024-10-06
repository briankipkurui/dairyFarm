import {ColumnDef} from "@tanstack/react-table"
import {Breeds, FeedingFormulas, FeedingRecords, FeedsTypes} from "@/pages/types/Types";
import BreedsRowActions from "@/pages/breeds/BreedsRowActions";
import FeedsTypesRowActions from "@/pages/feedsTypes/FeedsTypesRowActions";


interface rowActionProps {
    onEdit: (data: any) => void
    onDelete: (data: any) => void
}

export const FeedingRecordsColumns = ({onEdit, onDelete}: rowActionProps): ColumnDef<FeedingRecords>[] => {

    const columns: ColumnDef<FeedingRecords>[] = [
        {
            accessorKey: "id",
            header: "id",
        },
        {
            accessorKey: "livestockTypes",
            header: "livestockType",
            cell: ({ row }) => {
                const value: FeedingRecords = row.original
                return value.feedingFormulas.livestockTypes.name
            },
        },
        {
            accessorKey: "cattleName",
            header: "cattleName",
            cell: ({ row }) => {
                const value: FeedingRecords = row.original
                return value.cattle.name
            },
        },
        {
            accessorKey: "feedGivenKg",
            header: "feedGivenKg",
        },
        {
            accessorKey: "waterGivenLiters",
            header: "waterGivenLiters",
        },
        {
            accessorKey: "feedingTime",
            header: "feedingTime",
        },
        {
            accessorKey: "remarks",
            header: "remarks",
        },
        {
            id: "actions",
            header: 'Actions',
            cell: ({row}) => <FeedsTypesRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
        }
    ]

    return columns
}
