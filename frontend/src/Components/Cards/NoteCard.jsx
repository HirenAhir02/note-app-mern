import React, { useState } from 'react'
import { MdOutlinePushPin } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import moment from 'moment'

function NoteCard({isPinned,onPinNote, date, title, content, tags, onEdit, onDelete}) {
  return (
    <div className='bored rounded bg-white p-4 hover:shadow-xl transition-all ease-in-out'>
        <div className='flex items-center justify-between'>
            <div>
                <h6 className='text-sm font-medium'>{title}</h6>
                <span className='text-xs text-green-700'>{moment(date).format("Do MMM YYYY")}</span>
            </div>
            
            <MdOutlinePushPin className=
            {`icon-btn ${isPinned ? "text-[#2B85FF]" : "text-slate-300"} hover:text-blue-500`} onClick={onPinNote}/>
        </div>

        <p className='text-xs text-slate-600 mt-2'>{content?.slice(0,60)+'...'}</p>

        <div className='flex items-center justify-between mt-2'>
            <div className='text-xs text-slate-500'>
                {tags.map((item) => `# ${item} `)}
            </div>

            <div className='flex items-center gap-2'>
                <IoMdCreate className="icon-btn hover:text-green-600" onClick={onEdit}/>

                <MdDeleteForever className="icon-btn hover:text-red-600" onClick={onDelete}/>
            </div>
        </div>
    </div>
  )
}

export default NoteCard