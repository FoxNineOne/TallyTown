import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import "../App.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  async function handleLogin() {
    console.log(`email: ${email}`);
    console.log(`pass: ${password}`);

    const url = `http://localhost:3000/api/v1/login`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!res.ok) {
      console.error(`Response status: ${res.status}`);
    }
    try {
      console.log(res);
      const data = await res.json();
      localStorage.setItem("jwt", data.token);
      //console.log(data);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div>
      <br />
      <h2>Login</h2>
      <div className="body">
        <br />
        <div className="loginBox">
          <form>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="enter@email.here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>{" "}
            <br />
            <br />
            <input
              type="password"
              id="pwd"
              name="pwd"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <br />
            <br />
            <p>______</p>
            <br />
          </form>

          <Button initialText="Log In" onClick={handleLogin} />
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
