import { Container, Message } from './SearchNotFound.styles';
import SearchEmptyIcon from '../../assets/search-empty.svg';
import { DEFAULT_FONT_SIZE } from '../../utils/Stylesheet';
interface SearchNotFoundProps {
  message?: string;
  iconWidth?: number;
  iconHeight?: number;
  fontSize?: string;
}
export function SearchNotFound({
  message = 'No hay resultados para mostrar.',
  iconWidth = 40,
  iconHeight = 40,
  fontSize = DEFAULT_FONT_SIZE,
}: SearchNotFoundProps) {
  return (
    <Container>
      <img src={SearchEmptyIcon} width={iconWidth} height={iconHeight} alt="No results" />
      <Message $fontSize={fontSize}>{message}</Message>
    </Container>
  );
}
