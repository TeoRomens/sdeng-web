"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Checkbox } from "@/components/ui/checkbox";
import { Tables } from "@/utils/supabase";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";


export const columns: ColumnDef<Tables<"athletes">>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "nome",
    accessorFn: (row) => row.firstname + row.lastname,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <span className="max-w-[500px] truncate font-medium">
            {row.original.lastname} {row.original.firstname}
          </span>
        </div>
      )
    },
  },
  {
    id: "codice fiscale",
    accessorKey: "tax_id",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Codice Fiscale" />
    ),
    cell: ({ row }) => {
      return (
          <div className="flex items-center space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.original.tax_id}
            </span>
          </div>
      )
    },
    enableSorting: false,
  },
  {
    id: "mail",
    accessorFn: (row) => row.email,
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mail" />
    ),
    cell: ({ row }) => {
      return (
          <div className="flex items-center space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("mail")}
          </span>
          </div>
      )
    },
    enableSorting: false
  },
  {
    id: "telefono",
    accessorFn: (row) => row.phone,
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Telefono" />
    ),
    cell: ({ row }) => {
      return (
          <div className="flex items-center space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.phone}
          </span>
          </div>
      )
    },
    enableSorting: false
  },
  {
    id: "data di nascita",
    accessorFn: (row) => row.birthdate,
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data di Nascita" />
    ),
    cell: ({ row }) => {
      return (
          <div className="flex items-center space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.birthdate}
          </span>
          </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableHiding: false,
  },
]
