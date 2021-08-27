// @Project
import Navbar from 'components/Navbar';
import { JsxElement } from 'typescript';

// @Own
import './styles.scss';

interface IProps {
  children: JsxElement | React.ReactNode | React.ReactElement
}

const BaseLayout: React.FC<IProps> = ({ children }) => (
  <div className="base-layout">
    <Navbar />
    <div className="base-layout__body">
      {children}
    </div>
  </div>
)

export default BaseLayout;