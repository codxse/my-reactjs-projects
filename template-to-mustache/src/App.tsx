import React, {useState} from 'react';
import logo from './logo.svg';
// import './App.css';
import { Template } from "./Template";
import prettify  from "html-prettify"
import { MOCK } from "./mock";

function App() {
  const [content, setContent] = useState<string>(MOCK)
  const [mustache, setMustache] = useState<string>("")
  const [state, setState] = useState<"mustache" | "preview">("mustache")
  const isPreview = state === "preview"
  const isMustache = state === "mustache"
  return (
    <div className="App">
      <div>
        <input
          type={"radio"} id={"mustache"} value={"mustache"} name={"mustache"} checked={state === "mustache"}
          onChange={(e) => {
            setState(e.target.value as "mustache")
          }}
        />
        <label>Mustache</label><br />
        <input
          type={"radio"} id={"preview"} value={"preview"} name={"preview"} checked={state === "preview"}
          onChange={(e) => {
            setState(e.target.value as "preview")
          }}
        />
        <label>Preview</label><br />
        <input
          type={"button"} value={"Convert"}
          onClick={() => {
            const template = new Template(content || "")
            const mustache = template
              .toTextOrTextareaOrRadioOrDropdownMustache()
              .toDateMustache()
              .toCurrencyTextMustache()
              .toCurrencyNumberMustache()
              .toNumberTextMustache()
              .toNumberMustache()
              .toArrayTextOrTextareaOrRadioOrDropdownMustache()
              .toArrayCurrencyTextMustache()
              .toArrayCurrencyMustache()
              .toArrayNumberMustache()
              .toArrayNumberTextMustache()
              .toArrayDateMustache()
              .mustache
            setMustache(mustache)
          }}
        />
      </div>
      <div className={"panel"} style={{display: "flex", width: "100%", justifyContent: "flex-start"}}>
        <textarea
          className={"template-source"} style={{width: "50%", padding: 10, border: "1px solid #000", minHeight: 500}}
          value={content}
          onChange={(event) => {
            event.preventDefault()
            setContent(event.target.value)
          }}
        />
        <div className={"mustache-panell"} style={{width: "50%", padding: 10, border: "1px solid #000", minHeight: 500, overflow: "auto"}}>
          { isPreview ?
            <div dangerouslySetInnerHTML={{
              __html: mustache
            }} /> : null }
          { isMustache ?
            <pre>
              { prettify(mustache) }
            </pre> : null }
        </div>
      </div>
    </div>
  );
}

export default App;
