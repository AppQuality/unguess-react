import React from "react";
import LoggedOnly from "./LoggedOnly";
import NotLoggedOnly from "./NotLoggedOnly";

const ContentTemplate = ({
  title,
  subtitle,
  children,
  className,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return <div>{children}</div>;
};

export const OutsideContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};

export const PageTemplate = ({
  children,
  title,
  subtitle,
  shouldBeLoggedIn = false,
  showTitle = true,
  containerClass = "aq-pb-3",
  route,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  shouldBeLoggedIn?: boolean;
  containerClass?: string;
  showTitle?: boolean;
  route: string;
}) => {
  const LoggedStatusWrapper = shouldBeLoggedIn ? LoggedOnly : NotLoggedOnly;

  // map children and separate Modal components from the rest
  const [modalChildren, pageChildren] = React.Children.toArray(children).reduce(
    (acc: React.ReactNode[], child) => {
      if (React.isValidElement(child) && child.type === OutsideContainer) {
        acc[0] = (
          <>
            {acc[0]}
            {child}
          </>
        );
      } else {
        acc[1] = (
          <>
            {acc[1]}
            {child}
          </>
        );
      }
      return acc;
    },
    [<></>, <></>] as React.ReactNode[]
  );

  const content = (
    <ContentTemplate
      className={containerClass}
      title={showTitle ? title : undefined}
      subtitle={subtitle}
    >
      {pageChildren}
    </ContentTemplate>
  );

  return (
      <LoggedStatusWrapper>
        {modalChildren}
        {/* {shouldBeLoggedIn ? (
          <TesterSidebar route={route}>{content}</TesterSidebar>
        ) : (
          content
        )} */}
        {content}
      </LoggedStatusWrapper>
  );
};
