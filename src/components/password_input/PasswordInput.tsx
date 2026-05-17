import { useState } from 'react';
import OpenEyeIcon from '../../assets/openEye-icon.png';
import ClosedEyeIcon from '../../assets/closeEye-icon.png';
import { InputField } from '../input_field/InputField';

export function PasswordInput(props: any) {
  const [show, setShow] = useState(false);

  return (
    <InputField
      {...props}
      type={show ? 'text' : 'password'}
      icon={show ? OpenEyeIcon : ClosedEyeIcon}
      isInteractiveIcon
      onIconClick={() => setShow((prev) => !prev)}
    />
  );
}
