"use client";

import { useState, FormEvent } from "react";
import { FirebaseError } from "firebase/app";
import signIn from "../../services/firebase/auth/signIn";
import { useRouter } from "next/navigation";

export default function loginPagina() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState<string | null>(null);
  const router = useRouter();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { result, error } = await signIn(email, password);

      if (error) {
        const firebaseError = error as FirebaseError;
        if (firebaseError.message) {
          console.log(firebaseError.message);
          throw new Error(firebaseError.message);
        } else {
          console.log("Unknown Error:", firebaseError);
          throw new Error("Unknown Error");
        }
      }

      console.log(result);
      return router.push("/");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div>
      <section>
        <h1>Página de Login</h1>
        <form onSubmit={handleForm} className="form">
        {error && <p className="error">{error}</p>}
          <label htmlFor="email" className="block">
            <p className="label">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              className="input"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password" className="block">
            <p className="label">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              className="input"
              placeholder="password"
            />
          </label>
          <button
            type="submit"
            className="button"
          >
            Entrar
          </button>
          <button
            type="button"
            className="button"
            onClick={() => router.push("/signUp")}
          >
            Ir para Cadastro
          </button>
        </form>
      </section>
    </div>
  );
}