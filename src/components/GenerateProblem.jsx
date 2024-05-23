import axios from "axios";
import { useEffect } from "react";

const GenerateProblem = ({ difficulty, category, language, setProblem, previousProblems, setPreviousProblems}) => {
  const api_key = import.meta.env.VITE_OPENAI_API_KEY;



  const executeCode = async (e) => {
    e.preventDefault();
    const prompt = "Generate Problem";

    let currentPrompt = {
      role: "user",
      content: `Generate a problem for me. I am learning the ${language} ${category} at a ${difficulty} level. Provide 3 test cases to check my solution that I can use to test my code. Do not provide a solution, only the problem and the test cases.`,
    };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [...previousProblems, currentPrompt],
          max_tokens: 150,
          temperature: 0.5,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${api_key}`,
          },
        }
      );
      let data = response.data;
      console.log("Data:", data.choices[0].message.content);


      setPreviousProblems([...previousProblems, response.data]);
      setProblem(data.choices[0].message.content);
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
}
export default GenerateProblem;
