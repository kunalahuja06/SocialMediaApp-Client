import gql from 'graphql-tag'

export const FETCH_POSTS = gql`
  {
    getPosts {
      id
      body
      username
      createdAt
      comments {
        id
        createdAt
        username
        body
      }
      likes {
        username
      }
      likeCount
      commentCount
    }
  }
`;