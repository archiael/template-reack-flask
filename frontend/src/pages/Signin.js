import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import {
    Box,
    Button,
    FormControl,
    Typography,
    Container,
    Card,
    CardContent,
    TextField,
    Alert,
    Slide
} from '@mui/material';

function Transition(props){
    return <Slide {...props} direction="down" timeout={2000}/>;
}

function Signin(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const onSubmit = e => {
        e.preventDefault();

        // axios 모듈을 활용한 DB 조회
        axios.get('http://192.168.30.19:5000').then(res =>
            console.log(res)
        ).catch(error => {
            console.log(error);
            setShowAlert(true);
            setTimeout(()=>{
                setShowAlert(false);
            }, 3000)
        })
        // redux를 활용하여 user 세팅
    }

    return(
        <>  
            <Box display="flex" flexDirection="column" height="100vh" justifyContent="center" alignItems="center">
            <Box position="absolute" top="30%" transform="translateY(-50%)">
            <Container component="main" maxWidth="xs">
                <Card elevation={3}>
                    <CardContent>
                        <Typography component="h1" variant="h5" align="center">
                            Sign In
                        </Typography>
                        <form onSubmit={onSubmit}>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    variant="outlined"
                                    id='email'
                                    label='Email'
                                    type='email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    variant="outlined"
                                    id='password'
                                    label='Password'
                                    type='password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </FormControl>
                            <Box display="flex" justifyContent="space-between" marginTop="1rem">
                                <Button variant="contained" color="primary" type='submit' style={{ width: '48%' }}>
                                    Sign In
                                </Button>
                                <Button variant="outlined" color="primary" style={{ width: '48%' }} onClick={() => navigate('/signup')}>
                                    Sign Up
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Container>
                { showAlert && (
                    <Box mt={2}>
                            <Alert severity="error" variant="filled" TransitionComponent={Transition}>Incorrect username or password. Please try again.</Alert>
                    </Box>
                )}
            </Box>
            </Box>
        </>
    )
}

export default Signin