import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

console.log(import.meta.env.VITE_URL, import.meta.env.VITE_KEY)

const supabase = createClient(import.meta.env.VITE_URL, import.meta.env.VITE_KEY);

function Home() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState('')

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
  const handleFileUpload = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('post')
        .upload('hi', file);

      if (error) {
        throw error;
      }

      console.log('File uploaded successfully', data);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };console.log(file)

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
            Create new post
          </h3>
          <p className="py-4">
            hello world
          </p>
          <input type="file" onChange={e=>{
            setFile(e.target.files[0])
          }} name="file" id="file" />
          <button onClick={()=>handleFileUpload()}>Upload</button>
        </label>
      </label>
    </div>
  );
}

export default Home;
