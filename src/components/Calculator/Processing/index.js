import React from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Alert,
} from "reactstrap";
import Restriccion from "./Restriccion";
import FuncionObj from "./FuncionObj";

class Processing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { faltaCoe: "" };
  }

  isValidated() {
    //Verificando si los coeficientes de las variables y las restricciones no son nulos
    let verifQty = this.props.status.variables
      .filter((va) => va.descripcion !== "")
      .every((va) => va.coeficiente !== "");
    let veriResQty = this.props.status.restricciones
      .filter((re) => re.descripcion !== "")
      .every(
        (re) => re.coeficientes.every((co) => co !== "") && re.derecha !== ""
      );
    if (verifQty && veriResQty) {
      //console.log(verifQty+'dff:'+veriResQty);

      this.props.lastStep(2);
      this.setState({ faltaCoe: "" });
      return true;
    } else {
      let faltaCoe;
      faltaCoe = veriResQty
        ? "Falta algun coeficiente del Funcional"
        : "Falta algun coeficiente en las Restricciones";
      this.setState({ faltaCoe });
      return false;
    }
  }

  //En el siguiente handler, se toma del input de una variable en particular el coeficiente.
  handleCoefVar = (event) => {
    let { value, name } = event.target;
    if (value) {
      let { variables } = this.props.status;
      variables[name].coeficiente = parseInt(value);
      this.props.handleVariables(variables);
    }
  };

  handleCoefRes = (event, ri) => {
    let { name, value } = event.target;
    let { restricciones } = this.props.status;

    switch (name) {
      case "derecha":
        restricciones[ri].derecha = Number(value);
        break;
      case "eq":
        restricciones[ri].eq = value;
        break;
      default:
        restricciones[ri].coeficientes[name] = Number(value);
        break;
    }
    this.props.handleRestricciones(restricciones);
  };

  render() {
    //Obtenemos las propiedades del Super
    let { variables } = this.props.status;
    let { restricciones } = this.props.status;
    let varsOperativas = variables.filter((va) => va.descripcion !== "").length;

    //Generamos el renderizado para cada una de los elementos de los arreglos obtenidos anteriormente.
    let restriccionesInput = restricciones
      .filter((item) => item.descripcion !== "")
      .map((restriccion, index) => (
        <Restriccion
          className="mt-1"
          key={"R" + index}
          handleCoefRes={this.handleCoefRes}
          cantVariables={varsOperativas}
          restriccion={restriccion}
        />
      ));

    return (
      <>
        <h3> Inserta los Datos del Modelo</h3>
        <Container>
          {/* <Row>
            <ReferencesList variables={variables} restricciones={restricciones} />
          </Row> */}
          <Row>
            <Card color="success" inverse className="w-100 mt-3">
              <CardHeader>
                <CardTitle className="text-left">
                  <h4>Funci??n objetivo</h4>
                </CardTitle>
              </CardHeader>
              <CardBody className="mx-auto">
                <FuncionObj
                  variables={variables}
                  handleCoefVar={this.handleCoefVar}
                  objective={this.props.status.objective}
                />
              </CardBody>
            </Card>
          </Row>
          <Row>
            <Card color="success" inverse className="w-100 mt-3">
              <CardHeader>
                <CardTitle className="text-left">
                  <h4>Restricciones</h4>
                </CardTitle>
              </CardHeader>
              <CardBody>{restriccionesInput}</CardBody>
            </Card>
          </Row>
          {this.state.faltaCoe !== "" && (
            <Row className="mt-3">
              <Alert className="mx-auto" color="success">
                {this.state.faltaCoe}
              </Alert>
            </Row>
          )}
        </Container>
      </>
    );
  }
}

export default Processing;
