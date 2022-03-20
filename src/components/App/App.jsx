import React from "react";
import mainStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";

function App() {
  return (
    <>
      <section className={mainStyle.page}>
        <AppHeader />
      </section>
    </>
  );
}

export default App;
