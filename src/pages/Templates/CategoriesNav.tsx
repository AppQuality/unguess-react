import {
  AsideNav,
  StickyNavItem,
} from 'src/common/components/navigation/asideNav';

const CategoriesNav = () => {
  return (
    <AsideNav containerId="main">
      <StickyNavItem
        to={'tailored'}
        containerId="main"
        spy
        smooth
        duration={500}
        offset={-350}
      >
        tailored
      </StickyNavItem>
      <StickyNavItem
        to="suggested"
        containerId="main"
        spy
        smooth
        duration={500}
        offset={-350}
      >
        suggested
      </StickyNavItem>
    </AsideNav>
  );
};

export { CategoriesNav };
