
import Container from 'react-bootstrap/Container';
import "./cabecalho.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Filtro from './filtro';
import Firebaseauth from '../conta/firebase-auth';
import { useEffect, useState } from 'react';
import { auth } from '../../services/firebase';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CheckFavoritos from './checkFavoritos';
function Cabecalho({ filterValue, handleFilterChange, selectedGenre, handleGenreChange, genres, isFilterButtonClicked,handleFilterButtonClick }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className='mx-2'>
        <Navbar.Brand className='titleHeader'>Games</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >

            
            <NavDropdown title="Conta" id="navbarScrollingDropdown">

              {user ? (
                <NavDropdown.Item href="/" >

                  <Firebaseauth />

                </NavDropdown.Item>

              ) : (
                <NavDropdown.Item href="/login">
                  Entrar
                </NavDropdown.Item>

              )}
              <NavDropdown.Divider />

            </NavDropdown>



          </Nav>
          <Filtro
            filterValue={filterValue}
            handleFilterChange={handleFilterChange}
            genres={genres}
            selectedGenre={selectedGenre}
            handleGenreChange={handleGenreChange}
            isFilterButtonClicked={isFilterButtonClicked}
            handleFilterButtonClick={handleFilterButtonClick}

          />
          <CheckFavoritos isFilterButtonClicked={isFilterButtonClicked} handleFilterButtonClick={handleFilterButtonClick}/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Cabecalho;