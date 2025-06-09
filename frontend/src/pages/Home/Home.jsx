import React, { useEffect, useState } from 'react'
import NoteCard from '../../Components/Cards/NoteCard'
import { IoMdAdd } from "react-icons/io";
import Modal from 'react-modal'
import AddEditNotes from './AddEditNotes';
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Navbar from '../../Components/Navbar'
import axios from 'axios';
import { toast } from 'react-toastify';
import EmptyCard from '../../Components/EmptyCard/EmptyCard';
import { isPending } from '@reduxjs/toolkit';

function Home() {
  const {currentUser, loading, errorDispatch} = useSelector(
    (state) => state.user
  )

  const [UserInfo,setUserInfo] = useState(null)
  const [allNotes,setAllNotes] = useState([])

  const [isSearch,setIsSearch] = useState(false)

  // console.log(allNotes);

  const navigate = useNavigate()

  const [openAddEditModel,setOpenEditModel] = useState({
    isShow: false,
    type : "add",
    data : null,
  })

  useEffect(()=>{
    if(currentUser === null || !currentUser){
      navigate("/login")
    } else {
      setUserInfo(currentUser?.rest)
      getAllNotes()
    }
  },[])

  // get all notes 
  const getAllNotes = async ()=>{
    try {
        const res = await axios.get("http://localhost:3000/api/note/all",{withCredentials:true})

        if(res.data.success === false){
          console.log(res.data);
          return
        }

        setAllNotes(res.data.notes)
    } catch (error) {
      console.log(error);
    }
  }


  const handleEdit = (noteDetails) => {
    setOpenEditModel({isShow: true, data: noteDetails, type:"edit"})
  }

  //Delete note
  const deleteNote =async(data)=>{
    const noteId = data._id 

    try {
      const res= await axios.delete("http://localhost:3000/api/note/delete/"+ noteId ,{withCredentials:true})

      if(res.data.success === false){
        toast.error(res.data.message)
        return
      }

      toast.success(res.data.message)
      getAllNotes()
    } catch (error) {
       toast.error(error.message);
    }
  }

  const onSearchNote =async (query)=>{
    try {
      const res =await axios.get("http://localhost:3000/api/note/search",{params: {query},
      withCredentials:true})

      if(res.data.message === false){
        console.log(res.data.message);
        toast.error(res.data.message)
        return
      }

      setIsSearch(true)
      setAllNotes(res.data.notes)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleClearSearch = ()=>{
    setIsSearch(false)
      getAllNotes()
  }

  const updateIsPinnded =async(noteData)=>{
    const noteId = noteData._id

    try {
      const res= await axios.put("http://localhost:3000/api/note/update-note-pinned/"+noteId,{isPending: !noteData.isPinned},{withCredentials:true})

      if(res.data.success === false){
        toast.error(res.data.message)
        return
      }

      toast.success(res.data.message)
      getAllNotes()
    } catch (error) {
        console.log(error.message);
    }
  }
  return (
    <>
    <Navbar userInfo={UserInfo} onSearchNote={onSearchNote}  
    handleClearSearch={handleClearSearch}/>
    <div className='container mx-auto px-4 py-6'>
  {allNotes.length > 0 ? (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {allNotes.map((note, index) => (
        <div
          key={note._id}
          // className='bg-white p-4 rounded-xl shadow hover:shadow-xl transition-all duration-300 ease-in-out animate-pulse hover:animate-none'
        >
          <NoteCard
            title={note.title}
            date={note.createdAt}
            content={note.content}
            tags={note.tags}
            isPinned={note.isPinned}
            onEdit={() => {
              handleEdit(note)
            }}
            onDelete={() => {
              deleteNote(note)
            }}
            onPinNote={() => {
              updateIsPinnded(note)
            }}
          />
        </div>
      ))}
    </div>
  ) : (
    <EmptyCard
      imgSrc={
        isSearch
          ? 'https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6643.jpg'
          : 'https://www.shutterstock.com/image-vector/note-paper-pin-binder-clip-600nw-1922197595.jpg'
      }
      message={
        isSearch
          ? 'Oops! No Notes Found matching your search'
          : `Ready to capture your ideas? Click the 'Add' button to start noting down your thoughts, inspiration and reminders. Let's get started!`
      }
    />
  )}
</div>

<button
  className='fixed right-6 bottom-6 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center bg-[#2B85FF] hover:bg-blue-600 shadow-2xl cursor-pointer z-40'
  onClick={() => {
    setOpenEditModel({ isShow: true, type: 'add', data: null });
  }}
>
  <IoMdAdd className='text-white text-[28px] md:text-[32px]' />
</button>

      <Modal 
      isOpen={openAddEditModel.isShow} 
      onRequestClose={()=> {}} 
      style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
      }}
      contentLabel=''
      className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes 
        onClose={()=> setOpenEditModel({isShow:false,type:"add",data:null})} 
        noteData={openAddEditModel.data}
        type={openAddEditModel.type}
        getAllNotes={getAllNotes}
        />

      </Modal>
    </>
  )

  
}

export default Home