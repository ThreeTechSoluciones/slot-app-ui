import * as s from './CurrencyInput.styles';
import React from 'react';

function formatArgentinePeso(value: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(value);
}

type CurrencyInputProps = {
  value: number | null;
  onChange: (value: number | null) => void;
  width: string;
  placeholder?: string;
  style?: React.CSSProperties;
};

export default function CurrencyInput({
  value,
  onChange,
  width,
  placeholder,
  style,
}: CurrencyInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    if (!raw) {
      onChange(null);
      return;
    }
    const numberValue = parseFloat(raw) / 100;
    onChange(numberValue);
  };

  return (
    <s.PriceInput
      type="text"
      value={value !== null ? formatArgentinePeso(value) : ''}
      onChange={handleChange}
      width={width}
      placeholder={placeholder}
      style={style}
    />
  );
}
