import React, {Suspense} from "react";
import { AthletesTable }  from "@/app/m/athletes/components/athletes-table";

export default function Page() {

  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Athletes</h2>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <AthletesTable />
      </Suspense>
    </div>
  )
}
