import mongoose from "mongoose";

const noteschema = new mongoose.Schema({
    title:{
        type : String,
        require : true
    },
    content:{
        type : String,
        require : true
    },
    tags:{
        type : [String],
        default:[]
    },
    isPinned:{
       type:Boolean,
       default:false
    },
    userId:{
        type : String,
        require : true
    },
    createdAt:{
        type : Date,
        default:Date.now()
    }
})

const Note = mongoose.model("Note",noteschema)

export default Note;