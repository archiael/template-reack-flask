import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';

import Sidebar from '../layout/Sidebar';
import MenuContent from './MenuContent';
import { useNavigate } from 'react-router-dom';

function TopMenuBar({menu}){
    const topMenu = menu.filter(item => item.menu_type === 'P')
    const navigate = useNavigate();
    return (
        <AppBar position="static" style={{ boxShadow: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
            <Toolbar style={{ display: 'flex', alignItems: 'center' }}>

                {/* 로고 부분 */}
                {/* <IconButton edge="start" color="inherit" aria-label="logo"> */}
                    {/* <LogoIcon fontSize="large" /> */}
                {/* </IconButton> */}

                <Typography variant="h6" style={{ marginRight: '16px',
                //  color: '#3EB489' 
                 }} onClick={()=>{
                     navigate('/')
                 }}>
                    NCMS
                </Typography>

                {/* 메뉴 항목들 */}
                <div style={{ flexGrow: 1 }}></div>  {/* 여백을 주기 위해 사용 */}
                { topMenu.map((item, index) => (
                    <Button key={index} color='inherit'>{item.menu_name}</Button>
                ))}
            </Toolbar>
        </AppBar>
    );
}


function Main() {
    const [menu, setMenu] = useState([]);
    useEffect(()=>{
        // Component 생성 될 때
        console.log('MainComponent')
        axios.get('http://192.168.30.19:5000/menu')
            .then( res =>{
                const { data } = res
                console.log(data)
                const topMenu = menu.filter(item => item.menu_type === 'P')
                console.log('topMenu: ', topMenu)
                setMenu(data)
            }).catch(err=>{
                
            })

        return()=>{
        // Component 사라 질 때
            // console.log('b')
            // setMenu([])
            // console.log(menu)
        }
    },[])



    const [selectedMenu, setSelectedMenu] = useState('메인')
    const handleMenuSelect = menu =>{
        setSelectedMenu(menu);
        console.log(menu)
    }
    return(
        <>
            {/* <h1>Main</h1> */}
            <div style={{display:'column'}}>
                <div>
                    <TopMenuBar menu={menu}/>
                </div>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{width: '250px'}}>
                        <Sidebar menu={menu} handleMenuSelect={handleMenuSelect} />
                    </div>
                    <MenuContent selectedMenu={selectedMenu} handleMenuSelect={handleMenuSelect}/>
                </div>
            </div>
        </>
    )
}

export default Main