import "./App.css";
import OptionsForm from "./components/OptionsForm";
import Title from "./components/Title";
//A few ideas for the app:

// -Basic layout ie. header, footer, body content, grid/flex
// -Form for problem creation
// -Submit button
// -Sections for hints and feedback
// -API implementation

// optional,
// -user registration/login
// -database to store your answer.


function App() {
  return (
    <>
      <div>
        <Title />
        <OptionsForm />
        <div className="container-fluid mx-3">
          <div className="row grid grid-cols-2 my-5 gap-2">
            <div className="px-3">
              <h2 className="text-xl font-bold">How this works</h2>
              <p>
                Choose your language, difficulty, and category. Then click
                "Generate Problem" to get a problem to solve.
              </p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
