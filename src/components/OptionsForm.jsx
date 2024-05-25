import GenerateProblem from "./GenerateProblem";

function OptionsForm({
  setCategory,
  setDifficulty,
  setLanguage,
  setProblem,
  difficulty,
  category,
  language,
  previousProblems,
  setPreviousProblems,
  setResults,
}) {


  // Menu providing dropdown options to choose: Language, Difficulty, Category
  return (
    <form className="p-5 text-base mx-auto grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-4 grid-flow-row-dense">
      {" "}
      <div className="text-center flex justify-center items-center mb-1">
        <label className="font-bold">Language: </label>
        <select
          name="language"
          className="text-sm rounded-lg py-1"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
        </select>
      </div>
      <div className="text-center flex justify-center items-center mb-1">
        <label className="font-bold">Difficulty: </label>
        <select
          name="difficulty"
          onChange={(e) => setDifficulty(e.target.value)}
          className="text-sm rounded-lg py-1 "
        >
          <option value="very easy">Very Easy</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="text-center flex justify-center items-center mb-1">
        <label className="font-bold">Category: </label>
        <select
          name="category"
          className="text-sm rounded-lg py-1"
          onChange={(e) => setCategory(e.target.value)}
        >
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
        <GenerateProblem
          difficulty={difficulty}
          category={category}
          language={language}
          setProblem={setProblem}
          previousProblems={previousProblems}
          setPreviousProblems={setPreviousProblems}
          setResults={setResults}
        />
      </div>
    </form>
  );
}
export default OptionsForm;
