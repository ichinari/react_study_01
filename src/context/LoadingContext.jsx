import { createContext, useState, useMemo } from "react";

// Contextの作成（外部からは直接使用しない）
const LoadingContext = createContext();

// useLoadingフックからアクセスするためにexport
export { LoadingContext };

// Providerコンポーネント
export default function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  // valueをメモ化して不要な再レンダリングを防ぐ
  const value = useMemo(() => ({ isLoading, setIsLoading }), [isLoading]);

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}
