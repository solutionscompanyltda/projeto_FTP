import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}
