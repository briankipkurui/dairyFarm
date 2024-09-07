import { Button } from '@/components/ui/button';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import React, { useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    onEdit: (value: TData) => void;
    onDelete: (value: TData) => void
}

const BreedsRowActions = <TData,>({ row, onEdit, onDelete }: DataTableRowActionsProps<TData>) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);


    const handleDropdownClose = () => {
        setIsDropdownOpen(false);
    };

    const handleAlertDialogClose = () => {
        setIsAlertDialogOpen(false);
        handleDropdownClose();
    };

    const handleDelete = () => {
        onDelete(row.original);
        handleDropdownClose();
    };
    return (
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(row.original)}>Edit</DropdownMenuItem>

                <DropdownMenuSeparator />
                <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                    <AlertDialogTrigger>delete</AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                this will delete the selected row
                                click continue to delete
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={handleAlertDialogClose}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default BreedsRowActions;
