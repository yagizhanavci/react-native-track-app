import React, { useReducer } from "react";

export default (reducer: any, actions: any, defaultValue: any) => {
  const Context = React.createContext<any>({});

  const Provider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions: any = {};
    for (let action in actions) {
      boundActions[action] = actions[action](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  return { Provider, Context };
};
