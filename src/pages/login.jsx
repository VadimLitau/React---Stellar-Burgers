import React from "react";
import loginStyle from "./login.module.css";
import SignIn from "../components/SignIn/signIn";

function Login() {
  return (
    <section className={loginStyle.page}>
      <main className={loginStyle.content}>
        <SignIn />
      </main>
    </section>
  );
}

export default Login;
