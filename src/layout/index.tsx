import React, { ReactChild, ReactChildren } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import useMediaQuery from '@mui/material/useMediaQuery';
import Sidebar from '../components/Sidebar'
import Aside from '../components/aside'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";
import { FetchGetMe } from '../store/ducks/user/actions'
import { selectData } from '../store/ducks/user/selectors'
import { isAuthenticated } from '../utils/isAuthenticated'

interface LayoutProps {
    children: ReactChild | ReactChildren;
    messages: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, messages = false }: LayoutProps) => {
    const dispatch = useDispatch()
    const user = useSelector(selectData)
    const sm = useMediaQuery('(max-width:600px)');

    React.useEffect(() => {
        dispatch(FetchGetMe())
    }, [dispatch])


    return isAuthenticated() ? (
        <section className="wrapper">
            <Grid container spacing={1} style={{ justifyContent: 'space-between' }}>
                <Grid item md={1} xs={1.50} lg={messages ? 2.5 : 2.29} style={{ padding: `${!sm && "0 0 0 20px"}` }}>
                    <Sidebar user={user} />
                </Grid>
                {!messages && <Grid item lg={6.31} md={7} sm={10.40} xs={10.50} style={{ padding: `${!sm ? "0 20px 0 28px" : "0 0px 0 10px"}` }}>
                    <Paper variant="outlined">
                        {children}
                    </Paper>
                </Grid>}
                {messages && children}
                {!messages && <Aside user={user} />}
            </Grid>
        </section>) : (
        <Navigate to="/auth" replace />
    )
}

export default Layout
