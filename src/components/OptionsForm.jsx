import React, { useState } from 'react';

const OptionsForm = () => {
  const [language, setLanguage] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [problemType, setProblemType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Connect API Logic Here
    console.log({ language, difficulty, problemType });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="flex-grow md:flex-grow-0 min-w-fit p-2 border rounded pe-7"
        >
          <option value="">Select Language</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="flex-grow md:flex-grow-0 min-w-fit p-2 border rounded pe-7"
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select
          value={problemType}
          onChange={(e) => setProblemType(e.target.value)}
          className="flex-grow md:flex-grow-0 min-w-fit p-2 border rounded pe-7"
        >
          <option value="">Select Problem Type</option>
          <option value="fundamentals">Fundamentals</option>
            <option value="arrays">Arrays</option>
            <option value="strings">Strings</option>
            <option value="loops">Loops</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Generate Problem
        </button>
      </div>
    </form>
  );
};

export default OptionsForm;