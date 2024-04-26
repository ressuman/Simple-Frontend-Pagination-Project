import { ListGroup, Spinner, Alert, Badge } from "react-bootstrap";
import PropTypes from "prop-types";

export const Post = ({ posts, loading, error }) => {
  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <ListGroup as="ol" numbered className="mb-4">
      {posts.map((post) => (
        <ListGroup.Item
          action
          variant="info"
          as="li"
          className="d-flex justify-content-between align-items-start"
          key={post.id}
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{post.title}</div>
            {post.description}
          </div>
          {post.genre.map((genre, index) => (
            <Badge key={index} bg="primary" pill className="me-1">
              #{genre}
            </Badge>
          ))}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

Post.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};
