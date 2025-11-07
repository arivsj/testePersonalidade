import React, { createContext, useContext, useReducer } from 'react';

// Definindo os tipos
interface QuestionResponse {
  questionId: number;
  score: number; // 1 a 5
}

interface MBTIState {
  responses: {[key: number]: number};
  currentCategoryIndex: number;
  currentIndex: number;
}

type MBTIAction =
  | { type: 'ANSWER_QUESTION'; questionId: number; score: number }
  | { type: 'SET_CURRENT_QUESTION'; categoryIndex: number; questionIndex: number }
  | { type: 'RESET_TEST' };

// Estado inicial
const initialState: MBTIState = {
  responses: {},
  currentCategoryIndex: 0,
  currentIndex: 0,
};

// Criando o contexto
const MBTIContext = createContext<{
  state: MBTIState;
  dispatch: React.Dispatch<MBTIAction>;
} | undefined>(undefined);

// Reducer para gerenciar o estado
const mbtiReducer = (state: MBTIState, action: MBTIAction): MBTIState => {
  switch (action.type) {
    case 'ANSWER_QUESTION':
      return {
        ...state,
        responses: {
          ...state.responses,
          [action.questionId]: action.score
        }
      };
    case 'SET_CURRENT_QUESTION':
      return {
        ...state,
        currentCategoryIndex: action.categoryIndex,
        currentIndex: action.questionIndex
      };
    case 'RESET_TEST':
      return initialState;
    default:
      return state;
  }
};

// Componente provedor
export const MBTIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(mbtiReducer, initialState);

  return (
    <MBTIContext.Provider value={{ state, dispatch }}>
      {children}
    </MBTIContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useMBTI = () => {
  const context = useContext(MBTIContext);
  if (!context) {
    throw new Error('useMBTI must be used within an MBTIProvider');
  }
  return context;
};