import Note from "../models/note.model.js"
import errorHandler from "../utils/error.js"; // ✅ correct for default export


export const addNote =async(req,res,next) => {
    const {title,content,tags} = req.body

    const {id} = req.user 

    if(!title){
        return next(errorHandler(400,"Title is Required"))
    }

    if(!content){
        return next(errorHandler(400,"content is Required"))
    }


    try {
        const note = new Note({
            title,
            content,
            tags : tags || [],
            userId : id
        })

        await note.save()

        res.status(201).json({
            success: true,
            message:"Note added successfuly !",
            note
        })
    } catch (error) {
        next(error)
    }
}

export const editNote = async(req,res,next) => {
    const note = await Note.findById(req.params.noteId)

    if(!note){
        return next(errorHandler(404,"Note not Found"))
    }

    if(req.user.id !== note.userId){
        return next(errorHandler(401,"You can only update  own note !"))
    }

    const {title,content,tags,isPinned} = req.body;

    if(!title && !content && !tags){
        return next(errorHandler(404,"Not changes provided"))
    }

    try {
        if(title){
            note.title = title
        }
        if(content){
            note.content = content
        }
        if(tags){
            note.tags = tags
        }
        if(isPinned){
            note.isPinned = isPinned
        }

        await note.save()

        res.status(200).json({
            success:true,
            message:"Note updated successfuly",
            note
        })
    } catch (error) {
        next(error)
    }
}

export const getAllNotes =async(req,res,next) =>{
    const userID = req.user.id

    try {
        const notes  = await Note.find({userId: userID}).sort({isPinned: -1})

        res.status(200).json({
            success:true,
            message:"All notes retrived successfuly !",
            notes,
        })
    } catch (error) {
        next(error)
    }
}

export const deleteNote =async(req,res,next) => {
    const  noteID = req.params.noteId
   
    const note = await Note.findOne({_id: noteID, userId:  req.user.id})

    if(!note){
        return next(errorHandler(404,"Note not Fond"))
    }

    try {
        await Note.deleteOne({_id: noteID, userId:  req.user.id})

        res.status(200).json({
            success:true,
            message:"Note delete succesfully !"
        })
    } catch (error) {
        next(error)
    }
}

export const updateNotePinned = async(req,res,next) => {
    try {
        const note = await Note.findById(req.params.noteId)

        if(!note){
            return next(errorHandler(404,"Note not Found !"))
        }

        if(req.user.id !== note.userId){
            return next(errorHandler(401,"You can only upadate your own note !"))
        }

        const {isPinned} = req.body;

        note.isPinned = isPinned

        await note.save()

        res.status(200).json({
            success:true,
            message:"Note updated successfuly !",
            note
        })

    } catch (error) {
        next(error)
    }
}

export const searchNote = async(req,res,next) => {
    const {query} = req.query

    if(!query){
        return next(errorHandler(404,"Search query is required"))
    }

    try {
        const matchingNotes= await Note.find({
            userId: req.user.id,
            $or:[
                {title: {$regex: new RegExp(query, "i")}},
                {content: {$regex: new RegExp(query, "i")}}
            ]
        })

        res.status(200).json({
            success:true,
            message:"Notes matching the search query retrived successfuly!",
            notes:matchingNotes
        })
    } catch (error) {
        next(error)
    }
}