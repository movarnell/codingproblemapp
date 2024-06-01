import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUserAnswer("");
    setResults(null);
  }, [difficulty, category, language]);

  const executeCode = async (e) => {
    e.preventDefault();
    setUserAnswer("");
    setResults(null);
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://backend.michaelvarnell.com:8000/generate",
        {
          language,
          category,
          difficulty,
          previousProblems,
        }
      );

      let data = response.data;
      console.log("Data:", data.problem.content);

      let newMessage = {
        role: "assistant",
        content: data.problem.content,
      };

      setPreviousProblems([...previousProblems, newMessage]);
      setProblem(data.problem.content);
      setIsLoading(false);
    } catch (error) {
      console.error("Error executing code:", error);
    }
  };

  return (
    <div className="flex align-middle">
      {isLoading && (
        <Loading message="Generating Problem" submessage="This may take a second..."/>
      )}
      <button
        className="bg-gray-700 rounded-xl hover:bg-blue-700 text-white font-bold py-2 px-4 lg:ms-5"
        onClick={(e) => executeCode(e)}
      >
        Generate Problem
      </button>
    </div>
  );
};
export default GenerateProblem;
