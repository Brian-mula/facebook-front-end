import Posts from "../posts/Posts";
import Share from "../share/Share";
import "./feed.css";
import { Postss } from "../../dummyData";

function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Postss.map((post) => (
          <Posts key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
