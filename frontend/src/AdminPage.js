import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [newJob, setNewJob] = useState({ title: '', description: '', salary: '', location: '', company_id: 1 });
  const [newUser, setNewUser] = useState({ first_name: '', last_name: '', email: '', password: '', isAdmin: 0 });

  useEffect(() => {
    axios.get('http://localhost:9000/job')
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des offres d\'emploi', error);
      });

    axios.get('http://localhost:9000/user')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des utilisateurs', error);
      });
  }, []);

  const handleAddJob = () => {
    axios.post('http://localhost:9000/job', newJob)
      .then((response) => {
        setJobs([...jobs, response.data]);
        // Réinitialiser les champs du formulaire
        setNewJob({ title: '', description: '', salary: '', location: '', company_id: 1 });
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout de l\'offre d\'emploi', error);
      });
  };

  const handleAddUser = () => {
    axios.post('http://localhost:9000/user', newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        // Réinitialiser les champs du formulaire
        setNewUser({ first_name: '', last_name: '', email: '', password: '', isAdmin: 0 });
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
      });
  };

  const handleDeleteJob = (id) => {
    axios.delete(`http://localhost:9000/job/${id}`)
      .then(() => {
        setJobs(jobs.filter((job) => job.id !== id));
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de l\'offre d\'emploi', error);
      });
  };

  const handleDeleteUser = (id) => {
    axios.delete(`http://localhost:9000/user/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
      });
  };

  return (
    <div className="container">
      <h1>Table d'administration</h1>

      {newUser.isAdmin === 1 ? (
        <>
          <h2>Ajouter un nouvel emploi</h2>
          <div className="form-group">
            <label>Titre</label>
            <input
              type="text"
              className="form-control"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Salaire</label>
            <input
              type="text"
              className="form-control"
              value={newJob.salary}
              onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Lieu</label>
            <input
              type="text"
              className="form-control"
              value={newJob.location}
              onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
            />
          </div>
          <button className="btn btn-success" onClick={handleAddJob}>
            Ajouter
          </button>
        </>
      ) : (
        <p>Vous n'avez pas la permission d'accéder à cette page.</p>
      )}

{newUser.isAdmin === 1 ? (
        <>

      <h2>Ajouter un nouvel utilisateur</h2>
      <div className="form-group">
        <label>Prénom</label>
        <input
          type="text"
          className="form-control"
          value={newUser.first_name}
          onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Nom de famille</label>
        <input
          type="text"
          className="form-control"
          value={newUser.last_name}
          onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>E-mail</label>
        <input
          type="text"
          className="form-control"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Mot de passe</label>
        <input
          type="password"
          className="form-control"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Admin (1 ou 0)</label>
        <input
          type="text"
          className="form-control"
          value={newUser.isAdmin}
          onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.value })}
        />
      </div>
      <button className="btn btn-success" onClick={handleAddUser}>
        Ajouter
      </button>
      </>
      ) : (
      <p></p>
      )}

{newUser.isAdmin === 1 ? (
        <>

      <h2>Liste des offres d'emploi</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Salaire</th>
            <th>Lieu</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.title}</td>
              <td>{job.description}</td>
              <td>{job.salary}</td>
              <td>{job.location}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteJob(job.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
      ) : (
      <p></p>
      )}

    { newUser.isAdmin === 1 ? (
        <>

      <h2>Liste des utilisateurs</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Prénom</th>
            <th>Nom de famille</th>
            <th>E-mail</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'Oui' : 'Non'}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </>
      ) : (
      <p></p>
      )}
    </div>
    
  );
};


export default AdminPage;
