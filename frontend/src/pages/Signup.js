import React from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <h1 style={{ justifyContent: 'center'}}>Sign Up</h1>
            </div>
            <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
            <form style={{display:'flex', flexDirection:'column'}} onSubmit={e=>{
                e.preventDefault();
                // axios 모듈을 활용한 DB 조회
                // redux를 활용하여 user 세팅
            }}>
                <label htmlFor='email'>Email</label>
                <input id='email' name='email' type='email'/>
                <label htmlFor='password'>Password</label>
                <input id='password' name='password' type='password'/>
                <br/>
                <div style={{display:'flex', alignItems:'center'}}>
                    <button style={{width:'50%'}} onClick={()=>{
                        navigate('/signin');
                    }}>Sign In</button>
                    <button style={{width:'50%'}} onClick={()=>{
                        
                    }}>Sign Up</button>  
                </div>
            </form>
            </div>
        </>
    )
}

export default Signup