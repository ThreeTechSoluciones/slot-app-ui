import React, { useState } from 'react';
import SortIcon from '../../assets/sort-icon.png';
import * as s from '../sort_button/SortButton.styles';

interface SortableHeaderProps {
  text: string;
  onSort?: (asc: boolean) => void;
  allowWrap?: boolean;
}

export const SortableButton: React.FC<SortableHeaderProps> = ({ text, onSort, allowWrap }) => {
  const [asc, setAsc] = useState(true);

  const handleClick = () => {
    setAsc(!asc);
    onSort?.(!asc);
  };

  return (
    <s.HeaderContainer onClick={handleClick}>
      <s.Text
        style={{
          whiteSpace: allowWrap ? 'pre-line' : 'nowrap',
          textAlign: 'center',
        }}
      >
        {text}
      </s.Text>
      <s.SortIcon src={SortIcon} alt="sort" $rotated={!asc} />
    </s.HeaderContainer>
  );
};
