Simple Example of Redux

//actions
const newBooking = (name, amount)=>{
    return{
        type : "NEW_BOOKING",
        payload:{
            name,
            amount,
        }
    }
}

const cancelBooking = (name, refAmount)=>{
    return{
        type : "CANCEL_BOOKING",
        payload:{
            name,
            refAmount,
        }
    }
}


//Reducers
const reservationHistory = (reservationList=[],action)=>{
   if(action.type==="NEW_BOOKING"){
           return [...reservationList,action.payload]
   }else if(action.type==="CANCEL_BOOKING"){
          return reservationList.filter(data=>{
            return data.name!==action.payload.name;
          })
   }
   return reservationList;
}


const cancelHistory = (cancelreservationList=[],action)=>{
   if(action.type==="CANCEL_BOOKING"){
           return [...cancelreservationList,action.payload]
    }
    return cancelreservationList;
 }

const accounting = (initialMon=100,action)=>{
    if(action.type==="NEW_BOOKING"){
        return initialMon + action.payload.amount;
}else if(action.type==="CANCEL_BOOKING"){
       return initialMon - action.payload.refAmount;
}
return initialMon;
}


//Store

const {createStore, combineReducers} = Redux;

const railwayCentralStore  =  combineReducers({
    accounting:accounting,
    cancelHistory:cancelHistory,
    reservationHistory:reservationHistory
})

const store = createStore(railwayCentralStore);

const action = newBooking("tariq",20);
store.dispatch(action);
console.log(store.getState());

