import {ColumnDef} from "@tanstack/react-table"
import {Checkbox} from "@/components/ui/checkbox"
import CattleRowActions from "@/pages/cattle/CattleRowActions";
import {Cattle} from "@/pages/types/Types";
import {differenceInYears, differenceInMonths, differenceInDays} from 'date-fns';


interface rowActionProps {
    onEdit: (data: any) => void
    onDelete: (data: any) => void
    onAddRelationShip: (data: any) => void
    onViewFamilyTree: (data: any) => void
}

export const CattleColumns = ({onEdit, onDelete,onAddRelationShip,onViewFamilyTree}: rowActionProps): ColumnDef<Cattle>[] => {
    const columns: ColumnDef<Cattle>[] = [

        {
            accessorKey: "id",
            header: "id",
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
            cell: ({row}) => {
                const dob = new Date(row.original.dateOfBirth);
                const currentDate = new Date();

                const years = differenceInYears(currentDate, dob);
                const months = differenceInMonths(currentDate, dob) % 12;
                const days = differenceInDays(currentDate, dob);

                let ageText = "";
                if (years > 0) {
                    ageText = `${years} year${years > 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''} old`;
                } else if (months > 0) {
                    ageText = `${months} month${months > 1 ? 's' : ''} old`;
                } else if (days < 30) {
                    ageText = 'Less than a month old';
                }

                return (
                    <div className="px-2  rounded-full bg-green-500 text-white">
                        {ageText}
                    </div>
                );
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
            cell: ({row}) => <CattleRowActions row={row} onEdit={onEdit} onDelete={onDelete} onAddRelationShip={onAddRelationShip} onViewFamilyTree={onViewFamilyTree}/>,
        }
    ]

    return columns
}
