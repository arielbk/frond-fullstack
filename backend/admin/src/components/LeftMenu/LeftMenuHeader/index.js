import React from "react";
import { Link } from "react-router-dom";
// import { ImLeaf } from "react-icons";

import Wrapper from "./Wrapper";

const LeftMenuHeader = () => (
  <Wrapper>
    <Link to="/" className="leftMenuHeaderLink">
      {/* <div style={{ fontSize: "2rem" }}>
        <ImLeaf />
      </div> */}
      Frond
    </Link>
  </Wrapper>
);

export default LeftMenuHeader;
