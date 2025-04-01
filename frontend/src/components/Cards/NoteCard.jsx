import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";
import pinIcon from "../../assets/pin.png";
import pinnedIcon from "../../assets/pinned.png";
import ToolTip from '../../components/ToolTip';

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

                <ToolTip tooltip={note.isPinned ? 'Unpin': 'Pin'}>
                    <button
                        className={`icon-btn ${note.isPinned ? 'text-primary' : 'text-slate-300'}`}
                        onClick={() => {
                            onPinNote(note)
                        }}
                    >
                        <img 
                            src={note.isPinned ? pinnedIcon: pinIcon}
                            alt="Pin" 
                            className="w-12 h-9" 
                        />
                    </button>
                </ToolTip>

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
                    <ToolTip tooltip="Edit">
                        <button 
                            className="icon-btn hover:text-green-600"
                            onClick={() =>{
                                onEdit(note)
                            }} 
                        >
                            <img src={editIcon} alt="Edit" className="w-10 h-9" />
                        </button>
                    </ToolTip>

                    <ToolTip tooltip="Delete">
                        <button 
                            className="icon-btn hover:text-red-600"
                            onClick={() => {
                                onDelete(note)
                            }}
                        >
                            <img src={deleteIcon} alt="Delete" className="w-7 h-7" />
                        </button>
                    </ToolTip>
                </div>
            </div>
        </div>
    );
}

export default NoteCard;