import "./App.css";
import OptionsForm from "./components/OptionsForm";
import ProblemInput from "./components/ProblemInput";
import Title from "./components/Title";
import { useState } from "react";
//A few ideas for the app:

// -Basic layout ie. header, footer, body content, grid/flex
// -Form for problem creation
// -Submit button
// -Sections for hints and feedback
// -API implementation

// optional,
// -user registration/login
// -database to store your answer.

function App() {
  const [difficulty, setDifficulty] = useState("very easy");
  const [category, setCategory] = useState("array");
  const [language, setLanguage] = useState("JavaScript");
  const [problem, setProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [previousProblems, setPreviousProblems] = useState([
            {
              role: "system",
              content: `Make a random problem that hasn't been generated in this session previously. Meet the users promp requirements. Do not provide a solution, only the problem and the test cases.`,
            }]);

  console.log(difficulty, category, language);

  return (
    <>
      <div>
        <Title />
        <OptionsForm
          setCategory={setCategory}
          setDifficulty={setDifficulty}
          setLanguage={setLanguage}
          setProblem={setProblem}
          difficulty={difficulty}
          category={category}
          language={language}
          previousProblems={previousProblems}
          setPreviousProblems={setPreviousProblems}
        />
        <div className="container-fluid mx-3">
          <div className="row grid grid-cols-2 my-5 gap-2">
            <div className="px-3">
              <h2 className="text-xl font-bold">How this works</h2>
              <p>
                Choose your language, difficulty, and category. Then click
                "Generate Problem" to get a problem to solve.
              </p>
            </div>
            <div></div>
          </div>
          <div className="row">
            <ProblemInput problem={problem} setUserAnswer={setUserAnswer} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
