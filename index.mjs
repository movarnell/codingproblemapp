const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // for parsing application/json

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://89.116.167.116",
    "https://CodeProblems.michaelvarnell.com",
  ],
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Middleware to set CORS headers for each response
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (corsOptions.origin.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.status(200).json({});
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/generate", async (req, res) => {
  const { language, category, difficulty, previousProblems } = req.body;

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

  let thisProblem;
  try {
    thisProblem = JSON.parse(problem);
  } catch (error) {
    return res.status(400).json({ error: "Invalid problem format" });
  }

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
    res.status(500).json({ error: "An error occurred while testing the code" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
