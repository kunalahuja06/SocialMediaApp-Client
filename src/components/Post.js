import React from 'react'
import moment from 'moment'
import {Card,Icon,Label,Image, Button, Popup} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {useAuth} from '../authContext'
import LikePost from './LikePost'
import DeleteButton from './DeleteButton'
//component for rendering single post
function Post({post:{body,createdAt,id,username,likeCount,commentCount,likes}}) {
  const [{user}]=useAuth()
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>{" "}
      <Card.Content extra>
        <LikePost post={{ id, likes, likeCount }} />
        <Popup
         inverted
          content="comment on this post"
          trigger={
            <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
              <Button color="blue" basic>
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          }
        />

        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default Post