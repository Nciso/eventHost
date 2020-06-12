import React from 'react';
import { css, cx } from 'emotion';
import { neutral, green, red } from '../../../theme';

const Button = props => {
  const { variant = 'primary' } = props;
  const variants = {
    primary: css`
      background-color: ${green[100]};
    `,
    warning: css`
      background-color: ${red[100]};
    `,
  };

  return (
    <button
      className={cx(
        css`
          max-width: 12rem;
          height: 3rem;
          cursor: pointer;
          color: ${neutral[100]};
          font-weight: bold;
          border: none;
          border-radius: 5px;
          &:active, &:focus: {
            border: none;
            outline: thin dotted;
          }
        `,
        variants[variant]
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
