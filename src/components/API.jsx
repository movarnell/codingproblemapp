
const ENDPOINT_URL = "https://backend.michaelvarnell.com:8005/"

const generateProblem = async ( language, problemType, difficulty) =>
{
console.log("generateProblem", language, problemType, difficulty)

    try {
        const response = await fetch(ENDPOINT_URL + "generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ language, problemType, difficulty })
        })
        let problem = await response.json()
        console.log("Generated Problem: ", problem)
        return problem;
    } catch (error) {
        console.log("Error in Generate, ")
        console.error(error)
    }
}

const submitProblem = async (problem) => {
    try {
        const response = await fetch(ENDPOINT_URL + "submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(problem)
        })
        return await response.json()
    } catch (error) {
        console.log("Error in Submit, ", problem)
        console.error(error)
    }
}

export { generateProblem, submitProblem };