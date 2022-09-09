import {
  Input,
  Label,
  Message,
  Span,
  theme as globalTheme,
  XL,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import {
  useRef,
  useState,
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  forwardRef,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { InputToggleArgs } from './_types';

interface IInputToggleContext {
  isEditing?: boolean;
  setIsEditing?: (isEditing: boolean) => void;
}

const ToggleContext = createContext<IInputToggleContext>({});

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledInput = styled(Input)`
  border-radius: 0;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom-width: 2px;
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.xxs}`};
  width: 100%;

  &[readonly] {
    background-color: transparent;
    border-color: transparent;
    transition: border-color 0s;
  }

  &:focus {
    box-shadow: none;
    transition: border-color 0.2s ease-in-out 0.1s;
  }
`;

const StyledLabel = styled(Label)`
  transition: opacity 0.2s ease-in-out;
`;

const StyledMessage = styled(Message)`
  margin-top: ${({ theme }) => theme.space.sm};
`;

const IconContainer = styled.div`
  margin-left: ${({ theme }) => theme.space.md};
  cursor: pointer;
`;

const Wrapper = styled.div<InputToggleArgs>`
  display: flex;
  flex-direction: column;

  & not(:focus) {
    ${StyledLabel}, ${StyledInput} {
      opacity: 0;
    }
  }
`;

/*
 * An Input Toggle lets users use the input by activating it pressing the edit button.
 * <hr>
 * Used for this:
 *  - To let the user enter data into a field
 *  - To enter multiline text, use a Textarea
 */
const InputToggleOLD = (props: InputToggleArgs) => {
  const {
    validation,
    size,
    label,
    message,
    required,
    onBlur,
    placeholder,
    endIcon,
    style,
    isFocused,
    ...rest
  } = props;

  const [isEditing, setIsEditing] = useState(isFocused);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, []);

  const onClick = () => {
    setIsEditing(true);
    inputRef.current?.focus();
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      setIsEditing(false);
      inputRef.current?.blur();
    }
  };

  const handleOnBlur = () => {
    setIsEditing(false);
    inputRef.current?.blur();
  };

  return (
    <Wrapper {...(style && { style })}>
      {label && (
        <StyledLabel
          isRegular
          {...(isEditing
            ? { style: { opacity: 1 } }
            : { style: { opacity: 0 } })}
        >
          {label}
          {label && required ? (
            <Span style={{ color: globalTheme.palette.red[600] }}>*</Span>
          ) : null}
        </StyledLabel>
      )}
      <InputContainer>
        <StyledInput
          placeholder={placeholder}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onBlur={(e) => {
            onBlur?.(e);
            handleOnBlur();
          }}
          ref={inputRef}
          {...(isEditing ? { readOnly: false } : { readOnly: true })}
          {...(size ? { style: { fontSize: `${size}px` } } : {})}
          {...(validation && { validation })}
          {...rest}
        />
        {!isEditing && endIcon && (
          <IconContainer onClick={onClick}>{endIcon}</IconContainer>
        )}
      </InputContainer>
      {message && (
        <StyledMessage
          validation={validation}
          {...(message ? { style: { opacity: 1 } } : { style: { opacity: 0 } })}
        >
          {message}
        </StyledMessage>
      )}
    </Wrapper>
  );
};

const InputItem = forwardRef<HTMLInputElement, InputToggleArgs>(
  (props, ref) => {
    const { placeholder = 'Insert a value', value } = props;

    const { isEditing } = useContext(ToggleContext);

    return isEditing ? (
      <StyledInput {...props} />
    ) : (
      <XL isBold>{value ?? placeholder}</XL>
    );
  }
);

const InputToggle = ({ isFocused, ...props }: InputToggleArgs) => {
  const [isEditing, setIsEditing] = useState<boolean>(!!isFocused);
  const context = useMemo(() => ({ isEditing, setIsEditing }), [isEditing]);
  const container = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsEditing(true);
    container.current?.focus();
  };

  return (
    <ToggleContext.Provider value={context}>
      <Wrapper
        ref={container}
        onClick={handleClick}
        onBlur={() => setIsEditing(false)}
        {...props}
      />
    </ToggleContext.Provider>
  );
};

InputToggle.Item = InputItem;
InputToggle.Label = StyledLabel;

export { InputToggle };
