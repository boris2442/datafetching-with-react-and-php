import { useState } from 'react';

const List_event = () => {
  const [donnees, setDonnees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchingData = async () => {
    await fetch('http://localhost/vite-project/src/php/api.php')
      .then(res => res.json()) // on retourne directement la promesse JSON
      .then(data => {
        if (data.success) {
          setDonnees(data.results); 
          setLoading(false);
          
        } else {
          setError('Données non valides');
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Erreur fetch:', err);
        setError('Erreur lors de la récupération');
        setLoading(false);
      });
  }
  fetchingData()
  

  if (loading) return <div className="loading">Chargement en cours...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <div>
      <h2>Données de la base de données</h2>
      <div className="data-container">

        {donnees.map((item) => (

          <div className="data-item" key={item.id}>
            
            <h3>{item.title}</h3>
            <p>{item.introduction}</p>
            <p>{item.content}</p>
            <p>{item.created_at}</p>
            <p>{item.slug}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List_event;