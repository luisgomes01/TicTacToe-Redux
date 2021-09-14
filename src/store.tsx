import { Action, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type CellValue = "X" | "O" | ""
export type Winner = "X" | "O" | "?" | "="

export interface TicTacToe {
    nextPlayer: "X" | "O",
    board: CellValue[][],
    winner: Winner
}

export const initialState : TicTacToe = {
    nextPlayer: "X",
    winner: "?",
    board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
}

function getWinner(board:CellValue[][]): Winner {
    const players:("X"| "O")[] = ["X", "O"];
    for (const player of players){
        for (let i = 0; i < 3; i++){
            if(board[i][0] === player && board[i][1] === player && board[i][2] === player){
                return player;
            }
            if(board[0][i] === player && board[1][i] === player && board[2][i] === player){
                return player;
            }
            if(board[0][0] === player && board[1][1] === player && board[2][2] === player){
                return player;
            }
            if(board[0][2] === player && board[1][1] === player && board[2][0] === player){
                return player;
            }
        }
    }
    for (let i = 0; i < 3; i++){
        for (let j = 0; i < 3; j++){
            if(board[i][j] === ""){
                return "?";
            }
        } 
    }
    return "=";   
}

export type ActionPlay = PayloadAction<{index: number, i: number}, "play">;
export type ActionReset = Action<"reset">;
function TicTacToeReducer(state = initialState, action: ActionPlay | ActionReset): TicTacToe {
    switch(action.type){
        case "play":
            const {index, i} = action.payload;
            if (state.board[index][i] === "" && state.winner === "?") {
                const board = state.board.map(row => row.map(cell => cell));
                board[index][i] = state.nextPlayer;
                const winner = getWinner(board);
                return {
                    nextPlayer: state.nextPlayer === "X" ? "O" : "X",
                    winner,
                    board
                }
            } else {
                return state;
            
            };
        case "reset":
            return initialState;
    }

    return state;
}

export const store = configureStore({
    reducer: {
        tictactoe: TicTacToeReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector