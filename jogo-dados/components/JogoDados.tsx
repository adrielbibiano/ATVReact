// components/JogoDados.tsx
"use client";
import { useState, useEffect } from 'react';
import Dado from './Dado';

type Placar = { j1: number; j2: number };

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [dadosJ1, setDadosJ1] = useState([0, 0]);
  const [dadosJ2, setDadosJ2] = useState([0, 0]);
  const [turno, setTurno] = useState<'J1' | 'J2'>('J1');
  const [vitorias, setVitorias] = useState<Placar>({ j1: 0, j2: 0 });
  const [mensagemRodada, setMensagemRodada] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const rolarDados = () => [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];

  const jogarJ1 = () => {
    setDadosJ1(rolarDados());
    setTurno('J2');
    setMensagemRodada("Vez do Jogador 2...");
  };

  const jogarJ2 = () => {
    const novosDadosJ2 = rolarDados();
    setDadosJ2(novosDadosJ2);
    processarRodada(novosDadosJ2);
  };

  const processarRodada = (dJ2: number[]) => {
    const somaJ1 = dadosJ1[0] + dadosJ1[1];
    const somaJ2 = dJ2[0] + dJ2[1];

    let resultado = "";
    if (somaJ1 > somaJ2) {
      setVitorias(prev => ({ ...prev, j1: prev.j1 + 1 }));
      resultado = "Jogador 1 venceu a rodada!";
    } else if (somaJ2 > somaJ1) {
      setVitorias(prev => ({ ...prev, j2: prev.j2 + 1 }));
      resultado = "Jogador 2 venceu a rodada!";
    } else {
      resultado = "Empate nesta rodada!";
    }

    setMensagemRodada(resultado);

    if (rodada < 5) {
      setTimeout(() => {
        setRodada(prev => prev + 1);
        setTurno('J1');
        setDadosJ1([0, 0]);
        setDadosJ2([0, 0]);
        setMensagemRodada(`Rodada ${rodada + 1}: Comece Jogador 1`);
      }, 2000);
    } else {
      setGameOver(true);
    }
  };

  const reiniciar = () => {
    setRodada(1);
    setDadosJ1([0, 0]);
    setDadosJ2([0, 0]);
    setTurno('J1');
    setVitorias({ j1: 0, j2: 0 });
    setMensagemRodada("");
    setGameOver(false);
  };

  const determinarVencedorFinal = () => {
    if (vitorias.j1 > vitorias.j2) return "🎉 Jogador 1 é o Campeão!";
    if (vitorias.j2 > vitorias.j1) return "🎉 Jogador 2 é o Campeão!";
    return "🤝 O jogo terminou em Empate Geral!";
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Jogo de Dados</h1>
      <h2 className="text-2xl mb-6">Rodada: <span className="text-blue-600">{rodada}/5</span></h2>

      <div className="grid grid-cols-2 gap-10 mb-8">
        {/* Jogador 1 */}
        <div className={`p-6 rounded-lg shadow-lg ${turno === 'J1' ? 'bg-blue-50 border-2 border-blue-400' : 'bg-white'}`}>
          <h3 className="text-xl font-semibold mb-4 text-center">Jogador 1 ({vitorias.j1})</h3>
          <div className="flex gap-2">
            <Dado valor={dadosJ1[0]} />
            <Dado valor={dadosJ1[1]} />
          </div>
          <button 
            disabled={turno !== 'J1' || gameOver}
            onClick={jogarJ1}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded disabled:bg-gray-300 transition"
          >
            Jogar Dados
          </button>
        </div>

        {/* Jogador 2 */}
        <div className={`p-6 rounded-lg shadow-lg ${turno === 'J2' ? 'bg-green-50 border-2 border-green-400' : 'bg-white'}`}>
          <h3 className="text-xl font-semibold mb-4 text-center">Jogador 2 ({vitorias.j2})</h3>
          <div className="flex gap-2">
            <Dado valor={dadosJ2[0]} />
            <Dado valor={dadosJ2[1]} />
          </div>
          <button 
            disabled={turno !== 'J2' || gameOver}
            onClick={jogarJ2}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded disabled:bg-gray-300 transition"
          >
            Jogar Dados
          </button>
        </div>
      </div>

      <div className="text-xl font-medium h-8 mb-8 text-gray-700">
        {mensagemRodada}
      </div>

      {gameOver && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-10 rounded-2xl text-center shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">{determinarVencedorFinal()}</h2>
            <p className="mb-6">Placar final: {vitorias.j1} vs {vitorias.j2}</p>
            <button 
              onClick={reiniciar}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition"
            >
              Jogar Novamente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}