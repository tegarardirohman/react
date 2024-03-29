import { useState } from 'react'

function Square({ value, onSquareClick }){

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({xIsNext, squares, onPlay}) {


  function handleClick(i){ 
    // kalo udah diisi yaudah
    if(squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    
    nextSquares[i] = xIsNext? 'X' : 'O';

    onPlay(nextSquares);

  }

  const winner = calculateWinner(squares);
  let status = '';

  if (winner){
    status = 'Winner: ' + winner;
  }else{
    status = 'Next Player: ' + (xIsNext? 'X' : 'O');
  }
  console.log(status);

  return (
    <div className="board">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>

    </div>
  )
}


export default function Game(){
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquare = history[history.length - 1];

  function handlePlay(nextSquares){
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  const moves = 

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol> {/* todo */ }</ol>
      </div>
    </div>
  )
}


function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for(let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];

    if(squares[a] === squares[b] && squares[b] === squares[c]){
      return squares[a];        
    }
  }

  return false;
}
