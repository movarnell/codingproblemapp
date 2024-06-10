import "./App.css";
import OptionsForm from "./components/OptionsForm";
import ProblemInput from "./components/ProblemInput";
import Title from "./components/Title";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Footer from "./components/Footer";

// https://srv957-files.hstgr.io/d5b13bc378450195/files/public_html/codeProblems/
//A few ideas for the app:

// -Sections for hints and feedback

// optional,
// -user registration/login
// -database to store your answer.

function App() {
  const [difficulty, setDifficulty] = useState("Very Easy");
  const [category, setCategory] = useState("conditionals");
  const [language, setLanguage] = useState("JavaScript");
  // const [problem, setProblem] = useState(() => {""});
  const [problem, setProblem] = useState(() => {
  const savedProblem = Cookies.get("problem");
  if (savedProblem) {
    try {
      return JSON.parse(savedProblem);
    } catch (error) {
      console.error("Error parsing saved problem:", error);
    }
  }
  return {};
});
  // const [userAnswer, setUserAnswer] = useState("");
 const [userAnswer, setUserAnswer] = useState(() => {
  const savedUserAnswer = Cookies.get("userAnswer");
  if (savedUserAnswer) {
    try {
      return JSON.parse(savedUserAnswer);
    } catch (error) {
      console.error("Error parsing saved user answer:", error);
    }
  }
  return "";
});
// NOTE : We need a way to save the users history, that appends to it when they are using the site, and sends it with the problems.
  useEffect(() => {
    // Save the problem to local storage whenever it changes
    if (problem) {
      Cookies.set("problem", JSON.stringify(problem), { expires: 2 });
    }
    if (userAnswer) {
      Cookies.set("userAnswer", JSON.stringify(userAnswer), { expires: 2 });
    }
  }, [problem, userAnswer]);

  const [results, setResults] = useState([]);
  const [previousProblems, setPreviousProblems] = useState([
    {
      role: "system",
      content: `Make a random problem that hasn't been generated in this session previously. Meet the users promp requirements. Do not provide a solution, only the problem and the test cases. JSON format like {"problem": "description", "testCases": ["case1", "case2", "case3"]}`,
    },
  ]);

  console.log(difficulty, category, language);

  return (
    <>
      <div className="mb-40">
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
        <div className="text-center mt-20">
          <a
            href="www.helpcodeit.com"
            className=" text-center text-xl text-blue-700 font-bold hover:underline "
          >
            Back to HelpCodeIt.com
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
