import { Route, Routes } from 'react-router-dom';
import Home from './Views/Home';
import CreatePoll from './Views/CreatePoll';

export const routes = {
  home: '/Home',
  createPoll: '/CreatePolls',
};

const Router = () => (
  <Routes>
    <Route exact path='/' element={<Home />} />
    <Route path={routes.home} element={<Home />} />
    <Route path={routes.createPoll} element={<CreatePoll />} />
  </Routes>
);

export default Router;