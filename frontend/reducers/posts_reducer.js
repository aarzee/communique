import { RECEIVE_POST } from '../actions/post_actions';
import { RECEIVE_COMMENT } from '../actions/comment_actions';
import { LOGOUT_USER } from '../actions/session_actions';

const PostsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POST:
      const newPost = action.post;
      newPost.content = Object.values(action.post.content);
      return Object.assign({}, state, { [newPost.id]: newPost });
    case RECEIVE_COMMENT:
      const commentedPost = Object.assign({}, state[action.comment.post_id]);
      commentedPost.comment_ids = commentedPost.comment_ids.concat(action.comment.id);
      return Object.assign({}, state, { [commentedPost.id]: commentedPost });
    case LOGOUT_USER:
      const posts = state;
      Object.keys(posts).forEach(id => posts[id].liked_by_current_user = null);
      return posts;
    default:
      return state;
  }
};

export default PostsReducer;
