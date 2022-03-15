import React, {useContext,createContext,useReducer} from "react";

export const  AuthContext=createContext();

export const AuthProvider=({reducer,initialState,children})=>(
    <AuthContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </AuthContext.Provider>
)

export const useAuth=()=> useContext(AuthContext)




// function AuthProvider(props){
//     const [state,dispatch]=useReducer(authReducer,{user:null} )

//     const login=(userData)=>{
//         dispatch({

//         })
//     }
// }

// export default 