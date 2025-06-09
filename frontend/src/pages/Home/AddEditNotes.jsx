import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import TagInput from '../../Components/Input/TagInput';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddEditNotes({onClose, noteData, type,getAllNotes}) {
    const [title,setTitle] = useState(noteData?.title || "")
    const [content, setContent] = useState(noteData?.content || "")
    const [tags, setTags] = useState(noteData?.tags || [])
    const [error, setError] = useState("")

    const editNote = async() => {
        const noteId = noteData._id

        try {
            const res =await axios.post("http://localhost:3000/api/note/edit/"+noteId,{title,content,tags},{withCredentials:true})

            if(res.data.success === false){
                console.log(res.data.message);
                setError(res.data.message)
                toast.error(res.data.message)
                return
            }

            toast.success(res.data.message)
            getAllNotes()
            onClose()
        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
            setError(error.message)
        }
    }

    const addNewNote = async() => {
        try {
            const res =await axios.post("http://localhost:3000/api/note/add",{title,content,tags},{withCredentials:true})

            if(res.data.success === false){
                console.log(res.data.message);
                setError(res.data.message)
                toast.error(res.data.message)
                return
            }

            toast.success(res.data.message)
            getAllNotes()
            onClose()
        } catch (error) {
            toast.error(res.message)
            console.log(error.message);
            setError(error.message)
        }
    }

    const handleAddNote = () => {
        if(!title){
            setError("Please enter title")
            return
        }

        if(!content){
            setError("Please enter content")
            return
        }

        setError("")

        if(type === 'edit'){
            editNote()
        }else {
            addNewNote()
        }
    }

  return (
    <div className='relative'>
        <button onClick={onClose} className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50 cursor-pointer'>
            <IoMdClose className='text-xl text-slate-400' />
        </button>

        <div className='flex flex-col gap-2'>
            <label className='input-label text-red-400 uppercase'>Title</label>

            <input type="text" placeholder='wake up at 6 a.m' className='text-2xl bg-slate-100 border rounded p-1 text-slate-950 outline-none' value={title} onChange={(e)=> setTitle(e.target.value)}/>
        </div>

        <div className='flex flex-col gap-2 mt-2'>
        <label className='input-label text-red-400 uppercase'>Content</label>

        <textarea type="text" className='text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded border' placeholder='content...' rows={10} value={content} onChange={(e)=> setContent(e.target.value)}></textarea>
        </div>

        <div className='mt-3'>
            <label className='input-label text-red-400 uppercase'>Tags</label>
            <TagInput tags={tags} setTags={setTags} />
        </div>

        {error && <p className='text-red-600 text-xs pt-4'>{error}</p>}

        <button className='btn-primary font-medium mt-5 p-3 cursor-pointer' onClick={handleAddNote}>
            {type ==="edit" ? "UPDATE" : "ADD"}
        </button>
       
    </div>
  )
}

export default AddEditNotes