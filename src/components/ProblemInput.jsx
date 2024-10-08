import axios from "axios";
import React, { useRef, useState } from "react";
import correct from "../assets/right.svg";
import wrong from "../assets/wrong.svg";
import Loading from "./Loading";
import Alert from "./Alert";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-one_dark";
import { toast } from "react-toastify";

function ProblemInput({
  problem,
  setUserAnswer,
  userAnswer,
  results,
  setResults,
}) {
  // console.clear();
  if(userAnswer) console.log("userAnswer:", userAnswer); //NOTE - console log for debugging

  const codeRef = useRef(null);
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
  let thisProblem;

try {
  if (typeof problem === "string") {
    thisProblem = JSON.parse(problem);
  } else {
    thisProblem = problem;
  }
} catch (error) {
  console.error("Error parsing problem JSON:", error.message);

}


  //NOTE - Function to test user answer
  const testUserAnswer = async (e) => {
    e.preventDefault();
    console.log("Show user answer:", userAnswer);

    if (userAnswer.trim()) {
      setResults(null);
      toast.success("Running your code...", {
        icon: "🚀",
        autoClose: 5000,
        closeOnClick: true,
      });

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
        toast.dismiss();
      } catch (error) {
        console.error("Error executing code:", error);
        toast.error(
          "Error running your code. Please try again in a couple seconds.",
          {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          }
        );
      }
    } else {
      setUserAnswerAlert(true);
    }
  };

  //NOTE - Setting a try catch on the render for the test cases to reload the page in the even that a test case fails to load

  const renderTestCases = () => {
    try {
      return thisProblem.testCases.map((testCase, index) => (
        <div key={index}>
          Case {index + 1}: {testCase.case}
          <br />
          Expected Output: {testCase.result}
          <hr className="w-1/3 my-1 border-white border-1" />
        </div>
      ));
    } catch (error) {
      console.error("Error rendering test cases:", error);
      console.log("thisProblem:", thisProblem); //NOTE - this is to help debug the issue
      toast.error(
        "Error rendering test cases. Please try again in a couple seconds.",
        {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  // console.log(results);
  // console.log(userAnswer);

  //SECTION - MAIN RETURN
  return (
    <div className="container justify-center w-full mx-auto">
      <pre className="mt-5 font-sans whitespace-pre-wrap">
        <strong>PROBLEM: </strong> {issue && issue}
        {thisProblem && thisProblem.problem}
      </pre>

      <br />
      {userAnswerAlert && (
        <Alert
          alertState={userAnswerAlert}
          setAlertState={setUserAnswerAlert}
          alertMessage="Please write your code before submitting."
        />
      )}

      <strong className="mt-5 mb-0">Your Answer:</strong>

      {/*  NOTE - START AceEditor component  */}
      <AceEditor
        className="rounded mt-1 animate-flip-down animate-once animate-duration-[700ms] animate-delay-500 animate-ease-in border border-gray-500 resize w-full"
        mode="javascript"
        theme="one_dark"
        name="code"
        fontSize={18}
        showPrintMargin={true}
        showGutter={true}
        value={userAnswer}
        width="100%"
        height="300px"
        placeholder="Write your code here..."
        onChange={(e) => setUserAnswer(e)}
        setOptions={{
          showLineNumbers: true,
          tabSize: 4,
          highlightActiveLine: false,
          wrap: true,
          cursorStyle: "smooth",
          showPrintMargin: false,
        }}
      />

      {/*  NOTE - END AceEditor component  */}

      <button
        className="px-4 py-2 mt-4 mb-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 "
        onClick={(e) => testUserAnswer(e)}
      >
        🎯 Submit
      </button>
      <br />

      <div className="font-bold">
        <p className="font-normal">
          Your results will show beside the test case it corresponds to.{" "}
        </p>
          {results && results.feedback && (
            <div className="text-lg">
              <h3 className="text-2xl font-bold underline">Feedback:</h3>
              <p>{results.feedback}</p>
            </div>
          )}
        {results && <h3 className="text-2xl font-bold underline">Results:</h3>}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* {console.log(results)} */}
          {results &&
            results.results &&
            Array.isArray(results.results) &&
            results.results.map((result, index) => {
              console.log(result, index);
              return (
                <div key={index} className="flex text-lg align-middle">
                  <img
                    src={result.passed ? correct : wrong}
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
                    {console.log("Actual Output:", result.actualOutput)}
                    {console.log("Result:", result)}
                    {result.passed ? (
                      <p className="text-green-500"> Passed </p>
                    ) : (
                      <p className="text-red-500"> Failed </p>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        <pre className="mt-2 font-sans text-lg font-bold whitespace-pre-wrap">
          {!results && (
            <h3 className="text-2xl font-bold underline">Test Cases</h3>
          )}
          {/* NOTE - this render function does error handling for test cases returned with incorrect format and triggers reload.  */}
          {/* {!results && renderTestCases()} */}
          {console.log(thisProblem)}
          {!results && thisProblem != undefined && thisProblem.testCases && renderTestCases()}

        </pre>
      </div>
    </div>
  );
  //!SECTION - MAIN RETURN END
}
export default ProblemInput;
