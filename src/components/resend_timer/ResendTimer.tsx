import { useEffect, useState } from 'react';
import { FONT_WEIGHT_BOLD } from '../../utils/Stylesheet';

interface Props {
  seconds: number;
  onResend: () => void;
}

export function ResendTimer({ seconds, onResend }: Props) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleClick = () => {
    if (timeLeft > 0) return;

    onResend();
    setTimeLeft(seconds);
  };

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <p
      onClick={handleClick}
      style={{
        cursor: timeLeft > 0 ? 'not-allowed' : 'pointer',
        opacity: timeLeft > 0 ? 0.5 : 1,
        textDecoration: 'underline',
        fontWeight: FONT_WEIGHT_BOLD,
      }}
    >
      {timeLeft > 0 ? `Reenviar código en (${formatTime(timeLeft)})` : 'Reenviar código'}
    </p>
  );
}
