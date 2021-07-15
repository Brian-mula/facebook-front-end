import "./post.css";
import { MoreVert, ThumbUpAlt, Favorite } from "@material-ui/icons";
import { Users } from "../../dummyData";
import { useState } from "react";

function Posts({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [isliked, setIsLiked] = useState(false);

  const handleLike = () => {
    setLikes(isliked ? likes - 1 : likes + 1);

    setIsLiked(!isliked);
  };
  return (
    <div className="posts">
      <div className="postsWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={
                Users.filter((user) => user.id === post.userId)[0].profilePhoto
              }
              alt=""
              className="postProfileImg"
            />
            <span className="postUserName">
              {Users.filter((user) => user.id === post.userId)[0].username}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={post.photo} alt="" className="postImage" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <ThumbUpAlt
              color="primary"
              className="likeIcon"
              onClick={handleLike}
            />
            <Favorite
              color="secondary"
              className="likeIcon"
              onClick={handleLike}
            />
            <span className="postlikeCounter">{likes} likes</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
