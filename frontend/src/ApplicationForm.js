import React, { useState } from 'react';


const ApplicationForm = ({ job, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: job.id,
    name: '',
    email: '',
    phone: '',
    message: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Appel de la fonction de soumission avec les données du formulaire.
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nom</label>
          <input type="text" name="name" id="name" className="form-control" onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" name="email" id="email" className="form-control" onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Téléphone</label>
          <input type="text" name="phone" id="phone" className="form-control" onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea name="message" id="message" className="form-control" onChange={handleInputChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Envoyer la candidature</button>
      </form>
    </div>
  );
};

export default ApplicationForm;
