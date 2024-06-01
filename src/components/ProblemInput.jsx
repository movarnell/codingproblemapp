import axios from "axios";
// import hljs from "highlight.js";
// import "highlight.js/styles/atom-one-dark.css";
import React, { useRef, useState } from "react";
import correct from "../assets/right.svg";
import wrong from "../assets/wrong.svg";
import Loading from "./Loading";
import Alert from "./Alert";
// import DOMPurify from "dompurify";

//INFO This is ready to test!!!

function ProblemInput({
  problem,
  setUserAnswer,
  userAnswer,
  results,
  setResults,
}) {
  const codeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userAnswerAlert, setUserAnswerAlert] = useState(false);

  //IMPORTANT This is being commented out to test the code without syntax highlighting
  // useEffect(() => {
  //   const highlightCode = (block) => {
  //     if (block.dataset.highlighted) {
  //       delete block.dataset.highlighted;
  //     }
  //     const sanitizedInput = DOMPurify.sanitize(block.textContent);
  //     block.textContent = sanitizedInput;
  //     hljs.highlightElement(block);
  //   };

  //   // Apply syntax highlighting to all code elements
  //   document.querySelectorAll("pre code").forEach(highlightCode);

  //   // Apply syntax highlighting to the specific code element referenced by codeRef
  //   if (codeRef.current) {
  //     highlightCode(codeRef.current);
  //   }
  // }, [userAnswer]);

  //FIXME Unused code from attempt to make the code in the input update in real time
  //  const handleInputChange = (e) => {
  //    const rawCode = e.target.value;
  //    const highlightedCode = hljs.highlightAuto(rawCode).value;
  //    setUserAnswer(highlightedCode);
  //  };

  console.log(problem);
  if (!problem) {
    return (
      <div>
        Please select a problem type and click the generate problem button...
      </div>
    );
  }
  let thisProblem = JSON.parse(problem);

  let testCases = thisProblem.testCases.map((testCase, index) => {
    return { testCase: index + 1, testCaseInput: testCase };
  });

  const testUserAnswer = async (e) => {
    e.preventDefault();
    if(userAnswer){


    setResults(null);
    setIsLoading(true);

    try {
      console.log("User Answer:", userAnswer);
      console.log("Problem:", problem);
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
      console.error("Error executing code:", error);
      displayError(error);
    }
  } else {
    setUserAnswerAlert(true);
  }
  };

  return (
    <div className="container w-10/12 justify-center mx-auto">
      <pre className="whitespace-pre-wrap font-sans mt-5">
        <strong>PROBLEM:</strong> {thisProblem.problem}
      </pre>
      <br />
      {userAnswerAlert && (
        <Alert alertState={userAnswerAlert} setAlertState={setUserAnswerAlert} alertMessage="Please write your code before submitting." />)}
      {isLoading && (
        <Loading message="Running your code..." submessage="This may take a moment"/>
      )}
      {/* <pre>
        <code
          ref={codeRef}
          className="language-javascript text-left h-fit-content w-fit-content p-5 border-2 border-black rounded-lg"
          contentEditable={true}
          suppressContentEditableWarning={true}
        > */}

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
        {results &&
          results.map((result, index) => (
            <div
              key={index}
              className="text-lg flex align-middle"
              >
              <img
                src={result.testCasePassed ? correct : wrong}
                className="mx-1"
              />
              Test Case {result.testCase}: {thisProblem.testCases[index]} :{" "}
              {result.testCaseOutput}{" "}
            </div>
          ))}
      </div>
      <pre className="whitespace-pre-wrap font-sans text-lg font-bold">
        {!results && (
          <h3 className="font-bold text-2xl underline">Test Cases:</h3>
        )}
        {!results &&
          thisProblem.testCases.map(
            (testCase, index) => `Case ${index + 1}:  ` + testCase + "\n"
          )}
      </pre>
    </div>
  );
}
export default ProblemInput;
