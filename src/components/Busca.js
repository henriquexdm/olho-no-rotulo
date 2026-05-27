import React, { useState } from 'react';
import axios from 'axios';
import './Busca.css';

function Busca({ usuarioId, nomeUsuario }) {
  const [termo, setTermo] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const executarBusca = async (e) => {
    e.preventDefault();
    if (!termo.trim()) return;

    setCarregando(true);
    try {
      const resposta = await axios.get('http://olhonorotulo.infinityfreeapp.com/api/produtos.php', {
        params: { termo: termo, usuarioId: usuarioId }
      });
      setProdutos(resposta.data);
    } catch (error) {
      console.error("Erro na busca:", error);
      alert("Erro ao conectar com o servidor PHP do InfinityFree.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container-busca">
      <header className="busca-header">
        <h2>Olá, {nomeUsuario}! Olho no Rótulo 🔍</h2>
        <p>Busque produtos para avaliar riscos de alergia.</p>
      </header>

      <form onSubmit={executarBusca} className="busca-form">
        <input 
          type="text" 
          placeholder="Ex: Chocolate, Biscoito, Cereal..." 
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
        />
        <button type="submit">Buscar Alimentos</button>
      </form>

      {carregando && <p className="aviso-carregando">Consultando banco de dados e Open Food Facts...</p>}

      <div className="grid-produtos">
        {produtos.map(prod => (
          <div 
            key={prod.id} 
            className={`card-produto ${prod.contemMeuAlergeno ? 'perigo' : 'seguro'}`}
          >
            {prod.contemMeuAlergeno && <span className="badge-alerta">⚠️ CONTÉM ALÉRGENO</span>}
            
            <img 
              src={prod.imagem || 'https://via.placeholder.com/150'} 
              alt={prod.nome} 
              className="produto-foto"
            />
            
            <h3 className="produto-nome">{prod.nome}</h3>

            {prod.contemMeuAlergeno ? (
              <div className="status-alerta">
                <strong>Cuidado!</strong> Contém ingrediente associado à sua alergia: 
                <span className="ingredientes-perigosos"> {prod.alergicosPresentes.join(', ')}</span>
              </div>
            ) : (
              <div className="status-seguro">
                ✓ Seguro para suas alergias configuradas
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Busca;
