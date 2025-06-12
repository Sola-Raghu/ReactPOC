import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login/Login';
import DashboardLayout from './pages/DashboardLayout/DashboardLayout';
import Movies from './components/Movies/Movies';
import NewMeeting from './components/NewMeeting/NewMeeting';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import TodoList from './components/Todo/Todo';
import MovieDetails from './components/MovieDetails/MovieDetails';
import RegistrationFormFormik from './components/Forms/ReactForms';
import RegistrationFormReactHook from './components/Forms/RegistrationForm';
import Files from './components/Files/Files';
import Entry from './components/useReducer/Entry';
import Fetch from './components/ApiCalls/Fetch';
import AxiosDemo from './components/ApiCalls/Axios';
import ReduxShell from './components/Redux/Entry';
import Welcome from './components/Redux/Welcome';
import { Provider } from 'react-redux';
import store from './components/Redux/store';
import productsStore from './components/Products/ProductsSlice';
import Products from './components/Products/Products';
import Accordion from './components/test/Accordion';

function App() {
  const items = [
    {
      title: "JavaScript Basics",
      content: "Learn variables, functions, and loops in JavaScript."
    },
    {
      title: "React.js Overview",
      content: "Understand components, state, and props in React."
    },
    {
      title: "Node.js",
      content: "Basics of server-side development with Node.js."
    },
    {
      title: "Full-Stack Development",
      content: "Build full-stack apps with React and Node.js."
    },
  ];
  return (
    <AuthProvider>
      <Provider store={productsStore}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Navigate to="movies" replace />} />
                <Route path="movies" element={<Outlet />}>
                  <Route index element={<Movies />} />
                  <Route path=":id" element={<MovieDetails />} />
                </Route>
                <Route path="meetings" element={<NewMeeting />} />
                <Route path="todos" element={<TodoList />} />
                <Route path="formikForm" element={<RegistrationFormFormik />} />
                <Route path="reactHookForm" element={<RegistrationFormReactHook />} />
                <Route path="files" element={<Files />} />
                <Route path="useReducer" element={<Entry />} />
                <Route path="fetch" element={<Fetch />} />
                <Route path="axios" element={<AxiosDemo />} />
                <Route path="redux/*" element={
                  <Provider store={store}>
                    <ReduxShell />
                  </Provider>
                }>
                  <Route index element={<Navigate to="welcome" />} />
                  <Route path='welcome' element={<Welcome />} />
                </Route>
                <Route path="products" element={<Products />} />
                <Route path="test" element={<Accordion items={items}/>}/>
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />

          </Routes>
        </Router>
      </Provider>
    </AuthProvider>
  );
}

export default App;