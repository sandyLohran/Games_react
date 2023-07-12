import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../services/firebase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const auth = getAuth(app);

        setIsLoggingIn(true);
        setLoginError('');

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Usuário autenticado:', user.email);
                window.location.href = '/';
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.error('Erro ao fazer login:', errorMessage);
                setLoginError(errorMessage);
                setIsLoggingIn(false);
            });
    };

    return (
        <div className='pai'>
            <div className='bloco'>
                <Form className='formulario' onSubmit={handleLogin}>
                    <h3 className='text-center mb-5'><strong>Entrar</strong></h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Endereço de Email</Form.Label>
                        <Form.Control type="email" placeholder="Digite seu email" value={email} onChange={handleEmailChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Digite sua senha" value={password} onChange={handlePasswordChange} />
                    </Form.Group>

                    {loginError && <p className="error-message text-danger">Usuário não encontrado</p>}

                    <Form.Group className="d-grid gap-3">
                        <Button variant="primary" type="submit" disabled={isLoggingIn}>
                            {isLoggingIn ? 'Entrando...' : 'Entrar'}
                        </Button>
                        <Button variant="" className="botaoCadastrar">
                            <a className='botaoCadastrar__LINK' href="/cadastrar">Cadastrar</a>
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
};

export default Login;
