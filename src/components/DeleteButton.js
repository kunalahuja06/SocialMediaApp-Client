import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";
import { FETCH_POSTS } from "../util/graphql";
import MyPopup from "../util/MyPopup";

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;
  const [deletePostOrMutation] = useMutation(mutation, {
    variables: {
      postId,
      commentId,
    },
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS,
        });
        const newData = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({
          query: FETCH_POSTS,
          data: {
            getPosts: [...newData],
          },
        });
      }
      if (callback) callback();
    },
    onError(e){
      console.log(e)
    }
  });
  return (
    <>
      <MyPopup content={commentId ? "Delete comment" : "Delete post"}>
        <Popup
          inverted
          content={commentId ? "Delete comment" : "Delete post"}
          trigger={
            <Button
              as="div"
              color="red"
              floated="right"
              onClick={() => setConfirmOpen(true)}
            >
              <Icon name="trash" style={{ margin: 0 }} />
            </Button>
          }
        />
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
}

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($postId: String!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
