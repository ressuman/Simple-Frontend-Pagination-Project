import { Pagination, Container } from "react-bootstrap";
import PropTypes from "prop-types";

export const Paginations = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePagination = (pageNumber) => {
    paginate(pageNumber);
  };

  return (
    <Container className="d-flex justify-content-center">
      <Pagination>
        <Pagination.First onClick={() => handlePagination(1)} />
        <Pagination.Prev onClick={() => handlePagination(currentPage - 1)} />
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (number) => (
            <Pagination.Item
              key={number}
              onClick={() => handlePagination(number)}
              active={number === currentPage}
            >
              {number}
            </Pagination.Item>
          )
        )}
        <Pagination.Next onClick={() => handlePagination(currentPage + 1)} />
        <Pagination.Last onClick={() => handlePagination(totalPages)} />
      </Pagination>
    </Container>
  );
};

Paginations.propTypes = {
  postsPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
