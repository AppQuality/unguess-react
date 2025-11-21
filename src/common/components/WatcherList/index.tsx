import {
  Alert,
  Button,
  IconButton,
  MD,
  Skeleton,
  Tooltip,
  TooltipModal,
} from '@appquality/unguess-design-system';

import React, { ReactNode, useRef, useState } from 'react';
import { Divider } from 'src/common/components/divider';
import { styled, useTheme } from 'styled-components';

import { ReactComponent as EyeIconFill } from 'src/assets/icons/eye-icon-fill.svg';
import { ReactComponent as EyeIcon } from 'src/assets/icons/eye-icon.svg';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';
import { MemberAddAutocomplete } from './MemberAddAutoComplete';
import { UserItem } from './UserItemComponent';
import { WatchButton } from './WatchButton';

const ModalBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  .title-with-icon {
    display: flex;
    align-items: center;

    gap: ${({ theme }) => theme.space.xs};
  }
`;

const UserListWrapper = ({ children }: { children: ReactNode }) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>{children}</>
);
const WatchButtonWrapper = ({ children }: { children: ReactNode }) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>{children}</>
);
const AutoCompleteWrapper = ({ children }: { children: ReactNode }) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>{children}</>
);

const WatcherList = ({
  children,
  isWatching,
  count,
  isLoading,
  size,
  hideWatchButton,
  i18n,
}: {
  children?: ReactNode;
  isWatching: boolean;
  count: number;
  isLoading: boolean;
  hideWatchButton?: boolean;
  size?: 'small' | 'medium';
  i18n: {
    tooltip: {
      title: ReactNode;
      description: ReactNode;
    };
    modal: {
      title: ReactNode;
      description: ReactNode;
      alert?: ReactNode;
    };
    dropdown: {
      title: ReactNode;
      description: ReactNode;
    };
  };
}) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const appTheme = useTheme();
  const watchersCount = count;

  // find all children of type UserList and render them inside the TooltipModal.Body
  const userListChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) && child.type === WatcherList.UserListWrapper
  );
  const watchButtonChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      child.type === WatcherList.WatchButtonWrapper
  );
  const autoCompleteChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      child.type === WatcherList.AutoCompleteWrapper
  );

  return (
    <>
      <Tooltip
        placement="bottom-end"
        type="light"
        size="large"
        content={
          <>
            <MD isBold style={{ marginBottom: appTheme.space.xs }}>
              {i18n.tooltip.title}
            </MD>
            <MD>{i18n.tooltip.description}</MD>
          </>
        }
      >
        <Button
          isBasic
          ref={ref}
          size={size || 'small'}
          onClick={() => setReferenceElement(ref.current)}
        >
          {isLoading ? (
            <Skeleton width="50px" height="50px" />
          ) : (
            <div
              style={{
                display: 'flex',
                gap: appTheme.space.xs,
                alignItems: 'center',
              }}
            >
              {isWatching ? (
                <>
                  <EyeIconFill /> ({watchersCount})
                </>
              ) : (
                <>
                  <EyeIcon /> ({watchersCount})
                </>
              )}
            </div>
          )}
        </Button>
      </Tooltip>
      <TooltipModal
        referenceElement={referenceElement}
        placement="auto"
        hasArrow={false}
        onClose={() => setReferenceElement(null)}
        role="dialog"
      >
        <TooltipModal.Title>
          <MD isBold style={{ marginBottom: appTheme.space.xs }}>
            {i18n.modal.title}
          </MD>
        </TooltipModal.Title>
        <TooltipModal.Body style={{ maxHeight: '360px', overflowY: 'auto' }}>
          <ModalBodyContainer>
            <MD>{i18n.modal.description}</MD>
            {i18n.modal.alert && <Alert type="info">{i18n.modal.alert}</Alert>}
            {!hideWatchButton && watchButtonChildren}
            <Divider />
            {userListChildren}
          </ModalBodyContainer>
        </TooltipModal.Body>
        <TooltipModal.Body>
          {!hideWatchButton && (
            <DropdownContainer>
              <div className="title-with-icon">
                <MD isBold>{i18n.dropdown.title}</MD>
                <Tooltip
                  placement="top"
                  type="light"
                  size="large"
                  content={i18n.dropdown.description}
                >
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </div>
              {autoCompleteChildren}
            </DropdownContainer>
          )}
        </TooltipModal.Body>
      </TooltipModal>
    </>
  );
};

WatcherList.UserListWrapper = UserListWrapper;
WatcherList.WatchButtonWrapper = WatchButtonWrapper;
WatcherList.AutoCompleteWrapper = AutoCompleteWrapper;

WatcherList.UserItemComponent = UserItem;
WatcherList.WatchButtonComponent = WatchButton;
WatcherList.MemberAddAutocompleteComponent = MemberAddAutocomplete;

export { WatcherList };
