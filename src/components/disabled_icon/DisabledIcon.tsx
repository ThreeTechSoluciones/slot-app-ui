import * as s from './DisabledIcon.styles';
import { Tooltip } from '../tooltip/Tooltip';

interface DisabledIconProps {
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  tooltip?: React.ReactNode;
  disabledTooltip?: React.ReactNode;
}

export const DisabledIcon: React.FC<DisabledIconProps> = ({
  disabled = false,
  onClick,
  children,
  className,
  tooltip,
  disabledTooltip,
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const tooltipContent = disabled ? (disabledTooltip ?? tooltip) : tooltip;

  const content = (
    <s.Container disabled={disabled} onClick={handleClick} className={className}>
      {children}
    </s.Container>
  );

  if (!tooltipContent) return content;

  return <Tooltip content={tooltipContent}>{content}</Tooltip>;
};
