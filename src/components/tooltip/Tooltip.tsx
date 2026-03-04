import * as s from './Tooltip.styles';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, className }) => {
  return (
    <s.Container className={className}>
      {children}
      <s.TooltipContent>{content}</s.TooltipContent>
    </s.Container>
  );
};
