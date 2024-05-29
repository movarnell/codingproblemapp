import "./App.css";
import OptionsForm from "./components/OptionsForm";
import ProblemInput from "./components/ProblemInput";
import Title from "./components/Title";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// https://srv957-files.hstgr.io/d5b13bc378450195/files/public_html/codeProblems/
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
const [problem, setProblem] = useState(() => {
  const savedProblem = localStorage.getItem("problem");
  return savedProblem ? JSON.parse(savedProblem) : "";
});
const [userAnswer, setUserAnswer] = useState(() => {
  const savedUserAnswer = Cookies.get("userAnswer");
  return savedUserAnswer ? savedUserAnswer : "";
});

  useEffect(() => {
    // Save the problem to local storage whenever it changes
    if (problem) {
      localStorage.setItem("problem", JSON.stringify(problem));
    }

  }, [problem, userAnswer]);

  const [results, setResults] = useState(null);
  const [previousProblems, setPreviousProblems] = useState([
    {
      role: "system",
      content: `Make a random problem that hasn't been generated in this session previously. Meet the users promp requirements. Do not provide a solution, only the problem and the test cases. JSON format like {"problem": "description", "testCases": ["case1", "case2", "case3"]}`,
    },
  ]);

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
          setUserAnswer={setUserAnswer}
          setResults={setResults}
        />
        <div className="container-fluid flex flex-wrap items-center justify-center">
          {" "}
          <div className="row  my-5">
            <div className="px-3">
              <h2 className="text-xl font-bold">How this works</h2>
              <p>
                Choose your language, difficulty, and category. Then click
                "Generate Problem" to get a problem to solve.
              </p>
            </div>
            <div>
              <ProblemInput
                problem={problem}
                setUserAnswer={setUserAnswer}
                userAnswer={userAnswer}
                results={results}
                setResults={setResults}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
