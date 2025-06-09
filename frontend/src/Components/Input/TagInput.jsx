import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";

function TagInput({tags, setTags}) {

    const [inputValue,setInputValue] = useState("")

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'  && inputValue){
            setTags([...tags, inputValue])
            setInputValue("")
        }
    }

    const handleKey = (e) => {
        if(inputValue){
            setTags([...tags, inputValue])
            setInputValue("")
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag!==tagToRemove))
    }

  return (
    <div>
        {tags?.length > 0 && (
            <div className='flex items-center gap-2 flex-wrap mt-2'>
                {
                    tags.map((tag, index)=>(
                        <span key={index} className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'>#{tag}
                        
                        <button onClick={()=>{
                            handleRemoveTag(tag);
                        }}>
                            <IoMdClose size={20} className='text-slate-500 cursor-pointer'/>
                        </button>
                        </span>
                    ))
                }
            </div>
        )}

        <div className='flex items-center gap-4 mt-3'>
            <input type="text" value={inputValue}  className='text-sm bg-slate-100 border px-3 py-2 rounded outline-none ' placeholder='Add Tags' onChange={handleInputChange} onKeyDown={handleKeyDown}/>

            <button className='w-6 h-6 flex items-center justify-center rounded border border-blue-600 hover:bg-blue-600' onClick={()=>{handleKey()}}>
                <IoMdAdd className='text-2xl text-blue-600 hover:text-white cursor-pointer'/>
            </button>
        </div>
    </div>
  )
}

export default TagInput