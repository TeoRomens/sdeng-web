import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/m/athletes/components/columns";
import { createClient } from "@/utils/supabase/server";

export async function AthletesTable() {
  const supabase = await createClient();
  let { data, error } = await supabase
      .from('athletes')
      .select()
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <DataTable data={data ?? []} columns={columns} />
  )
}