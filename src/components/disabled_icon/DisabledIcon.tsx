import * as s from './DisabledIcon.styles';
interface DisabledIconProps {
  icon: React.ReactNode;
  alt?: string;
  tooltip: string;
  disabled?: boolean;
  disabledTooltip?: string;
  onClick?: () => void;
  className?: string;
}

export const DisabledIcon: React.FC<DisabledIconProps> = ({
  icon,
  alt,
  tooltip,
  disabled = false,
  disabledTooltip,
  onClick,
  className,
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const tooltipText = disabled ? (disabledTooltip ?? tooltip) : tooltip;

  return (
    <s.TooltipContainer disabled={disabled} onClick={handleClick} className={className}>
      {icon}
      <s.Tooltip>{tooltipText}</s.Tooltip>
    </s.TooltipContainer>
  );
};
