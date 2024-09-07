import {ColumnDef} from "@tanstack/react-table"
import {Checkbox} from "@/components/ui/checkbox"
import CattleRowActions from "@/pages/cattle/CattleRowActions";
import {Cattle} from "@/pages/types/Types";
import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';


interface rowActionProps {
    onEdit: (data: any) => void
    onDelete: (data: any) => void
}

export const CattleColumns = ({onEdit, onDelete}: rowActionProps): ColumnDef<Cattle>[] => {
    const columns: ColumnDef<Cattle>[] = [
        {
            id: "select",
            header: ({table}) => (
                <Checkbox
                    className="mx-3 "
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({row}) => (
                <Checkbox
                    className="mx-3 "
                    checked={row.getIsSelected()}
                    onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "cattleId",
            header: "cattleId",
        },
        {
            accessorKey: "name",
            header: "name",
        },
        {
            accessorKey: "sex",
            header: "sex",
        },
        {
            accessorKey: "serialNumber",
            header: "serialNumber",
        },
        {
            accessorKey: "dateOfBirth",
            header: "Age",
            cell: ({ row }) => {
                const dob = new Date(row.original.dateOfBirth);
                const currentDate = new Date();

                const years = differenceInYears(currentDate, dob);
                const months = differenceInMonths(currentDate, dob) % 12;
                const days = differenceInDays(currentDate, dob);

                if (years > 0) {
                    return `${years} year${years > 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''} old`;
                } else if (months > 0) {
                    return `${months} month${months > 1 ? 's' : ''} old`;
                } else if (days < 30) {
                    return 'Less than a month old';
                }
            },
        },
        {
            accessorKey: "breeds",
            header: "breeds",
            cell: ({row}) => {
                const value: any = row.original
                return value.breeds.name
            }
        },
        {
            accessorKey: "livestock",
            header: "livestock",
            cell: ({row}) => {
                const value: any = row.original
                return value.livestock.name
            },
        },
        {
            accessorKey: "dateDewormed",
            header: "dateDewormed",
        },
        {
            accessorKey: "dateServed",
            header: "dateServed",
        },
        {
            id: "actions",
            header: 'Actions',
            cell: ({row}) => <CattleRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
        }
    ]

    return columns
}
