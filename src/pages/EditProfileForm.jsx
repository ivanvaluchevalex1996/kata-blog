import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { fetchEditData, selectIsAuth } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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

function EditProfileForm() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const email = watch("email");

  const onSubmit = (data) => {
    const userData = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
        image: data.imageUrl,
      },
    };
    dispatch(fetchEditData(userData));
    // dispatch(fetchEditData(userData)).then((response) => {
    //   console.log(response)
    //   if (response.status === 200) {
    //     history.push("/");
    //   }
    // });
    history.push("/");
    console.log(data);
  };

  useEffect(() => {
    // проверяем корректность email и устанавливаем соответствующее значение ошибки
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setError("Данные почты некорректны");
    } else {
      setError("");
    }
  }, [email]);

  // const checkEmailExists = async (email) => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //   }
  //   const response = await fetch(`${BASE_URL}user?email=${email}`, {
  //     headers: {
  //       Authorization: `Token ${token}`,
  //     },
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   // return data?.users.length > 0;
  // };

  return (
    <FormContainer>
      <FormTitle>Edit Profile</FormTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LabelContainer>
          <label htmlFor="username">
            <TitleInput>Username</TitleInput>
            <Input
              type="text"
              name="username"
              {...register("username", {
                required: "Поле обязательно к заполнению ",
                minLength: {
                  value: 3,
                  message: "Слишком короткое имя",
                },
                maxLength: {
                  value: 20,
                  message: "Слишком длинное имя",
                },
              })}
            />
            {errors?.username && (
              <IncorrectData>{errors?.username?.message}</IncorrectData>
            )}
          </label>
        </LabelContainer>
        <LabelContainer>
          <label htmlFor="email">
            <TitleInput>Email address</TitleInput>
            {/* <Input type="email" name="email" {...register("email")} /> */}
            <Input
              type="email"
              name="email"
              {...register("email")}
              // {...register("email", {
              //   required: true,
              //   pattern: {
              //     value: /^\S+@\S+$/i,
              //     message: "Введите корректный email",
              //   },
              //   validate: async (value) => {
              //     const emailExists = await checkEmailExists(value);
              //     return (
              //       !emailExists ||
              //       "Пользователь с таким email уже зарегистрирован"
              //     );
              //   },
              // })}
            />
            {errors.email && <p>{errors.email.message}</p>}
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
          <label htmlFor="imageUrl">
            <TitleInput>Avatar image (url)</TitleInput>
            {/* <Input type="text" name="imageUrl" {...register("imageUrl")} /> */}
            <Input
              type="text"
              name="imageUrl"
              {...register("imageUrl", {
                required: "Поле обязательно к заполнению ",
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: "Введите корректную ссылку на изображение",
                },
              })}
            />
            {errors.imageUrl && (
              <IncorrectData>{errors.imageUrl.message}</IncorrectData>
            )}
          </label>
        </LabelContainer>
        <SubmitButton value="Create" disabled={!isValid} />
      </Form>
    </FormContainer>
  );
}

export default EditProfileForm;