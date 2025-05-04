import { useState, useEffect, useRef } from 'react';
import { FiBold, FiItalic } from 'react-icons/fi';
import TagInput from '../../components/Input/TagInput';
import axiosInstance from '../../utils/axiosInstance';

function AddEditNotes({
  noteData = {},
  getAllNotes,
  onClose,
  type,
  setToastMessage
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
    if (noteData) {
      setTitle(noteData.title || '');
      setContent(noteData.content || '');
    }
    setTags(noteData?.tags || []);
  }, [noteData]);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const handleInput = () => {
    setContent(editorRef.current.innerHTML);
  };

  const exec = (command) => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
    setContent(editorRef.current.innerHTML);
  };

  const handleBoldClick = () => exec('bold');
  const handleItalicClick = () => exec('italic');

  const saveNote = async () => {
    if (!title.trim()) {
      setError('Please enter the title');
      return;
    }
    if (!content.trim()) {
      setError('Please enter the content');
      return;
    }
    setError('');
    const payload = { title, content, tags };

    try {
      const res = type === 'edit'
        ? await axiosInstance.put(`/notes/${noteData._id}`, payload)
        : await axiosInstance.post('/notes', payload);

      if (res.data?.note) {
        getAllNotes();
        setToastMessage(type === 'edit' 
          ? 'Note updated successfully' 
          : 'New note added successfully');
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message 
        || 'An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div>
      {/* Title */}
      <div className="flex flex-col gap-2">
        <label className="text-black dark:text-gray-200">Title</label>
        <input
          type="text"
          className="text-xl text-slate-950 dark:text-gray-100 outline-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-2 rounded"
          placeholder="Enter note title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-black dark:text-gray-200">Content</label>
        <div className="relative min-h-[200px]">
          {/* Placeholder */}
          { !content && (
            <span className="absolute left-3 top-2 text-slate-400 dark:text-gray-500 pointer-events-none select-none">
              Enter note content...
            </span>
          )}

          {/* Content Editable */}
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            className="min-h-[200px] text-xs text-slate-800 dark:text-gray-100 outline-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-2 rounded"
          />
        </div>


        <div>
          <button
            type="button"
            onClick={handleBoldClick}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            aria-label="Bold"
          >
            <FiBold size={16} />
          </button>
          <button
            type="button"
            onClick={handleItalicClick}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            aria-label="Italic"
          >
            <FiItalic size={16} />
          </button>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-3">
        <label className="text-black dark:text-gray-200">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      {/* Save Button */}
      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={saveNote}
      >
        {type === 'edit' ? 'Edit' : 'Add'}
      </button>
    </div>
  );
}

export default AddEditNotes;