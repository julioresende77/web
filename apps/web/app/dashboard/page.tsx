"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("generations")
      .select("*")
      .order("created_at", { ascending: false });

    setData(data || []);
  }

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold mb-4">Histórico</h1>

      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-xl"
          >
            <pre className="text-sm whitespace-pre-wrap">
              {item.output}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}