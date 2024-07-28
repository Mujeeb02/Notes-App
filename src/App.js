import './App.css';
import { useState } from 'react';
import TodoInput from './components/todo-input';

function App() {
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const deleteHandler = (index) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  };

  const editHandler = (index) => {
    setEditIndex(index);
    setEditValue(list[index]);
  };

  const saveEditHandler = () => {
    const newList = list.map((item, index) => (index === editIndex ? editValue : item));
    setList(newList);
    setEditIndex(null);
    setEditValue('');
  };

  return (
    <div className="App">
      <TodoInput list={list} setList={setList} />
      {
        list.map((li, index) => (
          <div key={index}>
            {editIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={saveEditHandler}>Save</button>
                <button onClick={() => setEditIndex(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h1>{li}</h1>
                <button onClick={() => editHandler(index)}>Edit</button>
                <button onClick={() => deleteHandler(index)}>Delete</button>
              </div>
            )}
          </div>
        ))
      }
    </div>
  );
}

export default App;
