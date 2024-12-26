import { TextareaAutosize } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { CSSProperties } from 'react';

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  fontFamily: 'var(--font-montserrat)',
  fontWeight: 400,
  lineHeight: 1.5,
  fontSize: 14,
  marginTop: 10,
  padding: '8px 0px',
  boxShadow: 'none',
  border: 'none',
  borderBottom: '1px solid',
  borderColor: theme.palette.grey['400'],
  '&:hover': {
    borderColor: theme.palette.common.black,
  },
  '&:disabled &:hover': {
    borderColor: theme.palette.grey['400'],
  },
  '&:focus': {
    borderColor: theme.palette.common.black,
  },
  '&:focus-visible': {
    outline: 0,
  },
  '&:disabled': {
    backgroundColor: 'transparent',
  },
}));

interface Props {
  id?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
  disabled?: boolean;
  ariaLabelledBy?: string;
  sx?: CSSProperties;
}

const Textarea: React.FC<Props> = ({
  id,
  value,
  onChange,
  placeholder,
  minRows = 1,
  maxRows = 10,
  disabled = false,
  sx,
  ariaLabelledBy,
}) => {
  return (
    <StyledTextarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      minRows={minRows}
      maxRows={maxRows}
      disabled={disabled}
      aria-labelledby={ariaLabelledBy}
      sx={sx}
    />
  );
};

export { Textarea };
