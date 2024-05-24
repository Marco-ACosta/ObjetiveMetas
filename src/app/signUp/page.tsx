"use client";

import React, { useState } from "react";
import signUp from "../../services/firebase/auth/signUp";
import { useRouter } from "next/navigation";

export default function cadastroPagina() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error] = useState<string | null>(null);
  const router = useRouter();

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/signIn");
  };

  return (
    <div>
      <section>
        <h1>Página de Cadastro</h1>
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
            Cadastrar
          </button>
        </form>
      </section>
    </div>
  );
}
