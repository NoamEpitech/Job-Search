import React from 'react';

const Contact = () => {
    return (
        <div className="container my-5">
            <h1 className="my-4">Contactez-nous</h1>
            <p className="lead">Pour toute question ou demande d'information, n'hésitez pas à nous contacter en utilisant le formulaire ci-dessous :</p>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nom et prénom</label>
                    <input type="text" className="form-control" id="name" name="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Adresse e-mail</label>
                    <input type="email" className="form-control" id="email" name="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Sujet</label>
                    <input type="text" className="form-control" id="subject" name="subject" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" name="message" rows="4" required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="attachment" className="form-label">Joindre un fichier (le cas échéant)</label>
                    <input type="file" className="form-control" id="attachment" name="attachment" />
                </div>
                <button type="submit" className="btn btn-primary">Envoyer</button>
            </form>
        </div>
    );
};

export default Contact;
