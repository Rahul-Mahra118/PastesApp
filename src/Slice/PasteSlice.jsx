import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { json } from "react-router-dom";
export const PasteSlice = createSlice({
  name: "Paste",
  initialState: {
    paste: localStorage.getItem("paste")
      ? JSON.parse(localStorage.getItem("paste"))
      : [],
  },
  reducers: {
    addToPaste: (state, action) => {
      const getPaste = action.payload;
      // Check if title or content are empty or missing
      if (
        !getPaste.title ||
        getPaste.title.trim() === "" ||
        !getPaste.content ||
        getPaste.content.trim() === ""
      ) {
        toast.error("Paste  cannot be empty");
        return;
      }
      // Check if the paste with the same title or content already exists
      // some is an array method that checks if at least one element in the array meets a specified condition.
      const isDuplicate = state.paste.some(
        (paste) =>
          paste.title === getPaste.title && paste.content === getPaste.content
      );
      if (isDuplicate) {
        toast.error("This paste already exists");
        return;
      }
      state.paste.push(getPaste);
      localStorage.setItem("pastes", JSON.stringify(state.paste));
      toast("paste created successfully");
    },
    updateToPaste: (state, action) => {
       const paste=action.payload;
       const index= state.paste.findIndex((item)=>item._id===paste.id);

       if(index>=0){
        state.paste[index]=paste;
        localStorage.setItem("paste",JSON.stringify(state.paste));
        toast.success("paste updated")
       }
    },
    resetAllPaste: (state, action) => {
      state.paste=[];
      localStorage.removeItem("paste");
    },
    removeFromPaste: (state, action) => {
      // take the paste
      const pasteId=action.payload;
      console.log(pasteId)
      // match the stored paste Id with incoming paste Id then update the state array.
      const index=state.paste.findIndex((item)=>item._id===pasteId);

      if(index>=0){
        state.paste.splice(index,1);
        localStorage.setItem("paste", JSON.stringify(state.paste));
      }
      toast("paste delete successfuly")
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } =
  PasteSlice.actions;

export default PasteSlice.reducer;
