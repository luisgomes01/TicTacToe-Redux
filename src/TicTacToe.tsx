import { useAppDispatch, useAppSelector } from "./store";


export default function TicTacToe() {
   const state = useAppSelector((state) => state.tictactoe);
   const dispatch = useAppDispatch();

    return (
        <div className="TicTacToe">
            {state.winner !== "?" && <>
                {state.winner === "=" && <div>Empatou</div>}
                {state.winner !== "=" && <div>Vencedor: <strong>{state.winner}</strong></div>}
            </>}
            {state.winner === "?" && <div>Aguardando Jogada de {state.nextPlayer}</div>}
            <table>
                <tbody>
                    {state.board.map((row, index) => (
                    <tr key={index}>
                        {row.map((cell, i) =>(
                            <td onClick={() => dispatch({type: "play", payload: {index, i}}) } key={i}>{cell}</td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => dispatch( { type: "reset" } )}>Reiniciar partida</button>
        </div>
    )
}


