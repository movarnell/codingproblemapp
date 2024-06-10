import axios from "axios";
import React, { useRef, useState } from "react";
import correct from "../assets/right.svg";
import wrong from "../assets/wrong.svg";
import Loading from "./Loading";
import Alert from "./Alert";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-one_dark";

function ProblemInput({
  problem,
  setUserAnswer,
  userAnswer,
  results,
  setResults,
}) {
  console.clear();
  console.log("userAnswer:", userAnswer);
  const codeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userAnswerAlert, setUserAnswerAlert] = useState(false);
  const [issue, setIssue] = useState("");

  console.log(problem);
  if (!problem) {
    return (
      <div>
        Please select a problem type and click the generate problem button...
      </div>
    );
  }

  //NOTE - Parse problem JSON with error handling in case of invalid JSON
  let thisProblem = {};
  try {
    thisProblem = JSON.parse(problem);
  } catch (e) {
    console.log("Error parsing problem:", e);
  }

  //NOTE - Function to test user answer
  const testUserAnswer = async (e) => {
    e.preventDefault();
    console.log("Show user answer:", userAnswer);

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
        setIssue(
          "There was an error running your code or with the connection to our server. Please refresh the page and try again."
        );
      }
    } else {
      setUserAnswerAlert(true);
    }
  };

  console.log(results);
  //INFO - Return the ProblemInput component -----------
  return (
    <div className="container w-10/12 justify-center mx-auto">
      <pre className="whitespace-pre-wrap font-sans mt-5">
        <strong>PROBLEM: </strong> {issue && issue}
        {thisProblem.problem}
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

      {/* <!-- NOTE - START CodeMirror component --> */}
      <AceEditor
        mode="javascript"
        theme="one_dark"
        name="code"
        fontSize={18}
        showPrintMargin={true}
        showGutter={true}
        value={userAnswer}
        onChange={(e) => setUserAnswer(e)}
        style={{ width: "100%", height: "300px" }}
        setOptions={{
          showLineNumbers: true,
          tabSize: 4,
          highlightActiveLine: false,
          wrap: true,
          cursorStyle: "smooth",
          showPrintMargin: false,
        }}
      />

      {/* <!-- NOTE - END CodeMirror component --> */}

      {/* <textarea
        className="border-2 border-black rounded-lg p-1 w-5/6 h-52"
        value={
          userAnswer != "" || userAnswer != null || userAnswer != undefined
            ? userAnswer
            : "Write your code here..."
        }
        onChange={(e) => setUserAnswer(e.target.value)}
      /> */}
      {/* </code>
      </pre> */}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-5 mt-4 rounded "
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {console.log(results)}
          {results &&
            results.results &&
            Array.isArray(results.results) &&
            results.results.map((result, index) => {
              console.log(result, index);
              return (
                <div key={index} className="text-lg flex align-middle">
                  <img
                    src={
                      thisProblem.testCases[index].result ===
                      result.actualOutput
                        ? correct
                        : wrong
                    }
                    className="mx-1 w-11"
                  />
                  <div>
                    Case {index + 1}: {thisProblem.testCases[index].case}
                    <br /> Correct Output: {thisProblem.testCases[index].result}
                    <br /> User Output: {result.actualOutput}
                    <br />
                    {result.feedback && (
                      <p className="text-red-500">
                        Feedback: {result.feedback}
                      </p>
                    )}
                    {console.log("Expected Output:", result.actualOutput)}
                    {console.log("Result:", result)}
                    {thisProblem.testCases[index].result ===
                    result.actualOutput ? (
                      <p className="text-green-500"> Passed </p>
                    ) : (
                      <p className="text-red-500"> Failed </p>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        <pre className="whitespace-pre-wrap font-sans text-lg font-bold">
          {!results && <h3 className="font-bold text-2xl underline"></h3>}
          {!results &&
            thisProblem.testCases.map(
              (testCase, index) =>
                `Case ${index + 1}:  ` +
                testCase.case +
                "\n" +
                `Expected Output:  ` +
                testCase.result +
                "\n"
            )}
        </pre>
      </div>
    </div>
  );
}
export default ProblemInput;
