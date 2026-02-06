import { Container, Message, Icon } from "./SearchNotFound.styles";
import SearchIcon from "../../assets/search-icon.svg";

export function SearchNotFound() {
  return (
    <Container>
      <Icon src={SearchIcon} alt="No results" />
      <Message>No hay resultados para mostrar.</Message>
    </Container>
  );
}
