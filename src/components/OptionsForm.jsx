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
      <form className="flex flex-col justify-center p-5 mx-auto text-base lg:flex-row ">
        {" "}
        <div className="flex items-center justify-center mx-2 mb-1 text-center">
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
        <div className="flex items-center justify-center mx-2 mb-1 text-center">
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
        <div className="flex items-center justify-center mx-2 mb-1 text-center">
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
          </select>
        </div>
        <div className="flex items-center justify-center mt-3">
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
        <div className="w-2/4 p-3 mx-auto border border-gray-400 rounded-lg bg-slate-700">
          <p className="flex items-center text-sm">
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
