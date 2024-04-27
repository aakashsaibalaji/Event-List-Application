import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';
const Header = () => {
  const [auth,setAuth] =useAuth();
    const handleLogout =()=>{
        setAuth({
            ...auth,user:null,token:'',
        })
        localStorage.removeItem('user');
        toast.success("succesfully Logout");
    }
  return (
    <div>
        <Navbar expand="lg" className="bg-body-tertiary shadow">
            <Container fluid className='d-flex justify-content-between'>
                <div>
                  <Navbar.Brand>Event Lists</Navbar.Brand>
                </div>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                      <Nav
                          className="me-auto my-lg-0"
                          style={{ maxHeight: '200px' }}
                          navbarScroll
                      >
                      {!auth.user ?(<>
                        <LinkContainer to="/login">
                          <Nav.Link>Login</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/register">
                        <Nav.Link>Register</Nav.Link>
                      </LinkContainer>
                      </>):(<>
                        <LinkContainer to="/home">
                          <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/Event">
                          <Nav.Link>Event</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/category">
                          <Nav.Link>Category</Nav.Link>
                        </LinkContainer>
                        <LinkContainer onClick={handleLogout} to="/login">
                          <Nav.Link >LOGOUT</Nav.Link>
                        </LinkContainer>
                      </>)}
                      </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default Header