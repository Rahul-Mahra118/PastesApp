import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../Slice/PasteSlice';


export const Home = () => {
    const [title, setTitle]=useState('');
    const [textarea, setTextArea]=useState('');
    const [searchParam,setSearchParam] = useSearchParams();
    const dispatch= useDispatch();

    const pasteId= searchParam.get('pasteId');

    const allPaste=useSelector((state)=>state.paste.paste);

    useEffect(()=>{
        if(pasteId)
          { const paste=allPaste.find((p)=>p._id===pasteId)

            setTitle(paste.title)
            setTextArea(paste.content)
          }
    },[pasteId]);

    function createPaste(){
        const paste={
            title:title,
            content:textarea,
            _id:pasteId||Date.now().toString(36),
            createdAt:new Date().toISOString()
        }

      
        if(pasteId){
            //update
            dispatch(updateToPaste(paste))
        }
        else{
            //create
            dispatch(addToPaste(paste))
        }

        //aftere creation or updation
        setTitle('');
        setTextArea('');
        setSearchParam('')
    }
  return (
    <div>
    <div className='flex
    flex-row gap-3 justify-center'>
        <input
        className='p-2 rounded-2xl place-content-evenly mt-4'
         type="text"
         placeholder='enter the title'
         value={title}
         onChange={(e)=>setTitle(e.target.value)}
         
         />
         <button   onClick={createPaste}>
          
            {
                pasteId?"Update Paste":"Create Paste"
            
            } 
            </button>
            </div>
            <div className='mt-8'>
                <textarea
                className='w-72 rounded-2xl p-4'
                value={textarea}
                placeholder='enter content here'
                onChange={(e)=>setTextArea(e.target.value)}
                rows={10}
                
                />
            </div>
                
        </div>
  )
}
