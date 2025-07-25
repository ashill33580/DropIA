import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [images, setImages] = useState([]);
  const [dsa, setDsa] = useState(null);

  const generateImages = () => {
    return Array.from({ length: 3 }, (_, i) => `https://picsum.photos/400?random=${Math.floor(Math.random() * 1000) + i}`);
  };

  const simulateDSA = () => {
    return {
      ctr: (Math.random() * 3 + 2).toFixed(2) + '%',
      conversions: Math.floor(Math.random() * 150 + 50),
      budget: (Math.random() * 30 + 10).toFixed(2) + '€'
    };
  };

  const generateProduct = () => {
    setImages(generateImages());
    setDsa(simulateDSA());
  };

  const exportData = () => {
    const data = {
      keyword,
      images,
      dsa
    };
    console.log('FICHE PRODUIT DROP-IA ⬇️');
    console.log(JSON.stringify(data, null, 2));
    alert('Fiche exportée dans la console !');
  };

  return (
    <div className="container">
      <h1>DropIA 💡</h1>
      <input
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Entrez un mot-clé produit"
      />
      <button onClick={generateProduct}>Générer fiche IA</button>

      {images.length > 0 && (
        <>
          <h2>Images IA générées</h2>
          <div className="images">
            {images.map((img, i) => (
              <img key={i} src={img} alt={`dropia-${i}`} />
            ))}
          </div>
        </>
      )}

      {dsa && (
        <div className="stats">
          <h2>Simulateur DSA 📊</h2>
          <p><strong>CTR :</strong> {dsa.ctr}</p>
          <p><strong>Conversions :</strong> {dsa.conversions}</p>
          <p><strong>Budget :</strong> {dsa.budget}</p>
        </div>
      )}

      <button onClick={exportData}>📋 Exporter fiche</button>
    </div>
  );
                        }
