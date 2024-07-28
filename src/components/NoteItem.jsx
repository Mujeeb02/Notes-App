// NoteItem.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote, toggleNote } from '../store/actions/noteAction';
import { FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';
import EditNoteModal from './EditNoteModal';

const NoteItem = ({ note }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    dispatch(deleteNote(note.id));
  };

  const handleToggle = () => {
    dispatch(toggleNote(note.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  return (
    <div className="w-[200px] bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col hover:bg-violet-200	cursor-pointer">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-slate-700	">{note.title}</h3>
          <p className="text-sm text-gray-600">{note.description}</p>
        </div>

      </div>
      <div className="flex justify-end mt-4">
        <span className={`px-2 py-1 text-[10px] rounded`}>
          {note.date}
        </span>
        <button onClick={handleEdit} className="text-yellow-500 hover:text-yellow-600 mx-1">
          <FaEdit size={20} />
        </button>
        <button onClick={handleDelete} className="text-red-500 hover:text-red-600 mx-1">
          <FaTrash size={20} />
        </button>
      </div>
      {isEditing && (
        <EditNoteModal
          isOpen={isEditing}
          onRequestClose={closeEditModal}
          note={note}
        />
      )}
    </div>
  );
};

export default NoteItem;
