import GenerateProblem from "./GenerateProblem";
import alert from "../assets/alert.svg";
import { toast, Bounce } from "react-toastify";

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
    <div>
      <form className="p-5 text-base mx-auto flex justify-center flex-col lg:flex-row ">
        {" "}
        <div className="text-center flex justify-center items-center mb-1 mx-2">
          <label className="font-bold">Language: </label>
          <select
            name="language"
            className="text-sm rounded-xl py-0.5 ms-2 text-black"
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="JavaScript">JavaScript</option>
            <option disabled>May be more later</option>
          </select>
        </div>
        <div className="text-center flex justify-center items-center mb-1 mx-2">
          <label className="font-bold">Difficulty: </label>
          <select
            name="difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
            className="text-sm rounded-xl py-0.5 ms-2 text-black"
          >
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="text-center flex justify-center items-center mb-1 mx-2">
          <label className="font-bold">Category: </label>
          <select
            name="category"
            className="text-sm rounded-xl py-0.5 ms-2 text-black"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="basic fundamentals">Fundamentals</option>
            <option value="conditionals">Conditionals</option>
            <option value="arrays">Arrays</option>
            <option value="functions">Functions</option>
            <option value="strings">Strings</option>
            <option value="loops">Loops</option>
            <option value="objects">Objects</option>
            <option value="sorting">Sorting</option>
            <option value="totally random topic for problem">RANDOM</option>
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
      {category === "loops" && (
        <div className="mx-auto w-2/4 border border-gray-400 rounded-lg p-3 bg-slate-700">
          <p className="text-sm flex items-center">
            <strong>
              <img className="me-12" src={alert} alt="Alert icon" width={40} />{" "}
            </strong>{" "}
            Loops problems may be picky about the exact output. If you're having
            trouble, Check to see if the expected output matches your output, if it matches then you are correct. If it doesn't match, try again.
          </p>
        </div>
      )}
    </div>
  );
}
export default OptionsForm;
