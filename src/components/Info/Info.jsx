// import styled from "styled-components";
// import trimText from "../../utils/truncate";
// import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
// import { format } from "date-fns";
// import ReactMarkdown from "react-markdown";
// import { useDispatch } from "react-redux";
// import { fetchDeleteArticle } from "../../store/articlesSlice";
// import { message, Popconfirm } from "antd";
// import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom"; // 5 версия

// const Wrapper = styled.article`
//   background-color: #ffffff;
//   cursor: pointer;
//   overflow: hidden;
//   margin-top: 20px;
//   border-radius: 5px;
//   filter: drop-shadow(rgba(0, 0, 0, 0.15) 0px 4px 12px);
//   padding: 20px;
// `;

// const CardContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const CardLeft = styled.div``;
// const CardTitle = styled.span`
//   font-style: normal;
//   font-weight: 400;
//   font-size: 20px;
//   line-height: 28px;
//   color: rgb(24, 144, 255);
//   margin-right: 10px;
// `;
// const CardTags = styled.div`
//   max-width: 670px;
// `;
// const Tag = styled.span`
//   display: inline-block;
//   font-style: normal;
//   font-weight: 400;
//   font-size: 12px;
//   line-height: 15px;
//   color: rgba(0, 0, 0, 0.5);
//   padding: 3px 5px;
//   border: 1px solid rgba(0, 0, 0, 0.5);
//   border-radius: 2px;
//   margin: 0 2px;
// `;
// const CardDescription = styled.span`
//   font-size: 12px;
//   line-height: 22px;
//   color: rgba(0, 0, 0, 0.75);
//   margin: 0px;
// `;

// const CardRight = styled.div`
//   display: flex;
//   align-items: flex-start;
// `;
// const CardContainerRight = styled.div`
//   display: flex;
//   flex-direction: column;
// `;
// const CardImage = styled.img`
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
// `;
// const CardAuthor = styled.span`
//   font-size: 18px;
//   line-height: 28px;
//   color: rgba(0, 0, 0, 0.85);
//   margin: 0px;
//   font-weight: 600;
// `;
// const CardDate = styled.span`
//   font-size: 12px;
//   line-height: 22px;
//   color: rgba(0, 0, 0, 0.5);
//   margin: 0px;
// `;

// const TitleContainer = styled.div`
//   dispaly: flex;
// `;
// const LikeCount = styled.span`
//   font-size: 12px;
//   line-height: 22px;
//   color: rgba(0, 0, 0, 0.75);
//   position: relative;
//   bottom: 3px;
// `;

// const DeleteButton = styled.button`
//   text-decoration: none;
//   background: unset;
//   border: 1px solid rgb(245, 34, 45);
//   cursor: pointer;
//   border-radius: 5px;
//   font-size: 14px;
//   line-height: 22px;
//   padding: 6px 10px;
//   color: rgb(245, 34, 45);
//   &:hover {
//     color: white;
//     background: rgb(245, 34, 45);
//   }
// `;
// const EditButton = styled(Link)`
//   text-decoration: none;
//   background: unset;
//   cursor: pointer;
//   border-radius: 5px;
//   color: rgb(82, 196, 26);
//   border: 1px solid rgb(82, 196, 26);
//   font-size: 14px;
//   line-height: 22px;
//   padding: 6px 10px;
//   &:hover {
//     color: white;
//     background: rgb(82, 196, 26);
//   }
// `;

// const CardBody = styled.div``;

// function Info(props) {
//   const {
//     author,
//     body,
//     createdAt,
//     description,
//     favoritesCount,
//     tagList,
//     title,
//     slug,
//     favorited,
//   } = props;
//   console.log(props);
//   const dispatch = useDispatch();
//   const data = JSON.parse(localStorage.getItem("data"));
//   const authorName = data?.user?.username;
//   const history = useHistory();
//   console.log(slug);
//   localStorage.setItem("slug", slug);
//   const confirm = (e) => {
//     console.log(e);
//     dispatch(fetchDeleteArticle(slug));
//     history.push("/");
//   };
//   const cancel = (e) => {
//     console.log(e);
//     message.error("Click on No");
//   };

