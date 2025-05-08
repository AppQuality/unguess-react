import { Content } from '@appquality/unguess-design-system';
import { ComponentProps, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { AppSidebar } from 'src/common/components/navigation/sidebar';
import {
  setSidebarOpen,
  toggleSidebar,
} from 'src/features/navigation/navigationSlice';
import { NoActiveWorkSpaceState } from 'src/features/templates/NoActiveWorkspaceState';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { styled } from 'styled-components';
import { NavigationHeader } from './NavigationHeader';
import { NavigationProfileModal } from './NavigationProfileModal';

const StyledContent = styled(Content)<
  ComponentProps<typeof Content> & {
    isMinimal?: boolean;
    children?: React.ReactNode;
  }
>`
  height: ${({ isMinimal, theme }) =>
    isMinimal
      ? '100%'
      : `calc(100% - ${theme.components.chrome.header.height})`};
`;

export const Navigation = ({
  children,
  route,
  isMinimal = false,
}: {
  children: React.ReactNode;
  route: string;
  isMinimal?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { activeWorkspace, isLoading } = useActiveWorkspace();

  useEffect(() => {
    switch (route) {
      case 'service':
      case 'campaigns':
      case 'bugs':
      case 'bug':
      case 'video':
      case 'videos':
      case 'insights':
        dispatch(setSidebarOpen(false));
        break;
      case 'template':
        dispatch(setSidebarOpen(false));
        break;
      default:
        dispatch(setSidebarOpen(true));
        break;
    }
  }, [route]);

  // Set current params
  const params = useParams();

  let parameter = '';

  if (params) {
    Object.keys(params).forEach((key) => {
      if (key !== 'language') {
        parameter = params[`${key}`] ?? '';
      }
    });
  }

  const toggleSidebarState = () => {
    dispatch(toggleSidebar());
  };

  if (!activeWorkspace && !isLoading) return <NoActiveWorkSpaceState />;

  return (
    <>
      <NavigationHeader isMinimal={isMinimal} />
      <NavigationProfileModal />
      <StyledContent isMinimal={isMinimal}>
        <AppSidebar
          route={
            route === 'projects' && parameter !== ''
              ? `${route}/${parameter}`
              : route
          }
          onSidebarToggle={toggleSidebarState}
          {...(isMinimal && { style: { display: 'none' } })}
        />
        {children}
      </StyledContent>
    </>
  );
};
