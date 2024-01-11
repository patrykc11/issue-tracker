import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import MainView from './views/MainView/MainView';
import IssuesView from './views/IssuesView/IssuesView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <MainView /> },
      { path: '/issues', element: <IssuesView /> },
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
