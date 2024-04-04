import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/compose">Compose</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
