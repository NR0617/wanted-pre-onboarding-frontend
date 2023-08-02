import { useState } from "react";
import styled from "styled-components";

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 50px;
`;
const FormGroup = styled.div`
  border: 1px solid blue;
  width: 450px;
  height: 50px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;
const Input = styled.input`
  padding: 10px;
  width: 300px;
  font-size: 20px;
`;
const Label = styled.label`
  margin: auto;
`;
const SignInBtn = styled.span`
  width: 450px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px black solid;
  background-color: lightgray;
`;

const SignIn = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleId = (e) => {
    setId(e.target.value.trim());
  };
  const handlePassword = (e) => {
    setPassword(e.target.value.trim());
  };

  const handleSubmit = () => {
    if (!!id && !!password) {
      console.log(id, password);
      setId("");
      setPassword("");
    } else {
      console.log("아이디 또는 비밀번호가 잘못되었습니다");
    }
  };

  return (
    <SignupContainer>
      <Title>로그인 페이지</Title>
      <FormGroup>
        <Label>ID</Label>
        <Input data-testid="email-input" onChange={handleId} value={id} />
      </FormGroup>
      <FormGroup>
        <Label>PW</Label>
        <Input
          data-testid="password-input"
          onChange={handlePassword}
          value={password}
        />
      </FormGroup>
      <SignInBtn data-testid="signup-button" onClick={handleSubmit}>
        SIGN IN
      </SignInBtn>
    </SignupContainer>
  );
};

export default SignIn;
