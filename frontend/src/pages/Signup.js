import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Button,
    TextField,
    Card,
    CardContent,
    Typography,
    FormControl,
    InputLabel
} from '@mui/material';

function Signup() {
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="md">
            <Box display="flex" flexDirection="column" height="100vh" justifyContent="center" alignItems="center">
                <Card elevation={3}>
                    <CardContent>
                        <Typography component="h1" variant="h5" align="center">
                            Sign Up
                        </Typography>
                        <form style={{ display: 'flex', flexDirection: 'column', width: '100%' }} onSubmit={e => {
                            e.preventDefault();
                            // axios 모듈을 활용한 DB 조회
                            // redux를 활용하여 user 세팅
                        }}>
                            <FormControl variant="outlined" margin="normal" fullWidth>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <TextField
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl variant="outlined" margin="normal" fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <TextField
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl variant="outlined" margin="normal" fullWidth>
                                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                                <TextField
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    label="Confirm Password"
                                    variant="outlined"
                                />
                            </FormControl>
                            <Box display="flex" justifyContent="space-between" marginTop="1rem">
                                <Button variant="outlined" color="primary" style={{ width: '48%' }} onClick={() => {
                                    navigate('/signin');
                                }}>
                                    Sign In
                                </Button>
                                <Button variant="contained" color="primary" type="submit" style={{ width: '48%' }}>
                                    Sign Up
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}

export default Signup;
