import React, { ReactChild, ReactChildren } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Sidebar from '../components/Sidebar'
import Aside from '../components/aside'
import { useDispatch, useSelector } from 'react-redux'
import { FetchGetMe } from '../store/ducks/user/actions'
import { selectData } from '../store/ducks/user/selectors'
import { Navigate } from "react-router-dom";
import { isAuthenticated } from '../utils/isAuthenticated'
interface LayoutProps {
    children: ReactChild | ReactChildren;
    messages: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, messages = false }: LayoutProps) => {
    const dispatch = useDispatch()
    const user = useSelector(selectData)

    React.useEffect(() => {
        dispatch(FetchGetMe())
    }, [])

        // if (!user) {
        //     return <Navigate to="/auth" replace />
        // }
    return (
        <section style={{ maxWidth: '1220px', margin: '0 auto' }}>
            <Grid container spacing={1}>
                <Grid item xs={1} md={messages ? 2.5 : 2.29} >
                    <Sidebar user={user} />
                </Grid>
                {!messages && <Grid item xs={9.61} lg={6.31} md={9.61} style={{ padding: "0 20px 0 30px" }}>
                    <Paper variant="outlined">
                        {children}
                    </Paper>
                </Grid>}
                {messages && children}
                {!messages && <Aside user={user} />}
            </Grid>
        </section>
    )
}

export default Layout
