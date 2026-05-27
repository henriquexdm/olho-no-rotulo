import React, { useState } from 'react';
import axios from 'axios';
import Perfil from './components/Perfil';
import Busca from './components/Busca';

function App() {
  const [usuario, setUsuario] = useState(null);

  const tratarCriacaoPerfil = async (dadosPerfil) => {
    try {
      const resposta = await axios.post('http://localhost/aaaaaaaaaaaaaaaaaaaa/usuarios.php', dadosPerfil);
      
      setUsuario(resposta.data); 
    } catch (error) {
      console.error("Erro ao salvar perfil no banco:", error);
      alert("Não foi possível salvar o perfil. O servidor Java está rodando?");
    }
  };

  return (
    <div>
      {!usuario ? (
        <Perfil aoSalvarPerfil={tratarCriacaoPerfil} />
      ) : (
        <Busca usuarioId={usuario.id} nomeUsuario={usuario.nome} />
      )}
    </div>
  );
}

export default App;