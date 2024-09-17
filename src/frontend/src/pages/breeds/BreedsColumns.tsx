import {ColumnDef} from "@tanstack/react-table"
import {Checkbox} from "@/components/ui/checkbox"
import CattleRowActions from "@/pages/cattle/CattleRowActions";
import {Breeds} from "@/pages/types/Types";
import BreedsRowActions from "@/pages/breeds/BreedsRowActions";


interface rowActionProps {
    onEdit: (data: any) => void
    onDelete: (data: any) => void
}

export const BreedsColumns = ({onEdit, onDelete}: rowActionProps): ColumnDef<Breeds>[] => {
    const columns: ColumnDef<Breeds>[] = [
        {
            accessorKey: "id",
            header: "id",
        },
        {
            accessorKey: "name",
            header: "name",
        },
        {
            id: "actions",
            header: 'Actions',
            cell: ({row}) => <BreedsRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
        }
    ]

    return columns
}
