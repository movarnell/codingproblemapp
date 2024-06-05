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
  setUserAnswer,
}) {
  // Menu providing dropdown options to choose: Language, Difficulty, Category
  return (
    <form className="p-5 text-base mx-auto flex justify-center flex-col lg:flex-row">
      {" "}
      <div className="text-center flex justify-center items-center mb-1 mx-2">
        <label className="font-bold">Language: </label>
        <select
          name="language"
          className="text-sm rounded-xl py-0.5 ms-2"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="C++">C++</option>
          <option value="C#">C#</option>
          <option value="Ruby">Ruby</option>
          <option value="Swift">Swift</option>

        </select>
      </div>
      <div className="text-center flex justify-center items-center mb-1 mx-2">
        <label className="font-bold">Difficulty: </label>
        <select
          name="difficulty"
          onChange={(e) => setDifficulty(e.target.value)}
          className="text-sm rounded-xl py-0.5 ms-2"
        >
          <option value="very easy">Very Easy</option>
          <option value="easy">Easy</option>
          <option value="simple">Simple</option>
          <option value="medium">Medium</option>
          <option value="moderate">Moderate</option>
          <option value="hard">Hard</option>
          <option value="very hard">Very Hard</option>
        </select>
      </div>
      <div className="text-center flex justify-center items-center mb-1 mx-2">
        <label className="font-bold">Category: </label>
        <select
          name="category"
          className="text-sm rounded-xl py-0.5 ms-2"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="problem from any category">RANDOM</option>
          <option value="conditionals">Conditionals</option>
          <option value="arrays">Arrays</option>
          <option value="strings">Strings</option>
          <option value="loops">Loops</option>
          <option value="functions">Functions</option>
          <option value="objects">Objects</option>
          <option value="math">Math</option>
          <option value="sorting">Sorting</option>
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
          setUserAnswer={setUserAnswer}
        />
      </div>
    </form>
  );
}
export default OptionsForm;
