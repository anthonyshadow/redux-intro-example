console.clear();

//people dropping off a form(Actions)

const createPolicy = (name, amount) => {
  return {
    // An Action/form
    type: "CREATE_POLICY",
    payload: {
      name: name,
      amount: amount
    }
  };
};

const deletePolicy = (name) => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name
    }
  };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  };
};

// Reducers (departments)

const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === "CREATE_CLAIM") {
    //we care about the action
    return [...oldListOfClaims, action.payload];
  } else {
    // dont care about the action
    return oldListOfClaims;
  }
};

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === "CREATE_CLAIM") {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === "CREATE_POLICY") {
    return bagOfMoney + action.payload.amount;
  } else {
    return bagOfMoney;
  }
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === "DELETE_POLICY") {
    return listOfPolicies.filter((name) => name !== action.payload.name);
  } else {
    return listOfPolicies;
  }
};

const { createStore, combineReducers } = Redux;

//creating store/different departments for Redux

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(ourDepartments);

//Modifying information within our Redux State

store.dispatch(createPolicy("Alex", 20));
store.dispatch(createPolicy("Jim", 40));
store.dispatch(createPolicy("Bob", 20));

store.dispatch(createClaim("Alex", 150));
store.dispatch(createClaim("Jim", 50));

store.dispatch(deletePolicy("Bob"));

//displaying the current state

console.log(store.getState());
