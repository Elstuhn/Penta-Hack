import React, { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import toast from "react-hot-toast";
import supabase from "../api/supabase";

import useAuth from "../hooks/useAuth";

function Home() {
  const { auth, setAuth } = useAuth();

  const [searchValue, setSearchValue] = useState("");
  const [searchTemp, setSearchTemp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [school, setSchool] = useState("");
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [data, setData] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [file, setFile] = useState("");
  const [selectedData, setSelectedData] = useState(null);

  const handleOpen = (data) => {
    setSelectedData(data);
    setTimeout(() => {
      document.getElementById("my-modal-5").checked = true;
    }, 100);
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      if (searchTemp === searchValue) return setIsLoading(false);

      setSearchValue(searchTemp);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTemp]);

  async function getMyPosts() {
    try {
      console.log("id", auth.user.id);
      let { data: myPosts, error } = await supabase
        .from("post")
        .select("id,sch,topic,sub,data,users(username)")
        .eq("user_id", auth.user.id);

      if (error) {
        throw error;
      }
      console.log(myPosts);
      setMyPosts(myPosts);
    } catch (error) {
      toast.error("Error fetching data");
      console.log(error);
    }
  }

  async function getData(search) {
    console.log(supabase);
    let { data: post, error } = await supabase
      .from("post")
      .select("sch,topic,sub,data,users(username),sum")
      .or(
        `data.ilike.%${search}%,topic.ilike.%${search}%,sub.ilike.%${search}%,sch.ilike.%${search}%`
      );
    console.log("ledata", post);

    if (error) {
      toast.error("Error fetching data");
      console.log("Error fetching data:", error);
    } else {
      setData(post);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (auth?.user) getMyPosts();
    if (!auth?.user) setMyPosts([]);
  }, [auth?.user]);

  useEffect(() => {
    console.log("reloading");
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
    if (!auth.user.id) return toast.error("You are not logged in!");
    if (!file || !school || !subject || !topic)
      return toast.error("Please fill all fields");
    setIsUploading(true);
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
          user_id: auth.user.id,
        }
      );

      setIsUploading(false);

      console.log(upload);

      document.getElementById("my-modal-4").checked = false;

      setFile("");
      setSchool("");
      setSubject("");
      setTopic("");

      getData(searchValue);
    } catch (error) {
      setIsUploading(false);
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
  console.log(data);

  return (
    <>
      <div
        className="grid grid-cols-2 gap-6 p-10 bg-slate-500"
        style={{ gridTemplateColumns: "70% 30%" }}
      >
        <div>
          <div className="flex flex-row">
            <div className="w-full form-control">
              <input
                type="text"
                placeholder="Search"
                className="w-full input input-bordered"
                value={searchTemp}
                onChange={(e) => {
                  setSearchTemp(e.target.value);
                }}
              />
            </div>

            {auth?.user && (
              <label htmlFor="my-modal-4" className="ml-2 btn">
                Submit a Request
              </label>
            )}
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
                        <p className="text-xl font-medium break-words">
                          {highlightSubstrings(item.topic)}
                        </p>
                      </>
                    }
                  </span>
                  <span className="justify-self-end badge badge-info">
                    {item.sub}
                  </span>
                </div>

                <p className="mb-5"> {highlightSubstrings(item.sum)}</p>
                <div className="flex justify-between font-semibold">
                  <span className="justify-self-end">
                    <span className="font-light">Posted by </span>
                    {item.users.username}
                  </span>
                  <span className="justify-self-end">{item.sch}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="mb-5 card bg-neutral text-neutral-content">
            <div className="card-body">
              {auth?.user ? (
                <h2 className="card-title">My Posts</h2>
              ) : (
                <h2 className="card-title">Login to see your posts</h2>
              )}
            </div>
          </div>
          {/* Map my posts by their topics and make them clickable which will open a model for more details */}
          {myPosts.map((post) => (
            <div key={post.id}>
              <label
                className="w-full mb-2 btn btn-ghost"
                onClick={() => handleOpen(post)}
              >
                <span className="text-zinc-800">{post.topic}</span>
              </label>
            </div>
          ))}
        </div>

        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <label htmlFor="my-modal-4" className="cursor-pointer modal">
          <label className="relative modal-box" htmlFor="">
            <h2 className="mb-3 text-xl font-bold">Create new post</h2>
            <input
              type="text"
              placeholder="School"
              className="w-full my-3 input input-bordered"
              value={school}
              onChange={(e) => {
                setSchool(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full my-3 input input-bordered"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Topic"
              className="w-full my-3 mb-6 input input-bordered"
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
                className="w-full max-w-xs file-input"
                name="file"
                id="file"
              />
              <button
                className={`btn btn-primary justify-self-end ${
                  isUploading ? "loading" : ""
                }`}
                onClick={() => handleFileUpload()}
              >
                Upload
              </button>
            </div>
          </label>
        </label>
      </div>
      {selectedData && (
        <div className="flex w-full">
          <input type="checkbox" id="my-modal-5" className="modal-toggle" />
          <label htmlFor="my-modal-5" className="w-full cursor-pointer modal">
            <label className="relative max-w-screen-xl modal-box" htmlFor="">
              <h3 className="text-lg font-bold">{selectedData?.topic}</h3>
              <p className="py-4 break-words">{selectedData?.data}</p>
            </label>
          </label>
        </div>
      )}
    </>
  );
}

export default Home;
