import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../services/firebase';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const auth = getAuth(app);

    setIsSigningUp(true);
    setSignupError('');

    if (password !== confirmPassword) {
      setSignupError('As senhas não coincidem');
      setIsSigningUp(false);
      return;
    }

    if (password.length < 6 || confirmPassword.length < 6) {
      setSignupError('A senha deve ter pelo menos 6 caracteres');
      setIsSigningUp(false);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário cadastrado:', user.email);
        window.location.href = '/';
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setSignupError('O email fornecido já está em uso');
        } else if (error.code === 'auth/weak-password') {
          setSignupError('Senha deve ter pelo menos 6 caracteres');
        } else {
          setSignupError('Erro ao cadastrar usuário');
        }
        setIsSigningUp(false);
      });
  };

  return (
    <div className="pai">
      <div className="bloco">
        <Form className="formulario" onSubmit={handleSignup}>
          <h3 className="text-center mb-5">
            <strong>Cadastrar</strong>
          </h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Endereço de Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirmar Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </Form.Group>

          {signupError && <p className="error-message text-danger">{signupError}</p>}

          <Form.Group className="d-grid gap-3">
            <Button variant="primary" type="submit" disabled={isSigningUp}>
              {isSigningUp ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
            <Button variant="" className="botaoCadastrar">
              <a className="botaoCadastrar__LINK" href="/login">
                Já tenho uma conta
              </a>
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Cadastro;
