import React from "react";
import { Link } from "react-router-dom";
import { Button, Jumbotron, Container, Row, Col,PopoverBody,UncontrolledPopover } from "reactstrap";
import { AiFillGithub } from "@react-icons/all-files/ai/AiFillGithub";

const Calculator = () => {
  return (
    <Container fluid className="App-home">
      <Row className="">
        <Col xs={9} md={6} className="my-3 mx-auto">
          <Jumbotron>
            <Row className="">
              <Col xs={10} className="mx-auto ">
              <Link to={"/Calculator/Page"} className="logo-btn bottom ">
                <img
                  src={"../logo.png"}
                  className="App-logo"
                  alt="logo"
                  height="200"
                />
                <span class="logotex">¡Calculadora!</span>
                 </Link>
              </Col>
            </Row>
            {/* <Row className="">
              <Col>
                <Link to={"/Calculator/Page"}>
                  <Button size="lg" color="success">
                    Calculadora
                  </Button>
                </Link>
              </Col>
            </Row> */}
            <Row className="">
              <Col>
                <h2 className="my-3 mx-auto">Angie Ortiz</h2>
                <h2 className="my-3 mx-auto">Daniel Toquica</h2>
                <a
                  href="https://github.com/ToquiNovic/Simplex-App.git"
                  target="_blank"
                  rel="noopener noreferrer" className="GitHub"
                >
                  <AiFillGithub size={50}></AiFillGithub>
                  <span class="gittex">¡IR AL REPOSITORIO!</span>
                </a>
              </Col>
            </Row>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

export default Calculator;
