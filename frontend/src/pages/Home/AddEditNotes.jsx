import TagInput from '../../components/Input/TagInput';
import { useState, useEffect } from 'react';
import axiosInstance from "../../utils/axiosInstance";

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

    useEffect(() => {        
        if (noteData) {
            setTitle(noteData.title || '');
            setContent(noteData.content || '');
            setTags(noteData.tags || []);
        }
    }, [noteData]);

    async function addNewNote() {
        try {
            const response = await axiosInstance.post("/notes", {
                title,
                content,
                tags,
            });
    
            if (response.data && response.data.note) {
                getAllNotes();
                setToastMessage('New Note added Successfully');
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    }

    async function updateNote() {
        try {
            const response = await axiosInstance.put(`/notes/${noteData._id}`, {
                title,
                content,
                tags,
            });

            if (response.data && response.data.note) {
                getAllNotes();
                setToastMessage('Note updated Successfully');
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    }

    function handleSaveNote() {
        if (!title) {
            setError('Please enter the title');
            return;
        }
        if (!content) {
            setError('Please enter the content');
            return;
        }
        setError('');
        type === 'edit' ? updateNote() :  addNewNote();
    }

    return (
        <div>
            <div className="flex flex-col gap-2">
                <label className="input-label text-slate-800 dark:text-gray-200">Title</label>
                <input
                    type="text"
                    className="text-2xl text-slate-950 dark:text-gray-100 outline-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-2 rounded"
                    placeholder="Go To Gym at 5"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label text-slate-800 dark:text-gray-200">Content</label>
                <textarea
                    className="text-2xl text-slate-950 dark:text-gray-100 outline-none bg-slate-50 dark:bg-gray-700 p-2 rounded border border-gray-300 dark:border-gray-600"
                    placeholder="Content"
                    rows={10}
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>

            <div className="mt-3">
                <label className="input-label text-slate-800 dark:text-gray-200">Tags</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

            <button
                className="btn-primary font-medium mt-5 p-3"
                onClick={handleSaveNote}
            >
                { type === 'edit' ? 'Edit' : 'Add' }
            </button>
        </div>
    );
}

export default AddEditNotes;