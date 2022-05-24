import React from "react";
import AppHeader from "../components/AppHeader/AppHeader";
import loginStyle from "./login.module.css";
import SignIn from "../components/SignIn/signIn";

function Login() {
  return (
    <section className={loginStyle.page}>
      <AppHeader />
      <main className={loginStyle.content}>
        <SignIn />
      </main>
    </section>
  );
}

export default Login;
