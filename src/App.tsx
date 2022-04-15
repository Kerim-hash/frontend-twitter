// @ts-nocheck

import React, { lazy, Suspense } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectData } from './store/ducks/user/selectors';
import { FetchGetMe } from './store/ducks/user/actions';
import NotFound from './pages/NotFound';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material';

import { selectTheme } from './store/ducks/theme/selectors';
const Auth = lazy(() => import("./pages/Auth").then((module) => ({ default: module.default, })));
const Home = lazy(() => import("./pages/Home/Home").then((module) => ({ default: module.default, })));
const Messages = lazy(() => import("./pages/messages").then((module) => ({ default: module.default, })));

function App() {
  const dispatch = useDispatch()
  const user: any = useSelector(selectData)
  let navigate = useNavigate();

  React.useEffect(() => {
    if(user?.data === undefined){
      dispatch(FetchGetMe())
    }
    if (window.location.pathname === '/') navigate("/home");
  }, [user?.data])

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

    const color = useSelector(selectTheme)
    
    const theme = React.useMemo(
      () =>
      createTheme({
        typography: {
          fontFamily: ['Rubik', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
          h2: {
            fontWeight: 800,
            fontSize: 64,
            lineHeight: "80px",
          },
          h4: {
            fontWeight: 800,
            fontSize: 31,
            lineHeight: "40px",
          },
          h5: {
            fontWeight: 700,
            fontSize: 20
          },
          body1: {
            fontWeight: 600,
            fontSize: 16,
          },
          body2: {
            fontWeight: 400,
            fontSize: 14,
            // color: '#536471'
          },
          button: {
            textTransform: "none"
          }
        },
        palette: {
          mode: color.theme,
          ...(color.theme === 'light'
            ? {
              primary: {
                main: 'rgb(29, 161, 242)',
                dark: 'rgb(26, 145, 218)',
                contrastText: '#fff',
              },
              secondary: {
                main: '#f7f9f9',
                dark: '#fff',
                light: '#EFF3F4',
              },
              icon: {
                main: '#0F1419'
              },
              action: {
                main: '#fff',
                dark: '#f7f9f9',
              },
              background: {
                default: '#fff',
              },
              text: {
                primary: '#1d9bfo',
                secondary: '#000',
                grey:{
                  light: '#474B4E',
                  main: '#3f50b5',
                  dark: '#74828C',
                  contrastText: '#fff',
                }
              },
            }
            : {
              secondary: {
                main: '#16181C',
                dark: '#000',
                light: '#202327',
              },
              icon: {
                main: '#E7E9EA'
              },
              text: {
                primary: '#fff',
                secondary: '#fff',
                lightBlue: 'rgb(29, 161, 242)',
                grey:  {
                  light: '#71767B',
                  main: '#3f50b5',
                  dark: '#74828C',
                  contrastText: '#fff',
                }
              },
              background: {
                default: '#121212',
              },
              grey:  {
                light: '#536471',
                dark: '#74828C',
              },
            }),
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                height: 45,
                textTransform: 'none',
                borderRadius: 30,
                fontSize: 16,
                fontWeight: 700,
                "&.MuiButton-contained.MuiButton-containedInherit": {
                  background: '#000',
                  color: '#fff'
                },
                "&.MuiButton-outlined.MuiButton-outlinedSizeSmall": {
                  height: 35,
                },
                "&.MuiButton-contained.MuiButton-sizeSmall": {
                  height: 35,
                }
              },
            },
          },
          MuiDialog: {
            styleOverrides: {
              root: {
              }
            }
          },
      
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                // border: `1px solid rgb(${'#fff'}, / 40%)`,
              }
            }
          },
          MuiDialog: {
            styleOverrides: {
              paper: {
                borderRadius: 20,
                minWidth: 500
              }
            }
          },
          MuiFilledInput: {
            styleOverrides: {
              root: {
                height: 45,
                color: "black",
                textTransform: 'none',
                borderRadius: 50,
                fontSize: 16,
                fontWeight: 700,
              },
      
            },
          }
        },
        overrides: {
          MuiFormControl: {
            root: {
              width: "100%",
              borderRadius: 8,
              "& .MuiOutlinedInput-input": {
                borderRadius: 30,
                boxShadow: "0px 1px 0px #E2E8F0",
              },
            }
          },
          MuiFilledInput: {
            root: {
              border: "1px solid #e2e2e1",
              overflow: "hidden",
              borderRadius: 4,
              backgroundColor: "#fcfcfb",
              "&:hover": {
                backgroundColor: "#fff"
              },
              "&$focused": {
                backgroundColor: "#fff",
              }
            }
          }
        }  
      }),
      
      [color.theme],
   );
   
  if(color.theme === 'dark'){
    document.body.classList.add('App-dark');
  }else {
    document.body.classList.remove('App-dark');
  }
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}><CircularProgress color="primary" /></div>}>
        <div className={color.theme === 'light' ? 'App' : 'App-dark'}>
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
              path="/messages/*"
              element={
                <ProtectedRoute
                  isAllowed={isAuthenticated()}
                  redirectPath="/auth"
                >
                  <Messages />
                </ProtectedRoute>
              }
            />
            {/* <Route
            path="/video/*"
            element={
              <ProtectedRoute
              isAllowed={isAuthenticated()}
              redirectPath="/auth"
              >
              <Video />
              </ProtectedRoute>
            }
          /> */}
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
                <NotFound />
              }
            />
          </Routes>
        </div >
      </Suspense>
    </ThemeProvider>
  );
}

export default App


// @ts-nocheck


