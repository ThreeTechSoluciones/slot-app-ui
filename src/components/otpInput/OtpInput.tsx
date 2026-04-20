import { useRef } from 'react';
import * as s from './OtpInput.styles';

interface Props {
  length?: number;
  onChange: (value: string) => void;
}

function OtpInput({ length = 6, onChange }: Props) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return;

    const newValues = inputsRef.current.map((input) => input?.value || '');
    newValues[index] = value;

    onChange(newValues.join(''));

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !inputsRef.current[index]?.value) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    const clean = paste.replace(/[^a-zA-Z0-9]/g, '').slice(0, length);
    const chars = clean.split('');

    chars.forEach((char, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index]!.value = char;
      }
    });
    onChange(chars.join(''));
    const nextIndex = chars.length < length ? chars.length : length - 1;
    inputsRef.current[nextIndex]?.focus();
  };
  return (
    <s.Container>
      {Array.from({ length }).map((_, index) => (
        <s.Input
          key={index}
          maxLength={1}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
        />
      ))}
    </s.Container>
  );
}

export default OtpInput;
