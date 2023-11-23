import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9000/user', {
        first_name,
        last_name,
        email,
        password,
      });

      console.log('Inscription réussie!', response.data);

    } catch (error) {
      console.error('Erreur lors de l\'inscription', error);
    }
  };

  return (
    <div className="container">
      <h1>Créer un compte</h1>
      <form onSubmit={handleSignUp}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">Prénom</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            value={first_name}
            onChange={(e) => setfirst_name(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">Nom de famille</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            value={last_name}
            onChange={(e) => setlast_name(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Adresse e-mail</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUp;
