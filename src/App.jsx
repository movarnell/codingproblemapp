import React, { useState } from 'react';
import OptionsForm from './components/OptionsForm';
import AceEditorBox from './components/AceEditorBox';





function App() {

 const [currentProblem, setCurrentProblem] = useState(null);
 const [problemHistory, setProblemHistory] = useState([]);
  const [code, setCode] = useState('');

  const submitCode = (e) => {
    e.preventDefault();
    console.log(code);
  }
  



  return (
    <div>
      <OptionsForm/>
      <AceEditorBox/>
    </div>
  );
}

export default App;