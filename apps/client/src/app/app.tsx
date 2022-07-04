import { Outlet } from 'react-router-dom';
import { Header } from '@client/components';

export const App = () => {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
