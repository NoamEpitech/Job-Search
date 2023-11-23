import React, { useState, useEffect } from 'react';
import ApplicationForm from './ApplicationForm';
import axios from 'axios'; 

const JobAd = ({ job }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isCheked, setIsChecked] = useState(false);

  function AppForm() {
    setIsChecked(!isCheked);
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="col-md-6 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{job.title}</h5>
          <p className="card-text">{job.description}</p>
          {showDetails && (
            <div>
              <p>Lieu: {job.location ?? 'Non spécifié'}</p>
              <p>Salaire: {job.salary ?? 'Non spécifié'}</p>
            </div>
          )}
          <div className="btn-group">
            <button className="btn btn-primary" onClick={toggleDetails}>
              {showDetails ? 'Masquer les détails' : 'En savoir plus'}
            </button>
            <button className="btn btn-success" onClick={AppForm} style={{ marginLeft: '5px' }}>
              Postuler
            </button>
          </div>
        </div>
        {isCheked && <ApplicationForm job={job} onSubmit={console.log} />}
      </div>
    </div>
  );
};

const JobAdList = () => {
  const [jobAds, setJobAds] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/job')
      .then((response) => {
        setJobAds(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Offres d'emploi</h1>
      <div className="row">
        {jobAds.map((job, index) => (
          <JobAd key={index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobAdList;
