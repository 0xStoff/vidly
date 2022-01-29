import { useNavigate, NavLink, Outlet } from "react-router-dom";
import React, { useState } from "react";
import { Navbar, Container, Nav, Modal, Button } from "react-bootstrap";
import DarkMode from "../components/common/darkMode";

/* Navigation-Links with different paths */
const NavbarComponent = ({ user }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleLogout = () => {
    setShow(false);
    navigate("/logout");
  };
  const handleShow = () => setShow(true);

  return (
    <Navbar className="mt-5">
      <Container className="mb-3">
        <Nav>
          {/* <h1>{user.username}</h1> */}
          <NavLink className="nav-link h5" to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav-link h5" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-link h5" to="/rentals">
            Rentals
          </NavLink>
          {!user && (
            <React.Fragment>
              <NavLink className="nav-link h5" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-link h5" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              {/* <NavLink className="nav-link h5" to="/logout">
                Logout
              </NavLink> */}
              <h5 className="nav-link" type="button" onClick={handleShow}>
                Logout{" "}
              </h5>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Are you sure you want to logout?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                  <button className="btn button" onClick={handleClose}>
                    stay
                  </button>
                  <button className="btn button" onClick={handleLogout}>
                    logout
                  </button>
                  {/* <NavLink className="nav-link h5" to="/logout">
                    Logout
                  </NavLink> */}
                </Modal.Footer>
              </Modal>

              <NavLink className="nav-link h5 mx-3 logout" to="/me">
                <div className="vr ">
                  <p className="m-2">{user.username}</p>
                </div>
              </NavLink>
            </React.Fragment>
          )}
        </Nav>
        <DarkMode />
      </Container>
      <Outlet />
    </Navbar>
  );
};

export default NavbarComponent;
