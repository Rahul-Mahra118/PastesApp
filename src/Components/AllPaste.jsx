import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../Slice/PasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const AllPaste = () => {
  const pastes = useSelector((state) => state.paste.paste)|| [];
  console.log(pastes);
  const [searchTerm, setSeachTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function onHandleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }
  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[400px] mt-5"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSeachTerm(e.target.value)}
      />
  
      {/* filtering the paste on the basis of input */}
      <div className="flex flex-col gap-5 mt-4">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border" key={paste?._id}>
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">
                  <button>
                    <Link to={`/?pasteId=${paste?._id}`}>edit</Link>
                  </button>


                  <button ><Link to={`/pastes/${paste?._id}`}> view</Link></button>
                  <button onClick={() => onHandleDelete(paste?._id)}>
                    delete
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);

                      toast.success("copied to clipboard");
                    }}
                  >
                    copy
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator
                          .share({
                            title: paste?.title || "Shared Content",
                            text: paste?.content,
                            url: window.location.href, // Optional: share the current page URL
                          })
                          .then(() =>
                            toast.success("Content shared successfully!")
                          )
                          .catch((error) =>
                            toast.error("Error sharing content: " + error)
                          );
                      } else {
                        toast.error(
                          "Share feature not supported on this device."
                        );
                      }
                    }}
                  >
                    share
                  </button>
                </div>
                <div>
                  <strong>{paste.createdAt}</strong>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
