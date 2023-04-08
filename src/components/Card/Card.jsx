import styled from "styled-components";
import { format } from "date-fns";
import { IoHeartOutline } from "react-icons/io5";
import trimText from "../../utils/truncate";

const Wrapper = styled.article`
  background-color: #ffffff;
  cursor: pointer;
  overflow: hidden;
  margin-top: 15px;
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
`;
const CardDate = styled.span`
  font-size: 12px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.5);
  margin: 0px;
`;

const LikeContainer = styled.div`
  dispaly: flex;
`;
const LikeCount = styled.span`
  font-size: 12px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.75);
  position: relative;
  bottom: 3px;
`;

function Card({ username, img, title, date, description, tags, likesNumber }) {
  return (
    <Wrapper>
      <CardLeft>
        <LikeContainer>
          <CardTitle>{title.length > 30 ? trimText(title) : title}</CardTitle>
          {/* <CardTitle>{title.length}</CardTitle> */}
          <IoHeartOutline />
          <LikeCount>{likesNumber}</LikeCount>
        </LikeContainer>
        <CardTags>
          {tags.map((el, i) => (
            <Tag key={i + el}>{el}</Tag>
          ))}
        </CardTags>
        <CardDescription>{description}</CardDescription>
      </CardLeft>
      <CardRight>
        <CardContainerRight>
          <CardAuthor>{username}</CardAuthor>
          <CardDate>
            {date ? format(new Date(date), "MMM dd, yyyy") : null}
          </CardDate>
        </CardContainerRight>
        <CardImage src={img ? img : null} alt={username} />
      </CardRight>
    </Wrapper>
  );
}

export default Card;
