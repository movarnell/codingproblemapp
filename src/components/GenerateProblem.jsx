import axios from "axios";
import { useEffect } from "react";

const GenerateProblem = ({
  difficulty,
  category,
  language,
  setProblem,
  previousProblems,
  setPreviousProblems,
  setResults,
  setUserAnswer,
}) => {

useEffect(() => {
  setUserAnswer("");
  setResults(null);
}, [difficulty, category, language]);

  const executeCode = async (e) => {
    e.preventDefault();
    setUserAnswer(null);
    setResults(null);

    try {
      const response = await axios.post("http://localhost:8000/generate", {
        language,
        category,
        difficulty,
        previousProblems,
      });

      let data = response.data;
      console.log("Data:", data.problem.content);

      let newMessage = {
        role: "assistant",
        content: data.problem.content,
      };

      setPreviousProblems([...previousProblems, newMessage]);
      setProblem(data.problem.content);
    } catch (error) {
      console.error("Error executing code:", error);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={(e) => executeCode(e)}
      >
        Generate Problem
      </button>
    </div>
  );
};
export default GenerateProblem;
