import { useEffect, useState } from 'react';

const List_event = () => {
  const [donnees, setDonnees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchingData = async () => {
    try {
      const res = await fetch('http://localhost/vite-project/src/php/api.php');
      const data = await res.json();

      if (data.success) {
        setDonnees(data.results);
        setLoading(false);
      } else {
        setError('Données non valides');
        setLoading(false);
      }
    } catch (err) {
      console.error('Erreur fetch:', err);
      setError('Erreur lors de la récupération');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  if (loading) return <div className="text-center py-10 text-blue-600">Chargement en cours...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Erreur: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Données de la base de données</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {donnees.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-1">{item.introduction}</p>
            <p className="text-gray-700 text-sm mb-2">{item.content}</p>
            <p className="text-sm text-gray-500">Publié le : {item.created_at}</p>
            <p className="text-xs text-gray-400 italic">Slug : {item.slug}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List_event;
