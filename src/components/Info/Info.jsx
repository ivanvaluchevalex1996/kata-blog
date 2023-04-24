/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import trimText from "../../utils/truncate";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteArticle, fetchLikeArticle, fetchLikeDelete } from "../../store/articlesSlice";
import { message, Popconfirm } from "antd";
import { useHistory, Link } from "react-router-dom";
import { selectIsAuth } from "../../store/authSlice";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getArticle } from "../../service/config";
import PropTypes from "prop-types"; // импортируем модуль PropTypes

const Wrapper = styled.article`
  background-color: #ffffff;
  background-color: rgb(255, 255, 255);
  cursor: pointer;
  overflow: hidden;
  margin-top: 20px;
  border-radius: 5px;
  filter: drop-shadow(rgba(0, 0, 0, 0.15) 0px 4px 12px);
  padding: 20px;
  margin-bottom: 100px;

  ${(props) =>
    props.height > 600 &&
    `
      padding-bottom: 300px;
    `}
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardLeft = styled.div``;
const CardTitle = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: rgb(24, 144, 255);
  margin-right: 10px;
`;
const CardTags = styled.div`
  max-width: 670px;
`;
const Tag = styled.span`
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: rgba(0, 0, 0, 0.5);
  padding: 3px 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  margin: 0 2px;
`;
const CardDescription = styled.span`
  font-size: 12px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.75);
  margin: 0px;
`;

const CardRight = styled.div`
  display: flex;
  align-items: flex-start;
`;
const CardContainerRight = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const CardAuthor = styled.span`
  font-size: 18px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.85);
  margin: 0px;
  font-weight: 600;
`;
const CardDate = styled.span`
  font-size: 12px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.5);
  margin: 0px;
`;

const TitleContainer = styled.div`
  dispaly: flex;
`;
const LikeCount = styled.span`
  font-size: 12px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.75);
  position: relative;
  bottom: 3px;
`;

const DeleteButton = styled.button`
  text-decoration: none;
  background: unset;
  border: 1px solid rgb(245, 34, 45);
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  line-height: 22px;
  padding: 6px 10px;
  color: rgb(245, 34, 45);
  &:hover {
    color: white;
    background: rgb(245, 34, 45);
  }
`;
const EditButton = styled(Link)`
  text-decoration: none;
  background: unset;
  cursor: pointer;
  border-radius: 5px;
  color: rgb(82, 196, 26);
  border: 1px solid rgb(82, 196, 26);
  font-size: 14px;
  line-height: 22px;
  padding: 9px 18px;
  margin-left: 10px;
  &:hover {
    color: white;
    background: rgb(82, 196, 26);
  }
`;

const ButtonContainer = styled.div`
  text-align: end;
`;

const LikeContainer = styled.span`
  cursor: pointer;
`;

const CardBody = styled.div``;

function Info(props) {
  const { author, body, createdAt, description, tagList, title, slug, onClick } = props;

  const wrapperRef = useRef(null);
  const [height, setHeight] = useState(0);

  // Обновление высоты карточки после рендера и при изменении размеров окна
  useEffect(() => {
    function handleResize() {
      if (wrapperRef.current) {
        setHeight(wrapperRef.current.offsetHeight);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = JSON.parse(localStorage.getItem("data"));

  const isAuthor = () => {
    const authorName = data?.user?.username;
    return author?.username === authorName;
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const confirm = () => {
    dispatch(fetchDeleteArticle(slug));
    history.push("/");
  };
  const cancel = () => {
    message.error("Click on No");
  };

  const isAuth = useSelector(selectIsAuth);

  const [article, setArticle] = useState(null);
  const [likeCount, setLikeCount] = useState(article?.favoritesCount);
  const [isLiked, setIsLiked] = useState(localStorage.getItem(`like_${slug}`) === "true");

  const handleLikeClick = () => {
    // проверяем, что пользователь авторизован
    if (isAuth) {
      if (!isLiked) {
        setLikeCount(likeCount + 1);
        setIsLiked(true);
        localStorage.setItem(`like_${slug}`, true);
        dispatch(fetchLikeArticle(slug)).then(() => {
          // обновляем состояние только в случае успешного ответа
          setArticle((prevState) => ({
            ...prevState,
            favoritesCount: prevState.favoritesCount + 1,
          }));
        });
      } else {
        setLikeCount(likeCount - 1);
        setIsLiked(false);
        localStorage.removeItem(`like_${slug}`);
        dispatch(fetchLikeDelete(slug)).then(() => {
          // обновляем состояние только в случае успешного ответа
          setArticle((prevState) => ({
            ...prevState,
            favoritesCount: prevState.favoritesCount - 1,
          }));
        });
      }
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    axios.get(getArticle(slug)).then(({ data }) => setArticle(data.article));
  }, []);

  useEffect(() => {
    localStorage.setItem("slug", slug);
  }, [slug]);
  return (
    <Wrapper ref={wrapperRef} height={height}>
      <CardContainer>
        <CardLeft>
          <TitleContainer>
            <CardTitle onClick={onClick}>{title.length > 30 ? trimText(title) : title}</CardTitle>
            <LikeContainer onClick={handleLikeClick}>
              {isLiked ? <IoHeartSharp color="red" /> : <IoHeartOutline />}
              <LikeCount>{article?.favoritesCount}</LikeCount>
            </LikeContainer>
          </TitleContainer>
          <CardTags>
            {tagList?.map((el, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Tag key={i + el}>{el}</Tag>
            ))}
          </CardTags>
          <CardDescription>{description}</CardDescription>
        </CardLeft>
        <CardRight>
          <CardContainerRight>
            <CardAuthor>{author.username}</CardAuthor>
            <CardDate>{createdAt ? format(new Date(createdAt), "MMM dd, yyyy") : null}</CardDate>
          </CardContainerRight>
          <CardImage src={author.image ? author.image : null} alt={author.image} />
        </CardRight>
      </CardContainer>
      <CardBody>
        <ReactMarkdown>{body}</ReactMarkdown>
      </CardBody>
      {isAuthor() ? (
        <ButtonContainer>
          <Popconfirm
            title="Delete Article"
            description="Are you sure to delete this article?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            placement="right"
          >
            <DeleteButton>Delete</DeleteButton>
          </Popconfirm>
          <EditButton to={`/articles/${slug}/edit`}>Edit</EditButton>
        </ButtonContainer>
      ) : null}
    </Wrapper>
  );
}

Info.defaultProps = {
  author: {},
  createdAt: "",
  tagList: [],
  onClick: () => {},
};

Info.propTypes = {
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
    image: PropTypes.string,
  }),
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
  description: PropTypes.string.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Info;
