import { useEffect, useRef, useState } from "react";
import {
  ButtonOption,
  ButtonTrigger,
  DropdownContainer,
  DropdownMenuStyle,
} from "./DropdownMenu.styles";

interface MenuOption {
  label: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  options: MenuOption[];
  label?: string;
  icon?: React.ReactNode;
}
export function DropdownMenu({ options, label, icon }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const handleToggle = () => setOpen(!open);

  const handleOptionClick = (callback: () => void) => {
    callback();
    setOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <DropdownContainer ref={menuContainerRef}>
      <ButtonTrigger onClick={handleToggle}>
        {label && <span>{label}</span>}
        {icon}
      </ButtonTrigger>

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
