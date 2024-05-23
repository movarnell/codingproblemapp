function OptionsForm() {
    
  // Menu providing dropdown options to choose: Language, Difficulty, Category
  return (
    <form className="p-5 text-base mx-auto grid grid-cols-4">
      <div className="text-center flex justify-center items-center">
        <label className="font-bold">Language: </label>
        <select name="language" className="text-sm rounded-lg py-1 ">
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
        </select>
      </div>

      <div className="text-center flex justify-center items-center">
        <label className="font-bold">Difficulty: </label>
        <select name="difficulty" onChange={() => setDifficulty()} className="text-sm rounded-lg py-1  ">
          <option value="very easy">Very Easy</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="text-center flex justify-center items-center">
        <label className="font-bold">Category: </label>
        <select name="category" className="text-sm rounded-lg py-1  ">
          <option value="array">Array</option>
          <option value="string">String</option>
          <option value="math">Math</option>
          <option value="loops">Loops</option>
          <option value="functions">Functions</option>
          <option value="objects">Objects</option>
          <option value="random">RANDOM</option>
        </select>
      </div>
      <div className="flex justify-center items-center">
        <button className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-0.5 px-3 rounded">
          Generate Problem
        </button>
      </div>
    </form>
  );
}
export default OptionsForm;
