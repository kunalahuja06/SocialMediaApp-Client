import React,{useState,useEffect }from 'react'
import {Button,Label,Icon,Popup} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { useMutation } from '@apollo/client';
import {gql} from 'graphql-tag'
import {useAuth} from '../authContext'


function LikePost({post:{id,likes,likeCount}}) {
  const [{user}]=useAuth()
   const [liked,setLiked]=useState(false)

  useEffect(()=>{
  
    if(user && likes.find(like=>like.username === user.username)){
      setLiked(true)
    }else{
      setLiked(false)
    }
  },[user,likes])

const [likePost] = useMutation(LIKE_POST_MUTATION, {
  variables: { postId: id },
});

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to={'/login'} color="teal" basic>
      <Icon name="heart" />
    </Button>
  );
  return (
    <Popup
      inverted
      content="like this Post"
      trigger={
        <Button as="div" labelPosition="right" onClick={likePost}>
          {likeButton}
          <Label as="a" basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
      }
    />
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikePost