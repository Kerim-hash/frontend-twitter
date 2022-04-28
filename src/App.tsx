// @ts-nocheck
import React, { lazy, Suspense } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import NotFound from './pages/NotFound';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material';
import Layout from './layout';
import { FullTweet } from './pages/Home/components/FullTweet';
import { isAuthenticated } from './utils/isAuthenticated';
import { useSelector } from 'react-redux';
import { selectTheme } from './store/ducks/theme/selectors'
import Index from './pages/Home/components/Index/';
const Profile = lazy(() => import("./pages/Profile").then((module) => ({ default: module.default, })));
const Bookmarks = lazy(() => import("./pages/Bookmarks").then((module) => ({ default: module.default, })));
const Auth = lazy(() => import("./pages/Auth").then((module) => ({ default: module.default, })));
const Messages = lazy(() => import("./pages/messages").then((module) => ({ default: module.default, })));
const Notifications = lazy(() => import("./pages/Notification").then((module) => ({ default: module.default, })));

function App() {
  let navigate = useNavigate();

  React.useEffect(() => {
    if (window.location.pathname === '/') navigate("/home");
  }, [])
  // private route
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
  // theme
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
            "@media (max-width: 1020px)": {
              fontSize: 48,
            },
            "@media (max-width: 600px)": {
              fontSize: 32,
            },
          },
          h4: {
            fontWeight: 800,
            fontSize: 31,
            lineHeight: "40px",
            "@media (max-width: 600px)": {
              fontSize: 22,
              fontWeight: 500,
            },
          },
          h5: {
            fontWeight: 700,
            fontSize: 20
          },
          body2: {
            fontWeight: 400,
            fontSize: 14,
            // color: '#536471'
          },
          body1: {
            fontWeight: 600,
            fontSize: 16,
            "@media (max-width: 600px)": {
              fontSize: 14,
              fontWeight: 700
            },
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
              },
              tonalOffset: 'rgba(0,0,0, 0.03)',
              secondary: {
                main: '#f7f9f9',
                dark: '#fff',
                light: '#EFF3F4',
              },
              icon: {
                main: '#0F1419'
              },
              textarea: {
                main: '#fff'
              },
              background: {
                default: '#fff',
              },
              text: {
                primary: '#1d9bfo',
                secondary: '#000',
                grey: {
                  light: '#474B4E',
                  main: '#3f50b5',
                  dark: '#74828C',
                  contrastText: '#fff',
                }
              },
            }
            : {
              tonalOffset: '#16181C',
              primary: {
                main: '#359BF0',
                dark: 'rgb(26, 145, 218)',
              },
              secondary: {
                main: '#16181C',
                dark: '#000',
                light: '#202327',
              },
              icon: {
                main: '#E7E9EA'
              },
              textarea: {
                main: '#383838'
              },
              text: {
                primary: '#fff',
                secondary: '#fff',
                lightBlue: 'rgb(29, 161, 242)',
                grey: {
                  light: '#71767B',
                  main: '#3f50b5',
                  dark: '#74828C',
                  contrastText: '#fff',
                }
              },
              background: {
                default: '#121212',
              },
              grey: {
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
                color: '#fff',
                "&.MuiButton-contained.MuiButton-containedInherit": {
                  background: '#000',
                  color: '#fff',
                },
                "&.MuiButton-outlined.MuiButton-outlinedSizeSmall": {
                  height: 35,
                },
                "&.MuiButton-contained.MuiButton-sizeSmall": {
                  height: 35,
                },
                "&.MuiButton-outlined": {
                  color: color.theme === 'dark' ? '#fff' : '#359BF0',
                  // background: '#fff'
                },
                "&.MuiButton-outlined.MuiButton-outlinedInherit": {
                  color: color.theme === 'dark' ? '#fff' : '#000',
                },
                "&.MuiButton-contained.MuiButton-containedInherit": {
                  background:  color.theme === 'dark' ? '#fff' : '#000',
                  color:  color.theme === 'dark' ? '#000' : '#fff',
                }
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                minWidth: '300 !important',
                backgroundColor: color.theme === 'dark' && '#000',
                "&.MuiDialog-paper": {
                  backgroundImage: 'none'
                },
              },
            }
          },
         
          MuiDialog: {
            styleOverrides: {
              paper: {
                borderRadius: 20,
                minWidth: 300
              },
              container: {
                backgroundColor: color.theme ==='dark' && 'rgba(91, 112, 131, 0.4) !important'
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

  if (color.theme === 'dark') {
    document.body.classList.add('App-dark');
  } else {
    document.body.classList.remove('App-dark');
  }

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}><CircularProgress color="primary" /></div>}>
        <div className={color.theme === 'light' ? 'App' : 'App-dark'}>
          <Routes>
            <Route path="/home" element={<Layout children={<Index />} />} /> 
            <Route path="/home/tweet/:id" element={<Layout children={<FullTweet />} />} />
            <Route path="/profile/:id/*" element={<Layout children={<Profile />} />} />
            <Route path="/bookmarks/" element={<Layout children={<Bookmarks />} />} />
            <Route path="/messages/*" element={<Layout children={<Messages />} messages />} />
            <Route path="/notifications/" element={<Layout children={<Notifications />}  />} />
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


