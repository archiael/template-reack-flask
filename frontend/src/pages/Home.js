import React from 'react'
import { useNavigate } from 'react-router-dom'
function Home(){
    const navigate = useNavigate();
    return(
        <>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>

                <h1>Home</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>

                <button onClick={()=>{
                    navigate('/signin')
                    console.log('signin')
                }}>로그인</button>
                <button onClick={() => {
                    navigate('/signup')
                    console.log('signup')
                }}>회원가입</button>
                <button onClick={() => {
                    navigate('/main')
                    console.log('main')
                }}>메인</button>
            </div>
        </>
    )
}

export default Home