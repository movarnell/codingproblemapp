import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.success("Generating Problem...", {
        icon: "🤔",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        
      });


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
          },
          { timeout: 6000}
        );

            let data = response.data;
            console.log("Data:", data.problem.content);

            console.log("Previous Prob in GenerateProblem:", previousProblems)
      let newMessage = {
        role: "assistant",
        content: "do not repeat problems. Previous Problems: " + previousProblems + ". " + data.problem.content,
      };

      setPreviousProblems([...previousProblems, newMessage]);
      setProblem(data.problem.content);
      toast.dismiss();
    } catch (error) {
      console.error("Error executing code:", error);
      setIsLoading(false);

      toast.error(
        "Error generating problem. Please try again after a few seconds.",
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",

        }
      );
    }
  };

  return (
    <div className="flex align-middle">
      <button
        className="bg-gray-500 rounded-xl hover:bg-red-700 text-white font-bold py-0.5 px-4 mb-1 lg:ms-5 animate-jump-in animate-once animate-ease-linear animate-1000ms"
        onClick={(e) => executeCode(e)}
      >
        🚀 Generate Problem
      </button>
    </div>
  );
};
export default GenerateProblem;
