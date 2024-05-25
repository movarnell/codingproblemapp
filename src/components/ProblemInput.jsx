import axios from "axios";

import correct from "../assets/right.svg";
import wrong from "../assets/wrong.svg";

//INFO This is ready to test!!!

function ProblemInput({
  problem,
  setUserAnswer,
  userAnswer,
  results,
  setResults,
}) {
  console.log(problem);
  if (!problem) {
    return (
      <div>
        Awaiting your selections above, when you decide what type of problem you
        would like click the generate problem button...
      </div>
    );
  }
  let thisProblem = JSON.parse(problem);

  const api_key = import.meta.env.VITE_OPENAI_API_KEY;

  let testCases = thisProblem.testCases.map((testCase, index) => {
    return { testCase: index + 1, testCaseInput: testCase };
  });

  const testUserAnswer = async (e) => {
    setResults(null);
    e.preventDefault();
    console.log("User Answer:", userAnswer);
    const prompt =
      `run this code: ${userAnswer} and return only the output of the test for each test case and the test case number. Do not provide the problem or the solution. Only the test case number, the output of the test, and true or false if the test passed. The problem was ` +
      thisProblem.problem +
      " The test cases were " +
      JSON.stringify(testCases) +
      ". Return in JSON format with an array like [{testCase: 1, testCaseOutput: 'output', testCasePassed: true}, {testCase: 2, testCaseOutput: 'output', testCasePassed: false}, {testCase: 3, testCaseOutput: 'output', testCasePassed: true}]";

    let currentPrompt = {
      role: "user",
      content: prompt,
    };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [currentPrompt],
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
      console.log("Data:", JSON.parse(data.choices[0].message.content));
      setResults(JSON.parse(data.choices[0].message.content));
    } catch (error) {
      console.error("Error executing code:", error);
      displayError(error);
    }
  };

  return (
    <div className="container w-10/12 text-center">
      <pre className="whitespace-pre-wrap font-sans mt-5">{thisProblem.problem}</pre>
      <textarea
        className="border-2 border-black rounded-lg p-1 w-5/6 h-52 mt-5"
        value={userAnswer === null ? "" : userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-5 rounded "
        onClick={(e) => testUserAnswer(e)}
      >
        Submit
      </button>
      <br />
      <div className="font-bold">
        {results &&
          results.map((result, index) => (
            <div key={index} className="flex items-center justify-center text-lg">
              Test Case {result.testCase}: {" "}
              {thisProblem.testCases[index]} : {result.testCaseOutput}{" "}
              <img
                src={result.testCasePassed ? correct : wrong}
                className="mx-1"
              />
            </div>
          ))}
      </div>
      <pre className="whitespace-pre-wrap font-sans text-lg font-bold">
        <h3 className="font-bold text-2xl underline">Test Cases:</h3>
        {!results &&
          thisProblem.testCases.map(
            (testCase, index) => `Case ${index + 1}:  ` + testCase + "\n"
          )}
      </pre>
    </div>
  );
}
export default ProblemInput;
