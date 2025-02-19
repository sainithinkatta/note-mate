import TagInput from '../../components/Input/TagInput';
import { useState, useEffect } from 'react';
import axiosInstance from "../../utils/axiosInstance";

function AddEditNotes({ 
    noteData = {},
    getAllNotes,
    onClose,
    type
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
                <label className="input-label">Title</label>
                <input
                    type="text"
                    className="text-2xl text-slate-950 outline-none"
                    placeholder="Go To Gym at 5"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">Content</label>
                <textarea
                    type="text"
                    className="text-2xl text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Content"
                    rows={10}
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>

            <div className="mt-3">
                <label className="input-label">Tags</label>
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