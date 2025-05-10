import { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({ nom: '', email: '', password: '' });

    const handleChange = (e) => {
  
        
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost/vite-project/src/php/form.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            // Vérifie que la réponse est correcte
            if (!response.ok) {
                throw new Error('Erreur HTTP : ' + response.status);
            }
    // console.log(response);
    
            const result = await response.json(); // Important !
    
            // console.log('Résultat du serveur :', result);
    
            if (result.success) {
                alert('Inscription réussie !');
                console.log(result.results);
                
            } else {
                alert('Erreur : ' + result.message);
            }
    
        } catch (error) {
            console.error('Erreur lors de la soumission :', error);
            alert('Une erreur est survenue. Voir la console.');
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded space-y-4">
            <input type="text" name="nom" placeholder="Nom" onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} className="w-full p-2 border rounded" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">S'inscrire</button>
        </form>
    );
};

export default ContactForm;
