import React, {lazy, Suspense} from 'react';

import { Auth } from './pages/Auth';
import Home from './pages/Home/Home';
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectData } from './store/ducks/user/selectors';
import { FetchGetMe } from './store/ducks/user/actions';
function App() {
   const dispatch = useDispatch()
    const user: any = useSelector(selectData)

    React.useEffect(() => {
      dispatch(FetchGetMe())
    }, [])

   const isAuthenticated = () => {
    try {
      if (user.data !== null) {
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  

  const ProtectedRoute = ({
    isAllowed,
    redirectPath = '/auth',
    children,
  }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} />;
    }
    return children
  };

  

  return (
    <Suspense fallback={<div>Loading....</div>}>
    <div className="App">
      <Routes>
        <Route
          path="/home/*"
          element={
            <ProtectedRoute
              isAllowed={isAuthenticated()}
              redirectPath="/auth"
            >
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <ProtectedRoute
              isAllowed={!isAuthenticated()}
              redirectPath="/home/"
            >
              <Auth />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
      
    </div >
   
    </Suspense>
  );
}

export default App
