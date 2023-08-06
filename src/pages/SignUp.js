import { useState, useEffect } from "react";
import styled from "styled-components";
import {
    EMAIL_ERROR_MESSAGE,
    PASSWORD_ERROR_MESSAGE,
} from "../constant/errorMessage";
import { validateEmail, validatePassword } from "../utils/validate";
import { signupApi } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

const SignUpContainer = styled.div`
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
    border: 1px solid black;
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
    border: none;
    border-left: 1px solid black;
`;
const Label = styled.label`
    margin: auto;
`;
const SignUpBtn = styled.button`
    width: 450px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px black solid;
    background-color: lightgray;
`;

const SignUp = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("JWT");
    useEffect(() => {
        if (!!token) {
            navigate("/todo");
        }
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isCorrectEmail, setIsCorrectEmail] = useState(false);
    const [isCorrectPassword, setIsCorrectPassword] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const handleEmail = (e) => {
        setEmail(e.target.value.trim());
        if (validateEmail(e.target.value.trim())) {
            setIsCorrectEmail(true);
            if (validatePassword(password)) {
                setIsDisabled(false);
            }
        } else {
            setIsCorrectEmail(false);
            setIsDisabled(true);
        }
    };
    const handlePassword = (e) => {
        setPassword(e.target.value.trim());
        if (validatePassword(e.target.value.trim())) {
            setIsCorrectPassword(true);
            if (validateEmail(email)) {
                setIsDisabled(false);
            }
        } else {
            setIsCorrectPassword(false);
            setIsDisabled(true);
        }
    };

    const handleSubmit = async () => {
        if (validateEmail(email) && validatePassword(password)) {
            const response = await signupApi(email, password);
            if (response.status === 201) {
                setEmail("");
                setPassword("");
                setIsDisabled(true);
                navigate("/signin");
                alert("회원가입이 완료되었습니다");
            } else {
                alert(response.data.message);
            }
        } else {
            alert("아이디 또는 비밀번호가 잘못되었습니다");
        }
    };
    if (!!token) return;

    return (
        <SignUpContainer>
            <Title>회원가입 페이지</Title>
            <FormGroup>
                <Label>ID</Label>
                <Input
                    data-testid="email-input"
                    onChange={handleEmail}
                    value={email}
                />
            </FormGroup>
            {!isCorrectEmail && <p>{EMAIL_ERROR_MESSAGE}</p>}
            <FormGroup>
                <Label>PW</Label>
                <Input
                    data-testid="password-input"
                    onChange={handlePassword}
                    value={password}
                    type="password"
                />
            </FormGroup>
            {!isCorrectPassword && <p>{PASSWORD_ERROR_MESSAGE}</p>}
            <SignUpBtn
                data-testid="signup-button"
                onClick={handleSubmit}
                disabled={isDisabled}
            >
                회원가입
            </SignUpBtn>
            <Link to="/signin">
                <span>로그인페이지로 이동</span>
            </Link>
        </SignUpContainer>
    );
};

export default SignUp;
