import { Container, Message, Icon } from "./SearchNotFound.styles";
import SearchIcon from "../../assets/search-icon.svg";

export function SearchNotFound() {
  return (
    <Container>
      <Icon src={SearchIcon} alt="No results" />
      <Message>
        No encontramos coincidencias para tu búsqueda. <br />
        Probá cambiar los filtros o modificar el término de búsqueda.
      </Message>
    </Container>
  );
}