//   return (
//     <Wrapper>
//       <CardContainer>
//         <CardLeft>
//           <TitleContainer>
//             <CardTitle>{title.length > 30 ? trimText(title) : title}</CardTitle>
//             {favorited ? <IoHeartSharp /> : <IoHeartOutline />}
//             <LikeCount>{favoritesCount}</LikeCount>
//           </TitleContainer>
//           <CardTags>
//             {tagList?.map((el, i) => (
//               <Tag key={i + el}>{el}</Tag>
//             ))}
//           </CardTags>
//           <CardDescription>{description}</CardDescription>
//         </CardLeft>
//         <CardRight>
//           <CardContainerRight>
//             <CardAuthor>{author.username}</CardAuthor>
//             <CardDate>
//               {createdAt ? format(new Date(createdAt), "MMM dd, yyyy") : null}
//             </CardDate>
//           </CardContainerRight>
//           <CardImage
//             src={author.image ? author.image : null}
//             alt={author.image}
//           />
//         </CardRight>
//       </CardContainer>
//       <CardBody>
//         <ReactMarkdown>{body}</ReactMarkdown>
//       </CardBody>
//       {author?.username === authorName ? (
//         <div>
//           <Popconfirm
//             title="Delete the task"
//             description="Are you sure to delete this task?"
//             onConfirm={confirm}
//             onCancel={cancel}
//             okText="Yes"
//             cancelText="No"
//             placement="right"
//           >
//             <DeleteButton>Delete</DeleteButton>
//           </Popconfirm>
//           {/* <DeleteButton onClick={() => dispatch(fetchDeleteArticle(slug))}>
//             Delete
//           </DeleteButton> */}
//           <EditButton to={`/articles/${slug}/edit`}>Edit</EditButton>
//         </div>
//       ) : null}
//     </Wrapper>
//   );
// }

// export default Info;
import styled from "styled-components";
import trimText from "../../utils/truncate";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteArticle } from "../../store/articlesSlice";
import { message, Popconfirm } from "antd";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom"; // 5 версия
import { selectIsAuth } from "../../store/authSlice";
import { fetchLikeArticle, fetchLikeDelete } from "../../store/articlesSlice";
import { useState, useEffect } from "react";
import axios from "axios";
import { getArticle } from "../../service/config";

const Wrapper = styled.article`
  background-color: #ffffff;
  cursor: pointer;
  overflow: hidden;
  margin-top: 20px;
  border-radius: 5px;
  filter: drop-shadow(rgba(0, 0, 0, 0.15) 0px 4px 12px);
  padding: 20px;
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
  const {
    author,
    body,
    createdAt,
    description,
    favoritesCount,
    tagList,
    title,
    slug,
    favorited,
    onClick,
  } = props;

  const [article, setArticle] = useState(null);
  const dispatch = useDispatch();
  const data = JSON.parse(localStorage.getItem("data"));
  const authorName = data?.user?.username;
  const history = useHistory();
  localStorage.setItem("slug", slug);
  const confirm = () => {
    dispatch(fetchDeleteArticle(slug));
    history.push("/");
  };
  const cancel = () => {
    message.error("Click on No");
  };
  const isAuth = useSelector(selectIsAuth);

  const isLiked = localStorage.getItem(`like_${slug}`);
  const [favor, setFavor] = useState(isLiked ? false : true);
  // const [likesCount, setLikesCount] = useState(favoritesCount);
  const handleLikeClick = () => {
    // проверяем, что пользователь авторизован
    console.log(favorited);
    if (isAuth) {
      if (!favor) {
        dispatch(fetchLikeArticle(slug));
        localStorage.setItem(`like_${slug}`, true);
        setFavor(true);
        // setLikesCount(likesCount + 1); // увеличиваем количество лайков // обновляем состояние компонента
      }
      if (favor) {
        dispatch(fetchLikeDelete(slug));
        localStorage.removeItem(`like_${slug}`);
        setFavor(false);
        // setLikesCount(likesCount - 1); // обновляем состояние компонента
      }
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    axios.get(getArticle(slug)).then(({ data }) => setArticle(data.article));
  }, [article]);
  return (
    <Wrapper>
      <CardContainer>
        <CardLeft>
          <TitleContainer>
            <CardTitle onClick={onClick}>
              {title.length > 30 ? trimText(title) : title}
            </CardTitle>
            <LikeContainer onClick={handleLikeClick}>
              {localStorage.getItem(`like_${slug}`) ? (
                <IoHeartSharp />
              ) : (
                <IoHeartOutline />
              )}
              <LikeCount>{article?.favoritesCount}</LikeCount>
            </LikeContainer>
          </TitleContainer>
          <CardTags>
            {tagList?.map((el, i) => (
              <Tag key={i + el}>{el}</Tag>
            ))}
          </CardTags>
          <CardDescription>{description}</CardDescription>
        </CardLeft>
        <CardRight>
          <CardContainerRight>
            <CardAuthor>{author.username}</CardAuthor>
            <CardDate>
              {createdAt ? format(new Date(createdAt), "MMM dd, yyyy") : null}
            </CardDate>
          </CardContainerRight>
          <CardImage
            src={author.image ? author.image : null}
            alt={author.image}
          />
        </CardRight>
      </CardContainer>
      <CardBody>
        <ReactMarkdown>{body}</ReactMarkdown>
      </CardBody>
      {author?.username === authorName ? (
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

export default Info;
