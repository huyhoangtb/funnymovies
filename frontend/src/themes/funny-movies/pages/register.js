import PAGE_CODES from 'themes/register/PageCodes'
import Loadable from "react-loadable";
import Loading from "components/common/viewers/loading";

const Home = Loadable({
  loader: () => import('./home'),
  loading: Loading,
});

export default {
  [PAGE_CODES.HOME]: Home,
}
