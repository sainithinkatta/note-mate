import { FaEdit, FaTrash, FaThumbtack } from "react-icons/fa";
import ToolTip from '../../components/ToolTip';

function NoteCard({
  note,
  onEdit,
  onDelete,
  onPinNote
}) {
  return (
    <div className="border rounded p-4 mx-2 sm:mx-0 bg-white dark:bg-gray-700 hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <h6 className="text-sm font-medium text-slate-800 dark:text-gray-200">
          {note.title}
        </h6>

        <ToolTip tooltip={note.isPinned ? 'Unpin' : 'Pin'}>
          <button
            className={`icon-btn ${note.isPinned ? 'text-primary' : 'text-slate-300'}`}
            onClick={() => onPinNote(note)}
          >
            <FaThumbtack className="w-5 h-5" />
          </button>
        </ToolTip>
      </div>

      <div className="text-xs text-slate-600 dark:text-gray-300 mt-2 overflow-hidden">
        <div
          dangerouslySetInnerHTML={{
            __html: note.content.length > 100
              ? note.content.slice(0, 100) + '…'
              : note.content
          }}
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500 dark:text-gray-400">
          {note.tags.map(tag => `#${tag} `)}
        </div>

        <div className="flex items-center gap-2">
          <ToolTip tooltip="Edit">
            <button
              className="icon-btn hover:text-green-600"
              onClick={() => onEdit(note)}
            >
              <FaEdit className="w-5 h-5" />
            </button>
          </ToolTip>

          <ToolTip tooltip="Delete">
            <button
              className="icon-btn hover:text-red-600"
              onClick={() => onDelete(note)}
            >
              <FaTrash className="w-5 h-5" />
            </button>
          </ToolTip>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;