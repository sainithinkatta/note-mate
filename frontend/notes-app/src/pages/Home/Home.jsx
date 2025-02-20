import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import EmptyCard from '../../components/Cards/EmptyCard';
import ToastMessage from '../../components/ToastMessage';
import AddEditNotes from './AddEditNotes';
import Modal from '../../components/Modal/Modal';
import { useEffect, useState } from 'react';
import  axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: 'add',
        data: null,
    });

    const [allNotes, setAllNotes] = useState([]);
    const [error, setError] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [toastMessage, setToastMessage] = useState('');

    function handleModalClose() {
        setOpenAddEditModal({
            isShown: false,
        });
    }

    async function onSearchNote(query) {
        try {
            const response = await axiosInstance.get('/notes/search', {
                params: { query }
            });
    
            if (response.data && response.data.notes) {
                if (!response.data.notes.length) {
                    setToastMessage('No Results Found');
                }
    
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    }

    async function getUserInfo () {
        try {
            const response = await axiosInstance.get('/get-user');
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate('/login');
            }
        }
    }

    async function getAllNotes() {
        try {
            const response = await axiosInstance.get("/notes");
    
            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    }

    function handleNoteEdit (note) {
        setOpenAddEditModal({
            isShown: true,
            type: 'edit',
            data: note,
        });
    }

    async function deleteNote(note) {
        try {
            const response = await axiosInstance.delete(`/notes/${note._id}`);

            if (response.data && response.data.notes) {
                setToastMessage('Note Deleted successfully');
                getAllNotes();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    }

    async function toogleNotePin(note) {
        try {
            const response = await axiosInstance.put(`/notes/${note._id}/pin`, {
                isPinned: !note.isPinned
            });

            if (response.data && response.data.note) {
                setToastMessage('Note updated successfully');
                getAllNotes();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    }

    useEffect(() => {
        getUserInfo();
        getAllNotes();
    }, [])

    return (
        <>
            <Navbar userInfo={userInfo} onSearchNote={onSearchNote}/>

            { error && <p className="text-red-500 text-xs pt-4 text-center">{error}</p> }
            
            {
                toastMessage && 
                <ToastMessage 
                    toastMessage={toastMessage} 
                    onClose={() => setToastMessage('')} 
                />
            }

            <div className="container mx-auto">
                {
                    allNotes.length > 0 ? (
                        <div className="grid grid-cols-3 gap-4 mt-8">
                            {allNotes.map((note) => (
                                <NoteCard
                                    key={note._id}
                                    note={note}
                                    onEdit={handleNoteEdit}
                                    onDelete={deleteNote}
                                    onPinNote={toogleNotePin}
                                />
                            ))}
                        </div>
                    ) :
                    (
                        <EmptyCard/>
                    )
                }
            </div>

            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
                onClick={() => {
                    setOpenAddEditModal({
                        isShown: true,
                        type: 'add',
                        data: null,
                    });
                }}
            >
                <span className="text-white">Add</span>
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onClose={handleModalClose}
                style={{
                    overlay: {
                        backgroundColor: 'rgdb(0,0,0,0,2',
                    },
                }}
                contentLabel=""
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
            >
                <AddEditNotes
                    noteData={openAddEditModal.data}
                    getAllNotes={getAllNotes}
                    type={openAddEditModal.type}
                    setToastMessage={setToastMessage}
                    onClose={() => {
                        setOpenAddEditModal({
                            isShown: false,
                            type: 'add',
                            data: null,
                        });
                    }}
                />
            </Modal>
        </>
    );
}

export default Home;