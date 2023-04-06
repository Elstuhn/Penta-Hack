import React, { useState, useEffect, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import toast from "react-hot-toast";

console.log(import.meta.env.VITE_URL, import.meta.env.VITE_KEY);

const supabase = createClient(
  import.meta.env.VITE_URL,
  import.meta.env.VITE_KEY
);

function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [searchTemp, setSearchTemp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [school, setSchool] = useState("");
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [data, setData] = useState([]);
  const [file, setFile] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      if (searchTemp === searchValue) return setIsLoading(false);

      setSearchValue(searchTemp);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTemp]);

  async function getData(search) {
    let { data: post, error } = await supabase
      .from("post")
      .select()
      .or(
        `data.ilike.%${search}%,topic.ilike.%${search}%,sub.ilike.%${search}%,sch.ilike.%${search}%`
      );

    if (error) {
      toast.error("Error fetching data");
      console.log("Error fetching data:", error);
    } else {
      setData(post);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getData(searchValue);
  }, [searchValue]);

  // function usePosts(file_url) {
  //   return useQuery("posts", async () => {
  //     const { data } = await axios.post("http://127.0.0.1:5000/upload", {
  //       file_url: file_url,
  //       topic: topic,
  //       school: school,
  //       subject: subject,
  //     });
  //     return data;
  //   });
  // }

  const handleFileUpload = async () => {
    if (!file || !school || !subject || !topic)
      return toast.error("Please fill all fields");
    const docId = uuidv4();
    try {
      const { data, error } = await supabase.storage
        .from("post")
        .upload(docId, file);

      console.log(data);

      if (error) throw error;

      const { data: link } = supabase.storage.from("post").getPublicUrl(docId);

      console.log("File uploaded successfully", link.publicUrl);

      const { data: upload } = await axios.post(
        "http://127.0.0.1:5000/upload",
        {
          file_url: link.publicUrl,
          topic: topic,
          school: school,
          subject: subject,
        }
      );

      console.log(upload);

      document.getElementById("my-modal-4").checked = false;

      setFile("");
      setSchool("");
      setSubject("");
      setTopic("");

      getData(searchValue);
    } catch (error) {
      toast.error("Error uploading file");
      console.error("Error uploading file", error);
    }
  };
  console.log(file);

  const highlightSubstrings = (text) => {
    if (!searchValue) {
      return text;
    }

    const regex = new RegExp(`(${searchValue})`, "gi");

    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchValue.toLowerCase() ? (
        <span key={index} className="text-yellow-500">
          {part}
        </span>
      ) : (
        <React.Fragment key={index}>{part}</React.Fragment>
      )
    );
  };

  return (
    <div
      className="bg-slate-500 grid grid-cols-2 gap-6 p-10"
      style={{ gridTemplateColumns: "70% 30%" }}
    >
      <div>
        <div className="flex flex-row">
          <div className="form-control w-full">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-full"
              value={searchTemp}
              onChange={(e) => {
                setSearchTemp(e.target.value);
              }}
            />
          </div>

          <label htmlFor="my-modal-4" className="ml-2 btn">
            Submit a Request
          </label>
        </div>

        {data.map((item, index) => (
          <div
            key={index}
            className={`card w-full md:w-100 bg-base-100 shadow-xl mt-10  ${
              isLoading ? "animate-pulse" : ""
            }`}
          >
            <div className="card-body">
              <div className="flex justify-between">
                <span className="card-title justify-self-start">
                  {
                    <>
                      <p className="font-medium">
                        {highlightSubstrings(item.topic)}
                      </p>
                    </>
                  }
                </span>
                <span className="justify-self-end badge badge-info">
                  {item.sub}
                </span>
              </div>

              <p className=""> {highlightSubstrings(item.data)}</p>
              <div className="flex justify-end font-semibold">
                <span className="justify-self-end">{item.sch}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h2 className="text-xl font-bold mb-3">Create new post</h2>
          <input
            type="text"
            placeholder="School"
            className="input input-bordered w-full my-3"
            value={school}
            onChange={(e) => {
              setSchool(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Subject"
            className="input input-bordered w-full my-3"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Topic"
            className="input input-bordered w-full my-3 mb-6"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
            }}
          />
          <div className="flex justify-between">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                if (e.target.files[0].type !== "application/pdf") {
                  e.target.value = null;
                  return toast.error("Only pdf files are allowed");
                }

                setFile(e.target.files[0]);
              }}
              className="file-input w-full max-w-xs"
              name="file"
              id="file"
            />
            <button
              className="btn btn-primary justify-self-end"
              onClick={() => handleFileUpload()}
            >
              Upload
            </button>
          </div>
        </label>
      </label>
    </div>
  );
}

export default Home;
