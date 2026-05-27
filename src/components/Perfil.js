import React, { useState } from 'react';
import './Perfil.css';

function Perfil({ aoSalvarPerfil }) {
  const [nome, setNome] = useState('');
  const [alergiasSelecionadas, setAlergiasSelecionadas] = useState([]);

  const listaAlergias = [
    { id: 'en:peanuts', nome: 'Amendoim' },
    { id: 'en:milk', nome: 'Leite / Lactose' },
    { id: 'en:gluten', nome: 'Glúten' },
    { id: 'en:soybeans', nome: 'Soja' },
    { id: 'en:nuts', nome: 'Nozes / Castanhas' },
    { id: 'en:eggs', nome: 'Ovos' }
  ];

  const alternarAlergia = (id) => {
    if (alergiasSelecionadas.includes(id)) {
      setAlergiasSelecionadas(alergiasSelecionadas.filter(item => item !== id));
    } else {
      setAlergiasSelecionadas([...alergiasSelecionadas, id]);
    }
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    if (!nome.trim()) return alert("Por favor, digite seu nome.");
    
    aoSalvarPerfil({ nome, alergias: alergiasSelecionadas });
  };

  return (
    <div className="container-perfil">
      <h2>Configurar Perfil de Alergias</h2>
      <p>Marque os ingredientes que você <strong>NÃO</strong> pode consumir.</p>
      
      <form onSubmit={enviarFormulario}>
        <div className="campo-grupo">
          <label>Seu Nome:</label>
          <input 
            type="text" 
            placeholder="Digite seu nome..." 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
          />
        </div>

        <div className="lista-checkboxes">
          <label>Suas Alergias:</label>
          {listaAlergias.map(alergia => (
            <div key={alergia.id} className="checkbox-item">
              <input 
                type="checkbox" 
                id={alergia.id} 
                checked={alergiasSelecionadas.includes(alergia.id)}
                onChange={() => alternarAlergia(alergia.id)}
              />
              <label htmlFor={alergia.id}>{alergia.nome}</label>
            </div>
          ))}
        </div>

        <button type="submit" className="btn-salvar">Salvar Perfil e Entrar</button>
      </form>
    </div>
  );
}

export default Perfil;