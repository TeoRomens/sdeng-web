"use server";

import { createClient } from "@/utils/supabase/server";
import {Tables} from "@/utils/supabase";

export async function getAthletes(): Promise<{ data: Tables<"athletes">[]; error: string | null }> {
  const supabase = await createClient();
  const { data, error } = await supabase
      .from('athletes')
      .select();

  if (error) {
    return { data: [], error: error.message };
  }

  return { data: data ?? [], error: null };
}
