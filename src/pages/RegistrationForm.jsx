import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Link } from "react-router-dom"; // 5 версия
// import { fetchRegister, selectIsAuth } from "../store/authSlice";
import { selectIsAuth, login } from "../store/authSlice";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../service/config";

const FormContainer = styled.div`
  position: relative;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(217, 217, 217);
  box-shadow: rgba(0, 0, 0, 0.07) 0px 22px 106px,
    rgba(0, 0, 0, 0.05) 0px 9.19107px 44.2843px,
    rgba(0, 0, 0, 0.043) 0px 4.91399px 23.6765px,
    rgba(0, 0, 0, 0.035) 0px 2.75474px 13.2728px,
    rgba(0, 0, 0, 0.027) 0px 1.46302px 7.04911px,
    rgba(0, 0, 0, 0.02) 0px 0.608796px 2.93329px;
  border-radius: 6px;
  width: 384px;
  margin: 10px auto 0;
  box-sizing: border-box;
  padding: 36px 32px 46px;
  min-height: 374px;
`;

const Form = styled.form``;

const FormTitle = styled.h3`
  margin: 0px 0px 21px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  color: rgba(0, 0, 0, 0.75);
`;

const Input = styled.input`
  font-family: inherit;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(217, 217, 217);
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.75);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
`;

const SubmitButton = styled.input.attrs({ type: "submit" })`
  width: 100%;
  box-sizing: border-box;
  background: rgb(24, 144, 255);
  border-radius: 4px;
  padding: 8px 12px;
  border: 1px solid rgb(24, 144, 255);
  color: rgb(255, 255, 255);
  cursor: pointer;
  margin-top: 10px;
  &:disabled {
    background: rgba(24, 144, 255, 0.5);
    border-color: rgba(24, 144, 255, 0.5);
    // cursor: not-allowed;
  }
`;

const IncorrectData = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgb(245, 34, 45);
`;

const LabelContainer = styled.div`
  margin-bottom: 12px;
`;

const TitleInput = styled.span`
  margin-left: 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.75);
`;

const SignIn = styled(Link).attrs({ to: "/sign-in" })`
  color:color: rgb(24, 144, 255);
  text-decoration: none;
`;

const FooterTitle = styled.p`
  color: rgb(140, 140, 140);
  font-size: 12px;
  position: absolute;
  left: 104px;
  bottom: 10px;
`;

function RegistrationForm() {
  const [error, setError] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const password = watch("password");
  const repeatPassword = watch("repeatPassword");
  const checked = watch("checkbox");

  const onSubmit = async (data) => {
    const userData = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };
    axios
      .post(`${BASE_URL}users`, userData)
      .then((response) => {
        dispatch(login(response.data));
      })
      .catch((error) => {
        setError(error.response.data.errors);
      });
  };

  useEffect(() => {
    // сравниваем значения полей password и repeatPassword и устанавливаем соответствующее значение ошибки
    if (password !== repeatPassword && repeatPassword.length !== 0) {
      setErrorPassword("Пароли не совпадают");
    } else {
      setErrorPassword("");
    }
  }, [password, repeatPassword]);

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <FormContainer>
      <FormTitle>Create new account</FormTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LabelContainer>
          <label htmlFor="username">
            <TitleInput>Username</TitleInput>
            <Input
              type="text"
              name="username"
              {...register("username", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Слишком короткий пароль",
                },
                maxLength: {
                  value: 40,
                  message: "Слишком длинный пароль",
                },
              })}
            />
            {error?.username && (
              <IncorrectData>{error?.username}</IncorrectData>
            )}
            {Object.keys(errors).map((key) => (
              <IncorrectData className="error" key={key}>
                {errors[key].message}
              </IncorrectData>
            ))}
          </label>
        </LabelContainer>
        <LabelContainer>
          <label htmlFor="email">
            <TitleInput>Email address</TitleInput>
            <Input type="email" name="email" {...register("email")} />
            {error && <IncorrectData>{error?.email}</IncorrectData>}
          </label>
        </LabelContainer>
        <LabelContainer>
          <label htmlFor="password">
            <TitleInput>Password</TitleInput>
            <Input
              type="password"
              name="password"
              {...register("password", {
                required: "Поле обязательно к заполнению ",
                minLength: {
                  value: 6,
                  message: "Слишком короткий пароль",
                },
                maxLength: {
                  value: 40,
                  message: "Слишком длинный пароль",
                },
              })}
            />
            {errors?.password && (
              <IncorrectData>{errors?.password?.message}</IncorrectData>
            )}
          </label>
        </LabelContainer>
        <LabelContainer>
          <label htmlFor="repeatPassword">
            <TitleInput>Repeat Password</TitleInput>
            <Input
              type="repeatPassword"
              name="repeatPassword"
              {...register("repeatPassword")}
            />
          </label>
        </LabelContainer>
        {errorPassword && <IncorrectData>{errorPassword}</IncorrectData>}
        <LabelContainer>
          <input type="checkbox" name="checkbox" {...register("checkbox")} />
          <TitleInput>
            I agree to the processing of my personal information
          </TitleInput>
        </LabelContainer>
        {checked ? null : (
          <IncorrectData>You have to accept an agreement</IncorrectData>
        )}
        <SubmitButton value="Create" disabled={!isValid} />
      </Form>
      <FooterTitle>
        Already have an account?<SignIn> Sign In</SignIn>.
      </FooterTitle>
    </FormContainer>
  );
}

export default RegistrationForm;
