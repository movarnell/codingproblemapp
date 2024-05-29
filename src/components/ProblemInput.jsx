import axios from "axios";
// import hljs from "highlight.js";
// import "highlight.js/styles/atom-one-dark.css";
import React, { useRef, useEffect } from "react";
import correct from "../assets/right.svg";
import wrong from "../assets/wrong.svg";
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
    setResults(null);



    try {
      console.log("User Answer:", userAnswer);
      console.log("Problem:", problem);
      const response = await axios.post(
        "http://89.116.167.116:8000/test",
        {
          userAnswer,
          problem,
        });

      let data = response.data;
      console.log("Data:", data);

      setResults(data);
    } catch (error) {
      console.error("Error executing code:", error);
      displayError(error);
    }
  };

  return (
    <div className="container w-10/12 text-center">
      <pre className="whitespace-pre-wrap font-sans mt-5">
        {thisProblem.problem}
      </pre>
      <br />
      <pre>
        <code
          ref={codeRef}
          className="language-javascript text-left h-fit-content w-fit-content p-5 border-2 border-black rounded-lg"
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          <textarea
            className="border-2 border-black rounded-lg p-1 w-5/6 h-52 mt-5"
            value={userAnswer != "" || userAnswer != null || userAnswer != undefined ? userAnswer : "Write your code here..."}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
        </code>
      </pre>

      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-5 rounded "
        onClick={(e) => testUserAnswer(e)}
      >
        Submit
      </button>
      <br />
      <div className="font-bold">
        {results && <h3 className="font-bold text-2xl underline">Results:</h3>}
        {results &&
          results.map((result, index) => (
            <div
              key={index}
              className="flex items-center justify-center text-lg"
            >
              Test Case {result.testCase}: {thisProblem.testCases[index]} :{" "}
              {result.testCaseOutput}{" "}
              <img
                src={result.testCasePassed ? correct : wrong}
                className="mx-1"
              />
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
