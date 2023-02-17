const reducer = (state,action)=>{
    const {type,payload} = action;
    if(type === "login"){
        state.user = payload;
        state.userLogin ="in";
        return state;
    }
    else if(type === 'logout'){
        state.user = null;
        state.userLogin = "out";
        return state;
    }
    else if(type === 'loading'){
        state.userLogin = 'loading';
        return state;
    }
    else if(type === "refreshUser"){
        state.user = payload;
        return state;
    }else{
        return state;
    }
    
}
export default reducer;