import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignOutBtn = styled.button`
  width: 100px;
  height: 30px;
  margin-bottom: 30px;
  border: 1px black solid;
  background-color: lightgray;
`;

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("JWT");
  const handleSignin = () => {
    if (token) {
      localStorage.removeItem("JWT");
      navigate("/signin");
    }
  };

  return (
    <header>
      <h1>Todolist</h1>
      {token && <SignOutBtn onClick={handleSignin}>로그아웃</SignOutBtn>}
    </header>
  );
};

export default Header;
