import { Container, Message, Icon } from './SearchNotFound.styles';
import SearchIcon from '../../assets/search-icon.svg';
interface SearchNotFoundProps {
  message?: string;
}
export function SearchNotFound({
  message = 'No hay resultados para mostrar.',
}: SearchNotFoundProps) {
  return (
    <Container>
      <Icon src={SearchIcon} alt="No results" />
      <Message>{message}</Message>
    </Container>
  );
}
