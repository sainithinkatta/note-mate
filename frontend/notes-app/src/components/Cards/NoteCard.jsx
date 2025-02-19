import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";
import pinIcon from "../../assets/pin.png";
import pinnedIcon from "../../assets/pinned.png";

function NoteCard({
    note,
    onEdit,
    onDelete,
    onPinNote
}) {    
    return (
        <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
            <div className="flex items-center justify-between">
                <div>
                    <h6 className="text-sm font-medium">{note.title}</h6>
                </div>

                <button
                    className={`icon-btn ${note.isPinned ? 'text-primary' : 'text-slate-300'}`}
                    onClick={onPinNote}
                >
                <img 
                    src={note.isPinned ? pinnedIcon: pinIcon} 
                    alt="Pin" 
                    className="w-12 h-9" 
                />
                </button>

            </div>

            <p className="text-xs text-slate-600 mt-2">
                {note.content?.slice(0, 60)}
            </p>

            <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-slate-500">
                    {
                        note.tags.map((tag) => `#${tag} `)
                    }
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={onEdit} className="icon-btn hover:text-green-600">
                        <img src={editIcon} alt="Edit" className="w-10 h-9" />
                    </button>

                    <button onClick={onDelete} className="icon-btn hover:text-red-600">
                        <img src={deleteIcon} alt="Delete" className="w-7 h-7" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NoteCard;