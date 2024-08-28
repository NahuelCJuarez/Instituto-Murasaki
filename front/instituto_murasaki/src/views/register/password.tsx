import { useState } from 'react';
import { Field } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordField = ({ name }: { name: string }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Field
        name={name}
        type={showPassword ? 'text' : 'password'}
        style={{ paddingRight: '40px' }}
      />
      <div
        onClick={togglePasswordVisibility}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
    </div>
  );
};

export default PasswordField;
