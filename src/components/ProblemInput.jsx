import axios from "axios";

import React, { useRef, useState } from "react";
import correct from "../assets/right.svg";
import wrong from "../assets/wrong.svg";
import Loading from "./Loading";
import Alert from "./Alert";

//INFO This is ready to test!!!

function ProblemInput({
  problem,
  setUserAnswer,
  userAnswer,
  results,
  setResults,
}) {
  console.log("userAnswer:", userAnswer);
  const codeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userAnswerAlert, setUserAnswerAlert] = useState(false);

  console.log(problem);
  if (!problem) {
    return (
      <div>
        Please select a problem type and click the generate problem button...
      </div>
    );
  }
  let thisProblem = JSON.parse(problem);

  // let testCases = thisProblem.testCases.map((testCase, index) => {
  //   return { testCase: index + 1, testCaseInput: testCase };
  // });

  const testUserAnswer = async (e) => {
      console.log("Show user answer:", userAnswer);

    e.preventDefault();
    if (userAnswer.trim()) {
      setResults(null);
      setIsLoading(true);

      try {
        console.log("Problem:", problem);
        console.log("User Answer:", userAnswer);
        const response = await axios.post(
          "https://backend.michaelvarnell.com:8000/test",
          {
            userAnswer,
            problem,
          }
        );

        let data = response.data;
        console.log("Data:", data);

        setResults(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error executing code:", error);
        alert(
          "There was an error running your code. Please refresh the page and try again."
        );
      }
    } else {
      setUserAnswerAlert(true);
    }
  };

  console.log(results);
  return (
    <div className="container w-10/12 justify-center mx-auto">
      <pre className="whitespace-pre-wrap font-sans mt-5">
        <strong>PROBLEM:</strong> {thisProblem.problem}
      </pre>
      <br />
      {userAnswerAlert && (
        <Alert
          alertState={userAnswerAlert}
          setAlertState={setUserAnswerAlert}
          alertMessage="Please write your code before submitting."
        />
      )}
      {isLoading && (
        <Loading
          message="Running your code..."
          submessage="This may take a moment"
        />
      )}

      <strong className="mb-0 mt-5">Your Answer:</strong>
      <br />

      <textarea
        className="border-2 border-black rounded-lg p-1 w-5/6 h-52"
        value={
          userAnswer != "" || userAnswer != null || userAnswer != undefined
            ? userAnswer
            : "Write your code here..."
        }
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      {/* </code>
      </pre> */}

      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-5 rounded "
        onClick={(e) => testUserAnswer(e)}
      >
        Submit
      </button>
      <br />

      <div className="font-bold">
        <p className="font-normal">
          Your results will show beside the test case it corresponds to.{" "}
        </p>
        {results && <h3 className="font-bold text-2xl underline">Results:</h3>}
       <div className="grid grid-cols-3 gap-4 sm:grid-cols-1">
  {results && results.results.map((result, index) => {
    // console.log(result);
  return (
    <div key={index} className="text-lg flex align-middle">
      <img
        src={result.testCaseOutput === result.expectedOutput ? correct : wrong}
        className="mx-1 w-11"
      />
      <div>
         {thisProblem.testCases[index]}
        <br /> Outcome: {result.testCaseOutput}
        <br />
        {result.testCaseOutput === result.expectedOutput ? (
          <p className="text-green-500"> Passed </p>
        ) : (
          <p className="text-red-500"> Failed </p>
        )}
      </div>
    </div>
  );
}
)}
</div>

          <pre className="whitespace-pre-wrap font-sans text-lg font-bold">
            {!results && (
              <h3 className="font-bold text-2xl underline"></h3>
            )}
            {!results &&
              thisProblem.testCases.map(
                (testCase, index) => `Case ${index + 1}:  ` + testCase + "\n"
              )}
          </pre>
        </div>
      </div>

  );
}
export default ProblemInput;
