import InputMask from 'react-input-mask';
import styles from '../styles/Home.module.scss';

const PhoneInput = ({
  name,
  value,
  onChange,
  error,
  placeholder = '+01 (xxx) - xxxx - xxx',
}) => {
  return (
    <>
      <InputMask
        mask="+01 (999) - 9999 - 999"
        value={value}
        onChange={(e) => {
          const digitsOnly = e.target.value.replace(/\D/g, '').slice(-10);

          onChange({
            target: {
              name,
              value: digitsOnly,
            },
          });
        }}
      >
        {(inputProps) => (
          <input
            {...inputProps}
            type="tel"
            className={`form-control ${error ? styles.inputError : ''}`}
            placeholder={placeholder}
          />
        )}
      </InputMask>

      {error && <small className="text-danger">{error}</small>}
    </>
  );
};

export default PhoneInput;
