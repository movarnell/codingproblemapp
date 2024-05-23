



function ProblemInput({problem, setUserAnswer}) {
    console.log(problem)
let thisProblem = `${problem}`


  return (
    <div className="container w-1/2">
      <pre>{thisProblem}</pre>
    </div>
  );
}
export default ProblemInput;
