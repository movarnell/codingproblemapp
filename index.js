const PORT = process.env.PORT || 8000;
import express, { json } from "express";
import cors from "cors";
import axios from "axios";
import { config } from "dotenv";
config();

const app = express();
app.use(cors());
app.use(json()); // for parsing application/json

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/generate", async (req, res) => {
  const { language, category, difficulty, previousProblems } = req.body;
  //   console.log(req);
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
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    let data = response.data;
    console.log("Data:", data.choices[0].message.content);

    let newMessage = {
      role: "assistant",
      content: data.choices[0].message.content,
    };

    res.json({
      problem: newMessage,
      previousProblems: [...previousProblems, newMessage],
    });
  } catch (error) {
    console.error("Error executing code:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    res
      .status(500)
      .json({ error: "An error occurred while generating the problem" });
  }
});

app.post("/test", async (req, res) => {
    const { userAnswer, problem } = req.body;
    let thisProblem = JSON.parse(problem);

    let testCases = thisProblem.testCases.map((testCase, index) => {
        return { testCase: index + 1, testCaseInput: testCase };
    });

    const api_key = process.env.API_KEY;

    const prompt =
        `run this code: ${userAnswer} and return only the output of the test for each test case and the test case number. Do not provide the problem or the solution. Only the test case number, the output of the test, and true or false if the test passed and returned the proper output for the test case. The problem was ` +
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
        res.json(JSON.parse(data.choices[0].message.content));
    } catch (error) {
        console.error("Error executing code:", error);
        if (error.response) {
        console.error("Response data:", error.response.data);
        }
        res
        .status(500)
        .json({ error: "An error occurred while testing the code" });
    }
    }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
