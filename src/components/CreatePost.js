import React from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useForm } from "../util/hooks";
import { FETCH_POSTS } from "../util/graphql";

function CreatePost() {

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

   const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
     variables: values,
     update(proxy, result) {
       const data = proxy.readQuery({
         query: FETCH_POSTS,
       });
       proxy.writeQuery({
         query: FETCH_POSTS,
         data: {
           getPosts: [result.data.createPost, ...data.getPosts],
         },
       });
       values.body = "";
     },
   });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>What's on your mind?</h2>
        <Form.Field>
          <Form.Input
          className="input"
            placeholder="Hello World!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Post
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default CreatePost;
