import type { AppProps } from "next/app";
import "../assets/css/style.css";
import "../assets/css/global.css";
import "../assets/css/vendaLocacao.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
