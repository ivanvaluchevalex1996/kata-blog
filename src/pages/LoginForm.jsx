import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../store/authSlice";
import { Redirect } from "react-router-dom";
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
  margin: 70px auto 0;
  box-sizing: border-box;
  padding: 36px 32px 26px;
  min-height: 355px;
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

function RegistrationForm() {
  const [error, setError] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isValid },
  } = useForm({
    mode: "onBlur",
  });

  const email = watch("email");

  const onSubmit = (data) => {
    const userData = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    // console.log(data);
    dispatch(fetchAuth(userData)).then((result) => {
      if (!result.payload) {
        setErrorPass("Неверный пароль");
      }
    });
  };

  useEffect(() => {
    // проверяем корректность email и устанавливаем соответствующее значение ошибки
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setError("Данные почты некорректны");
    } else {
      setError("");
    }
  }, [email]);

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <FormContainer>
      <FormTitle>Sign In</FormTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LabelContainer>
          <label htmlFor="email">
            <TitleInput>Email address</TitleInput>
            <Input type="email" name="email" {...register("email")} />
            {error && <IncorrectData>{error}</IncorrectData>}
          </label>
        </LabelContainer>
        <LabelContainer>
          <label htmlFor="password">
            <TitleInput>Password</TitleInput>
            <Input
              type="password"
              name="password"
              {...register("password", {
                required: true,
              })}
            />
            {errorPass && <IncorrectData>{errorPass}</IncorrectData>}
          </label>
        </LabelContainer>

        <SubmitButton value="Create" disabled={!isValid} />
      </Form>
    </FormContainer>
  );
}

export default RegistrationForm;
