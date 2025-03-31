import { PlanNavContextProvider } from './context';
import { NavBody } from './NavBody';

const Nav = () => (
  <PlanNavContextProvider>
    <NavBody />
  </PlanNavContextProvider>
);

export { Nav };
