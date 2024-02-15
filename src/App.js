import "./App.css";
import { useState, useCallback, useEffect, useRef } from "react";
function App() {
  const [range, setRange] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [pass, setPassword] = useState("");
  const inputRef = useRef(null);

  const passwordgen = useCallback(() => {
    let password = "";
    let charectors = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (number) charectors += "0123456789";
    if (char) charectors += "!@#$%^&*_";
    for (let i = 1; i <= range; i++) {
      let string = Math.floor(Math.random() * charectors.length + 1);
      password += charectors.charAt(string);
    }
    setPassword(password);
  }, [range, number, char, setPassword]);

  const copytext = useCallback(() => {
    inputRef.current.select();
    inputRef.current.setSelectionRange(0, range);
    window.navigator.clipboard.writeText(pass);
  }, [pass, range]);

  useEffect(
    () => passwordgen(),
    [range, number, char, setPassword, passwordgen]
  );

  return (
    <>
      <div className="main">
        <h2>Password Generator</h2>
        <div className="row">
          <input
            type="text"
            placeholder="password"
            value={pass}
            ref={inputRef}
            readOnly
          />
          <input type="button" value="Copy" onClick={copytext} />
          <span>Copied</span>
        </div>
        <div className="row">
          <div className="range">
            <input
              type="range"
              className="col"
              min={8}
              max={30}
              readOnly
              value={range}
              onChange={(e) => {
                setRange(e.target.value);
              }}
            />
            <label htmlFor="" className="col">
              Length({range})
            </label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              className="col"
              defaultChecked={char}
              name="Character"
              id="Character"
              onChange={() => {
                setChar((char) => !char);
              }}
            />
            <label htmlFor="Character" className="col">
              Character
            </label>

            <input
              type="checkbox"
              className="col"
              defaultChecked={number}
              name="Number"
              id="Number"
              onChange={() => {
                setNumber((number) => !number);
              }}
            />
            <label htmlFor="Number" className="col">
              Number
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
