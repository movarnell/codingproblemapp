import "./App.css";
import OptionsForm from "./components/OptionsForm";
import ProblemInput from "./components/ProblemInput";
import Title from "./components/Title";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  const [difficulty, setDifficulty] = useState("Very Easy");
  const [category, setCategory] = useState("conditionals");
  const [language, setLanguage] = useState("JavaScript");
  //NOTE - initialized problem state with a function to get the saved problem from local storage if there is one.
  const [problem, setProblem] = useState(() => {
    const savedProblem = localStorage.getItem("problem");
    if (savedProblem) {
      try {
        return JSON.parse(savedProblem);
      } catch (error) {
        console.error("Error parsing saved problem:", error);
      }
    }
    return {};
  });
  //NOTE - initialized userAnswer state with a function to get the saved user answer from local storage if there is one.
  const [userAnswer, setUserAnswer] = useState(() => {
    const savedUserAnswer = localStorage.getItem("userAnswer");
    if (savedUserAnswer) {
      try {
        return JSON.parse(savedUserAnswer);
      } catch (error) {
        console.error("Error parsing saved user answer:", error);
      }
    }
    return "";
  });
  const [results, setResults] = useState([]);
  const [previousProblems, setPreviousProblems] = useState([
    {
      role: "system",
      content: `Make a random problem that hasn't been generated in this session previously. Meet the users promp requirements. Do not provide a solution, only the problem and the test cases. JSON format like {"problem": "description", "testCases": ["case1", "case2", "case3"]}`,
    },
  ]);

  // Save the problem to local storage whenever it changes
  useEffect(() => {
    if (problem) {
      localStorage.setItem("problem", JSON.stringify(problem));
    }
    if (userAnswer) {
      localStorage.setItem("userAnswer", JSON.stringify(userAnswer));
    }
  }, [problem, userAnswer]);

  //TODO- remove console logs before deployment
  // console.log(difficulty, category, language);
  // console.log("previousProblems", previousProblems);

  return (
    <>
      <div className="pb-40 bg-gray-800 text-white">
        <ToastContainer theme="colored" position="bottom-center" />
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
            {!problem && (
              <div className="px-3">
                <h2 className="text-xl font-bold">How this works</h2>
                <p>
                  Choose your language, difficulty, and category. Then click
                  "Generate Problem" to get a problem to solve.
                </p>
              </div>
            )}
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
            className=" text-center text-xl text-white font-bold hover:underline "
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
