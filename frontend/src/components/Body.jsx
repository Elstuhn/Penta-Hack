import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cwoqhbnsiqcvlwypmeaq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3b3FoYm5zaXFjdmx3eXBtZWFxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDU4Njk4NywiZXhwIjoxOTk2MTYyOTg3fQ.usQwUGoRsjZQG6W4L8oTpVs0XE9FS4G_rM-0DHVnmpI";

const supabase = createClient(supabaseUrl, supabaseKey);

function Body() {
  const [data, setData] = useState([]);

  async function getData() {
    let { data: post, error } = await supabase.from("post").select("*");

    console.log(post);

    if (error) {
      console.log("Error fetching data:", error);
    } else {
      setData(post);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6 p-10">
      {data.map((item, index) => (
        <div key={index} className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title">{item.sch}</h2>
            <p>{item.topic}</p>
            <div className="card-actions">
              <button className="btn btn-primary">{`$${item.sub}`}</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Body;
