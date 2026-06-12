import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function LoginPage() {
  function Button({ initialText, onClick }) {
    const [text, setText] = useState(initialText);

    function handleClick() {
      onClick?.(text, setText);
    }
    return (
      <button className="button-80" onClick={handleClick}>
        {text}
      </button>
    );
  }

  return (
    <div>
      <br />
      <h2>Login</h2>
      <div class="body">
        <br />
        <div class="loginBox">
          <form>
            <input
              type="text"
              id="email"
              name="email"
              value="enter.email@here.now"
            ></input>{" "}
            <br />
            <br />
            <input type="password" id="pwd" name="pwd" value="PASSWORD"></input>
            <br />
            <br />
            <p>______</p>
            <br />
          </form>

          <Button
            initialText="Log In"
            onClick={(text, setText) => {
              setText("Coming Soon");
            }}
          />
          <Button
            initialText="Forgot Password"
            onClick={(text, setText) => {
              setText("Coming Soon");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
