import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/ext-error_marker";
import "ace-builds/src-noconflict/ext-statusbar";
import "ace-builds/src-noconflict/ext-beautify";
import "ace-builds/src-noconflict/ext-keybinding_menu";
import "ace-builds/src-noconflict/ext-emmet";
import "ace-builds/src-noconflict/ext-settings_menu";
import "ace-builds/src-noconflict/ext-options";
import "ace-builds/src-noconflict/ext-spellcheck";
import "ace-builds/src-noconflict/ext-textarea";

function AceEditorBox({ code, setCode, submitCode }) {
  return (
    <div>
        <AceEditor
          mode="javascript"
          theme="vibrant_ink"
          name="editor"
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          placeholder="Write your code here..."
            value={code}
            onChange={(newCode) => setCode(newCode)}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 4,
          }}
          style={{ width: "100%", height: "100%" }}
        />
        <button onClick={(event) => submitCode(event) } className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
            Run Code
        </button>
    </div>
    );
}
export default AceEditorBox;
