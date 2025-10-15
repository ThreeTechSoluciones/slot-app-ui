import React, { useState } from "react";
import ArrowIcon from "../../assets/arrow-icon.png";
import {
  HeaderContainer,
  SortIcon,
  Text,
} from "../sort_button/SortButton.styles";

interface SortableHeaderProps {
  text: string;
  onSort?: (asc: boolean) => void;
}

export const SortableButton: React.FC<SortableHeaderProps> = ({
  text,
  onSort,
}) => {
  const [asc, setAsc] = useState(true);

  const handleClick = () => {
    setAsc(!asc);
    onSort?.(!asc);
  };

  return (
    <HeaderContainer onClick={handleClick}>
      <Text>{text}</Text>
      <SortIcon src={ArrowIcon} alt="sort" $rotated={!asc} />
    </HeaderContainer>
  );
};
