import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function HomePage() {
  const navigate = useNavigate();
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

  //RETURN
  return (
    <div>
      <br />
      <h2> </h2>
      <br />
      <br />
      <div className="body">
        <br />
        <div className="button-group">
          <Button initialText="Login" onClick={() => navigate("/login")} />
          <Button
            initialText="Sign Up"
            onClick={(text, setText) => {
              setText("Coming Soon");
            }}
          />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default HomePage;
