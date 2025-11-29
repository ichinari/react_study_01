import { useContext } from "react";
import { LoadingContext } from "./LoadingContext";

// カスタムフック（useLoadingで簡単にContextを使用できる）
export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}