import type { AppProps } from "next/app";
import "../styles/globals.css";
import SiteFooter from "../components/SiteFooter";
export default function MyApp({ Component, pageProps }: AppProps) {
  return (<div className="min-h-screen flex flex-col"><main className="flex-1"><Component {...pageProps} /></main><SiteFooter /></div>);
}
