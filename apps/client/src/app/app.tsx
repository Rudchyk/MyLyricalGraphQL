import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
};

export default App;
