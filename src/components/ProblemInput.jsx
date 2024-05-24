import axios from "axios";

//INFO This is ready to test!!!

function ProblemInput({ problem, setUserAnswer, userAnswer }) {
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

  //FIXME - Map over test cases prior to prompt declaration
  let testCases = thisProblem.testCases.map((testCase, index) => {
    return { testCase: index + 1, testCaseInput: testCase };
  });


  const testUserAnswer = async (e) => {
    e.preventDefault();
    const prompt =
      `run this code: ${userAnswer} and return only the output of the test for each test case and the test case number. Test cases were provided: ${problem.testCases}. Do not provide the problem or the solution. Only the test case number, the output of the test, and true or false if the test passed. The problem was ` +
      thisProblem.problem +
      " The test cases were " +
      {testCases}
      +
      ". Return in JSON format with an array like [{testCase: 1, testCase1Output: 'output', testCase1passed: true}, {testCase: 2, testCase2Output: 'output', testCase2passed: false}, {testCase: 3, testCase3Output: 'output', testCase3passed: true}]";

    let currentPrompt = {
      role: "user",
      content: prompt,
    };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: currentPrompt,
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
    } catch (error) {
      console.error("Error executing code:", error);
    }
  };

  return (
    <div className="container w-10/12">
      <pre className="whitespace-pre-wrap">{thisProblem.problem}</pre>
      <textarea
        className="border-2 border-black rounded-lg p-1 w-1/2 h-52"
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-5 rounded "
        onClick={(e) => testUserAnswer(e)}
      >
        Submit
      </button>

      <pre className="whitespace-pre-wrap">
        {thisProblem.testCases.map(
          (testCase, index) => `Test Case ${index + 1}:\n` + testCase + "\n\n"
        )}
      </pre>
    </div>
  );
}
export default ProblemInput;
