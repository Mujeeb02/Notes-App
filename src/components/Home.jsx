import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import NoteList from './NoteList';
import { loadNotes } from '../store/actions/noteAction';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes) {
      dispatch(loadNotes(savedNotes));
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen  p-8">
      <div className="mt-8 flex justify-center items-center mb-4">
        <Link to="/add" className="link px-6 py-4 bg-violet-500 text-white rounded-full text-2xl shadow-sm hover:bg-violet-600 focus:outline-none focus:bg-blue-600">
          Add A Note
        </Link>
      </div>
      <NoteList />
    </div>
  );
};

export default Home;