import PageNotFoundIcon from "../../assets/page-not-found.svg";
import * as s from "./NotFoundPage.styles";
import { Calendario } from "../../routes/RoutesUtils";
const NotFoundPage = () => {
  return (
    <s.PageNotFoundContainer>
      <img src={PageNotFoundIcon} />
      <s.Message>Lo sentimos, esta página no existe.</s.Message>
      <s.BackToHome to={Calendario}> Volver al inicio </s.BackToHome>
    </s.PageNotFoundContainer>
  );
};

export default NotFoundPage;
