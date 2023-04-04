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
    <div
      className="bg-slate-500 grid grid-cols-2 gap-6 p-10"
      style={{ gridTemplateColumns: "70% 30%" }}
    >
      <div>
        <div className="flex flex-row">
          <h1 className="font-bold text-5xl">Greetings!</h1>
          <label htmlFor="my-modal-4" className="ml-80 btn">
            Submit a Request
          </label>
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            className="card w-full md:w-100 bg-base-100 shadow-xl mt-10"
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title">{item.sch}</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores, magnam! Magnam facilis iure laudantium esse dolorum
                tenetur recusandae dolor aut a voluptatum, tempore fuga corrupti
                illum. Ad maxime autem eos.
              </p>
            </div>
          </div>
        ))}
      </div>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
        </label>
      </label>
    </div>
  );
}

export default Body;
