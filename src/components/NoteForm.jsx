// NoteForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../store/actions/noteAction';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const date=dayjs(new Date()).format("DD MMM YYYY hh:mm A");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;
    dispatch(addNote({ title, description,date}));
    setTitle('');
    setDescription('');
    navigate('/');
  };

  return (
    <div className='flex justify-center h-screen mt-16'>
    <form onSubmit={handleSubmit} className="flex flex-col w-[40%] my-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new note..."
        className="px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:border-purple-500 transition duration-300 ease-in-out mb-2"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description..."
        className="px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:border-purple-500 transition duration-300 ease-in-out mb-2"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-purple-500  text-white rounded-md shadow-sm hover:bg-purple-600 focus:outline-none focus:bg-blue-600 transition duration-300 ease-in-out">
        Add Note
      </button>
    </form>
    </div>
  );
};

export default NoteForm;