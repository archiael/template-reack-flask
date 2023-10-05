import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Main from '../pages/Main';
// import FullFeaturedCrudGrid  from '../pages/FullFeaturedCrudGrid';
function AppRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/main' element={<Main/>}/>
            {/* <Route path='/grid' element={<FullFeaturedCrudGrid/>}/> */}
            {/* </Route> */}
        </Routes>

    )
}

export default AppRoutes