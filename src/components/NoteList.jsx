import React, { useState } from "react";
import { useSelector } from "react-redux";
import NoteItem from "./NoteItem";

const NoteList = () => {
  const [page, setPage] = useState(0);
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("title");
  const itemsPerPage = 10;

  const notes = useSelector((state) => state.notes.notes);

  const prevHandler = () => {
    if (current > 1) {
      setPage((prevPage) => prevPage - itemsPerPage);
      setCurrent((prevCurrent) => prevCurrent - 1);
    }
  };

  const nextHandler = () => {
    const maxPage = Math.ceil(displayedNotes.length / itemsPerPage);
    if (current < maxPage) {
      setPage((prevPage) => prevPage + itemsPerPage);
      setCurrent((prevCurrent) => prevCurrent + 1);
    }
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
    setPage(0);
    setCurrent(1);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase())
  );

  const displayedNotes = filteredNotes.sort((a, b) =>
    a[sort].localeCompare(b[sort])
  );

  const paginatedNotes = displayedNotes.slice(page, page + itemsPerPage);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="nav mb-6">
        <h2 className="text-2xl font-bold text-center">Your Notes</h2>
        <input
          type="text"
          placeholder="Search your notes here"
          value={search}
          onChange={searchHandler}
          className=" border border-purple-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 w-full py-6 px-4 mt-4"
        />
        <div className="flex justify-end items-center pr-[10px] mt-2">
          <label htmlFor="sort" className="mr-2 text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
          >
            <option value="title">Title</option>
            <option value="description">Description</option>
          </select>
        </div>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center ">
        {paginatedNotes.length === 0 ? (
          <p className="text-center text-gray-500">
            No notes available. Add some!
          </p>
        ) : (
          paginatedNotes.map((note) => (
            <div key={note.id} className="p-4">
              <NoteItem note={note} />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center gap-6 items-center mt-4">
        <button
          onClick={prevHandler}
          className={`h-10 w-24 rounded-lg text-white font-semibold ${
            current === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600"
          }`}
          disabled={current === 1}
        >
          Prev
        </button>
        <p className="text-2xl font-medium text-gray-800">{current}</p>
        <button
          onClick={nextHandler}
          className={`h-10 w-24  rounded-lg text-white font-semibold  ${
            current * itemsPerPage >= displayedNotes.length
              ? "bg-gray-300 cursor-not-allowed"
              : "hover:bg-purple-700 bg-purple-600"
          }`}
          disabled={current * itemsPerPage >= displayedNotes.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NoteList;
