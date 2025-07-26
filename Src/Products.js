
import React, { useState } from "react";
export default function Products(){
  const [liste, setListe] = useState([]);
  const add = ()=>{
    const name = prompt("Nom du produit");
    if(name) setListe([...liste, name]);
  };
  return (
    <div>
      <h2>Produits</h2>
      <button onClick={add}>Ajouter produit</button>
      <ul>{liste.map((p,i)=><li key={i}>{p}</li>)}</ul>
    </div>
  );
}
