import { useState } from "react";
import {
  ButtonDots,
  ButtonOption,
  DropdownContainer,
  DropdownMenuStyle,
} from "./DropdownMenu.styles";

interface MenuOption {
  label: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  options: MenuOption[];
  icon: string;
}

export function DropdownMenu({ options, icon }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  const handleOptionClick = (callback: () => void) => {
    callback();
    setOpen(false);
  };

  return (
    <DropdownContainer>
      <ButtonDots onClick={handleToggle}>
        <img src={icon} alt="Menu" className="dots-icon" />
      </ButtonDots>

      {open && (
        <DropdownMenuStyle>
          {options.map((opt, idx) => (
            <ButtonOption
              key={idx}
              onClick={() => handleOptionClick(opt.onClick)}
            >
              {opt.label}
            </ButtonOption>
          ))}
        </DropdownMenuStyle>
      )}
    </DropdownContainer>
  );
}
