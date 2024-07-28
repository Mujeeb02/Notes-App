import React, { useState } from 'react';

const TodoInput = ({ list, setList }) => {
  const [input, setInput] = useState("");

  const clickHandler = () => {
    if (input.trim()) {
      setList([...list, input]);
      setInput("");
    }
  };

  return (
    <div>
      <input
        onChange={(e) => setInput(e.target.value)}
        type="text"
        value={input}
        required
        placeholder='Enter your todo here'
      />
      <button onClick={clickHandler}>Submit</button>
    </div>
  );
};

export default TodoInput;
