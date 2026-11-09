import { createContext, useState } from 'react';
import type { ReactNode, FC } from 'react';

interface TransitionContextProps {
  completed: boolean;
  toggleCompleted: (value: boolean) => void;
}

export const TransitionContext = createContext<TransitionContextProps>({
  completed: false,
  toggleCompleted: () => {},
});

interface TransitionProviderProps {
  children: ReactNode;
}

export const TransitionProvider: FC<TransitionProviderProps> = ({
  children,
}) => {
  const [completed, setCompleted] = useState(false);

  const toggleCompleted = (value: boolean) => {
    setCompleted(value);
  };

  return (
    <TransitionContext.Provider value={{ completed, toggleCompleted }}>
      {children}
    </TransitionContext.Provider>
  );
};
