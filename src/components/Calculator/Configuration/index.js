import React from "react";
import {
  ButtonGroup,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "reactstrap";
import {
  Alert,
  UncontrolledPopover,
  PopoverBody,
  PopoverHeader,
} from "reactstrap";
import Restrictions from "./Restrictions";
import Variables from "./Variables";

class Configuration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { faltaDescrip: "" };
  }

  //Función que permite validar si se ingresaron todos los cambios correspondientes en la etapa
  isValidated() {
    let { variables, restricciones } = this.props.status;
    let variablesDescriptionsMin = variables.filter(
      (va) => va.descripcion !== ""
    );
    let restriccionesDescriptionsMin = restricciones.filter(
      (re) => re.descripcion !== ""
    );
    if (
      (variablesDescriptionsMin.length > 1) &
      (restriccionesDescriptionsMin.length > 0)
    ) {
      this.props.lastStep(1);
      this.setState({ faltaDescrip: "" });
      return true;
    } else if (variablesDescriptionsMin.length < 2) {
      this.setState({ faltaDescrip: "Se necesitan como mínimo dos variables" });
    } else if (restriccionesDescriptionsMin.length < 1) {
      this.setState({
        faltaDescrip: "Se necesita como mínimo una restricción",
      });
    }
    return false;
  }

  //Funcion que se encarga de traspasar los cambios al padre
  handleRestrictions = (restricciones) =>
    this.props.handleRestricciones(restricciones);

  //Funcion que se encarga de traspasar los cambios al padre
  handleVariables = (variables) => this.props.handleVariables(variables);

  //Modelos
  showModels = () => this.props.showModels();

  render() {
    //Obtenemos de las props, las varaibles y restricciones.
    let { variables, restricciones, method } = this.props.status;

    let buttonsMethods = (
      <ButtonGroup id="ButtUtil">
        <Button
          outline
          onClick={() => this.props.handleMethod("graph")}
          active={this.props.status.method === "graph"}
          color="danger"
        >
          Gráfico
        </Button>
        <Button
          outline
          onClick={() => this.props.handleMethod("simplex")}
          active={this.props.status.method === "simplex"}
          color="warning"
        >
          Simplex
        </Button>
      </ButtonGroup>
    );
    let buttonsOptType = (
      <ButtonGroup>
        <Button
          outline
          onClick={() => this.props.handleObjective("max")}
          active={this.props.status.objective === "max"}
          color="danger"
        >
          Maximizar
        </Button>
        <Button
          outline
          onClick={() => this.props.handleObjective("min")}
          active={this.props.status.objective === "min"}
          color="warning"
        >
          Minimizar
        </Button>
      </ButtonGroup>
    );

    return (
      <>
        <h3>Simplex-App</h3>
        <Container>
          <Row>
            <Col>
              <UncontrolledPopover
                flip={false}
                trigger="hover"
                placement="top"
                target="CardUtil"
              >
                <PopoverBody>
                  Aquí debes seleccionar el método de cálculo y visualización de
                  los resultados.
                </PopoverBody>
              </UncontrolledPopover>
              <Card
                color="success"
                inverse
                id="CardUtil"
                className="my-3 mx-auto"
              >
                <CardHeader>Método a utilizar</CardHeader>
                <CardBody>{buttonsMethods}</CardBody>
              </Card>
            </Col>

            <Col>
              <UncontrolledPopover
                flip={false}
                trigger="hover"
                placement="top"
                target="CardOpt"
              >
                <PopoverBody>
                  Y aquí el tipo de optimizacion que deseas realizar: si deseas
                  maximizar o minimizar la función.
                </PopoverBody>
              </UncontrolledPopover>
              <Card color="success" inverse id="CardOpt" className="mt-3 mx-auto">
                <CardHeader>Tipo de optimización</CardHeader>
                <CardBody>{buttonsOptType}</CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <UncontrolledPopover
              flip={false}
              trigger="hover"
              placement="top"
              target="CardVariables"
            >
              <PopoverHeader>Variables de Desición</PopoverHeader>
              <PopoverBody>
                Aquí debes ingresar las variables que formarán parte del modelo,
                las mismas son de carga dinámica.
              </PopoverBody>
            </UncontrolledPopover>
            <Card
              color="success"
              inverse
              id="CardVariables"
              className="w-100 mt-3 mx-auto"
            >
              <CardHeader>
                <CardTitle className="text-left">
                  <h4>Variables de Desición</h4>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Variables
                  method={method}
                  handleVariables={this.handleVariables}
                  variables={variables}
                />
              </CardBody>
            </Card>
          </Row>
          <Row>
            <UncontrolledPopover
              flip={false}
              trigger="hover"
              placement="top"
              target="CardRestri"
            >
              <PopoverHeader>Restricciones</PopoverHeader>
              <PopoverBody>
                Aquí debes ingresar las restricciones que formarán parte del
                modelo, éstas también son de carga dinámica.
              </PopoverBody>
            </UncontrolledPopover>
            <Card
              color="success"
              inverse
              id="CardRestri"
              className="w-100 mt-3 mx-auto"
            >
              <CardHeader>
                <CardTitle className="text-left">
                  <h4>Restricciones</h4>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Restrictions
                  handleRestrictions={this.handleRestrictions}
                  restricciones={restricciones}
                />
              </CardBody>
            </Card>
          </Row>
          {this.state.faltaDescrip !== "" && (
            <Row className="mt-3">
              <Alert className="mx-auto" color="danger">
                {this.state.faltaDescrip}
              </Alert>
            </Row>
          )}
        </Container>
      </>
    );
  }
}

export default Configuration;
