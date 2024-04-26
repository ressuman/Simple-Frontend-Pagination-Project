import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Post } from "./components/Post/Post";
import { Paginations } from "./components/Paginations/Paginations";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    const options = {
      method: import.meta.env.VITE_REACT_RAPID_API_METHOD,
      url: import.meta.env.VITE_REACT_RAPID_API_URL,
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_REACT_RAPID_API_KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_REACT_RAPID_API_HOST,
      },
    };
    setLoading(true);
    try {
      const response = await axios.request(options);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
      setError("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-5">
      <h1 className="text-primary mb-3">My TV Series Blog</h1>
      <Row>
        <Col>
          <Post posts={currentPosts} loading={loading} error={error} />
          <Paginations
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
