import {ColumnDef} from "@tanstack/react-table"
import { Livestock} from "@/pages/types/Types";
import BreedsRowActions from "@/pages/breeds/BreedsRowActions";
import LiveStockRowActions from "@/pages/livestock/LiveStockRowActions";

interface rowActionProps {
    onEdit: (data: any) => void
    onDelete: (data: any) => void
}

export const LiveStockColumns = ({onEdit, onDelete}: rowActionProps): ColumnDef<Livestock>[] => {
    const columns: ColumnDef<Livestock>[] = [
        {
            accessorKey: "livestockId",
            header: "livestockId",
        },
        {
            accessorKey: "name",
            header: "name",
        },
        {
            id: "actions",
            header: 'Actions',
            cell: ({row}) => <LiveStockRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
        }
    ]

    return columns
}
