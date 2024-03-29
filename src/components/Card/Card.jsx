import styled from "styled-components";
import { format } from "date-fns";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import trimText from "../../utils/truncate";
import { fetchLikeArticle, fetchLikeDelete } from "../../store/articlesSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../store/authSlice";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types"; // импортируем модуль PropTypes

const Wrapper = styled.article`
  background-color: #ffffff;
  overflow: hidden;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  filter: drop-shadow(rgba(0, 0, 0, 0.15) 0px 4px 12px);
  padding: 15px;
  height: 100px;
`;

const CardLeft = styled.div``;
const CardTitle = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: rgb(24, 144, 255);
  margin-right: 10px;
  cursor: pointer;
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
  margin-left: 10px;
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
  text-align: end;
`;

const TitleContainer = styled.div`
  dispaly: flex;
`;
const LikeContainer = styled.span`
  cursor: pointer;
`;
const LikeCount = styled.span`
  font-size: 12px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.75);
  position: relative;
  bottom: 3px;
`;

function Card({
  username,
  img,
  title,
  date,
  description,
  tags,
  likesNumber,
  favorited,
  onClick,
  slug,
}) {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const history = useHistory();
  const handleLikeClick = () => {
    // проверяем, что пользователь авторизован
    if (isAuth) {
      if (!favorited) {
        dispatch(fetchLikeArticle(slug));
        localStorage.setItem(`like_${slug}`, true);
      }
      if (favorited) {
        dispatch(fetchLikeDelete(slug));
        localStorage.removeItem(`like_${slug}`);
      }
    } else {
      history.push("/");
    }
  };
  return (
    <Wrapper>
      <CardLeft>
        <TitleContainer>
          <CardTitle onClick={onClick}>{title.length > 30 ? trimText(title) : title}</CardTitle>
          <LikeContainer onClick={handleLikeClick}>
            {localStorage.getItem(`like_${slug}`) ? (
              <IoHeartSharp color="red" />
            ) : (
              <IoHeartOutline />
            )}
            <LikeCount>{likesNumber}</LikeCount>
          </LikeContainer>
        </TitleContainer>
        <CardTags>
          {tags?.map((el, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Tag key={i + el}>{el}</Tag>
          ))}
        </CardTags>
        <CardDescription>{description}</CardDescription>
      </CardLeft>
      <CardRight>
        <CardContainerRight>
          <CardAuthor>{username}</CardAuthor>
          <CardDate>{date ? format(new Date(date), "MMM dd, yyyy") : null}</CardDate>
        </CardContainerRight>
        <CardImage src={img || null} alt={username} />
      </CardRight>
    </Wrapper>
  );
}

Card.propTypes = {
  username: PropTypes.string.isRequired,
  img: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  likesNumber: PropTypes.number.isRequired,
  favorited: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
};
Card.defaultProps = {
  tags: [],
  date: "no data",
  img: "https://static.productionready.io/images/smiley-cyrus.jpg",
};

export default Card;
