/* eslint-disable react/jsx-props-no-spreading */
import { useSelector, useDispatch } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import styled from "styled-components";
import { useHistory, Redirect } from "react-router-dom";
import { selectIsAuth } from "../store/authSlice";

import { fetchCreateArticle } from "../store/articlesSlice";

const FormContainer = styled.div`
  position: relative;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(217, 217, 217);
  box-shadow: rgba(0, 0, 0, 0.07) 0px 22px 106px, rgba(0, 0, 0, 0.05) 0px 9.19107px 44.2843px,
    rgba(0, 0, 0, 0.043) 0px 4.91399px 23.6765px, rgba(0, 0, 0, 0.035) 0px 2.75474px 13.2728px,
    rgba(0, 0, 0, 0.027) 0px 1.46302px 7.04911px, rgba(0, 0, 0, 0.02) 0px 0.608796px 2.93329px;
  border-radius: 6px;
  width: 850px;
  margin: 10px auto 0;
  box-sizing: border-box;
  padding: 36px 32px 46px;
  min-height: 680px;
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
const TagInput = styled.input`
  font-family: inherit;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(217, 217, 217);
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.75);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  width: 300px;
  box-sizing: border-box;
  padding: 8px 12px;
  margin-top: 10px;
`;
const TextInput = styled.textarea`
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
  min-height: 170px;
`;
const SubmitButton = styled.input.attrs({ type: "submit" })`
  display: block;
  width: 320px;
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
  }
`;

const IncorrectData = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgb(245, 34, 45);
`;
const WarningData = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgb(24, 144, 255);
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

const TitleTag = styled.span`
  argin-left: 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.75);
  margin-left: 10px;
`;

const ButtonAddTag = styled.button`
  text-decoration: none;
  background: unset;
  border: 1px solid rgb(24, 144, 255);
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  line-height: 22px;
  padding: 6px 10px;
  color: rgb(24, 144, 255);
  margin-left: 10px;
`;

const ButtonDeleteTag = styled.button`
  text-decoration: none;
  background: unset;
  border: 1px solid rgb(245, 34, 45);
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  line-height: 22px;
  padding: 6px 10px;
  color: rgb(245, 34, 45);
  margin-left: 15px;
`;

function CreateArticle() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      tags: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
    rules: {
      required: "Please append at least 1 item",
    },
  });

  const onSubmit = (data) => {
    const userData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.textarea,
        tagList: data.tags.map((el) => el.name),
      },
    };

    // сделано для того чтобы после создания статьи переходить сразу на нее
    dispatch(fetchCreateArticle(userData)).then((res) => {
      localStorage.setItem("slug", res.payload.slug);
      history.push(`/articles/${res.payload.slug}`);
      localStorage.removeItem("slug");
    });
  };

  // чтобы нельзя было перейти на страницу редактирования если не авторизован
  if (!isAuth && !localStorage.getItem("token")) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <FormContainer>
      <FormTitle>Create new article</FormTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LabelContainer>
          <label htmlFor="username">
            <TitleInput>Title</TitleInput>
            <Input
              type="text"
              name="title"
              {...register("title", {
                required: "The field is required",
              })}
            />
            {errors?.title && <IncorrectData>{errors?.title?.message}</IncorrectData>}
          </label>
        </LabelContainer>
        <LabelContainer>
          <label htmlFor="username">
            <TitleInput>Short description</TitleInput>
            <Input
              type="text"
              name="description"
              {...register("description", {
                required: "The field is required ",
              })}
            />
            {errors?.description && <IncorrectData>{errors?.description?.message}</IncorrectData>}
          </label>
        </LabelContainer>
        <LabelContainer>
          <label htmlFor="textarea">
            <TitleInput>Description</TitleInput>
            <TextInput
              type="text"
              name="textarea"
              {...register("textarea", {
                required: "The field is required ",
              })}
            />
            {errors?.textarea && <IncorrectData>{errors?.textarea?.message}</IncorrectData>}
          </label>
        </LabelContainer>
        <div>
          <TitleTag>Tags</TitleTag>
        </div>
        {fields.length > 0 ? (
          fields.map((field, index) => (
            <section key={field.id}>
              <label htmlFor={`tags.${index}.name`}>
                <TagInput
                  type="text"
                  name={`tags.${index}.name`}
                  {...register(`tags.${index}.name`, {
                    required: "The field is required ",
                  })}
                />
              </label>
              <ButtonDeleteTag
                type="button"
                onClick={() => {
                  remove(index);
                }}
              >
                Delete Tag
              </ButtonDeleteTag>
              {index === fields.length - 1 && (
                <ButtonAddTag
                  type="button"
                  onClick={() => {
                    append({
                      name: "",
                    });
                  }}
                >
                  Add Tag
                </ButtonAddTag>
              )}

              {index === fields.length - 1 && field.name === "" && (
                <WarningData>Перед отправкой формы, убедитесь что поле не пустое.</WarningData>
              )}
            </section>
          ))
        ) : (
          <ButtonAddTag
            type="button"
            onClick={() => {
              append({
                name: "",
              });
            }}
          >
            Add Tag
          </ButtonAddTag>
        )}
        <SubmitButton value="Create" disabled={!isValid} />
      </Form>
    </FormContainer>
  );
}

export default CreateArticle;
