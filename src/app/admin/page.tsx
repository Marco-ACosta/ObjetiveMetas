"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "../../context/AuthContext";

export default function adminPagina() {
  const { userAuth, logout } = useAuthContext();
  const router = useRouter();

  userAuth?.uid
  console.log(userAuth);

  if (userAuth == null) {
    router.push("/signIn");
    return null;
  }

  return (
    <>
      {userAuth && (
        <section className="no-meta">
          <h1>
            Email: {userAuth.email}! Você está logado amigo(a)!
          </h1>
          <button
            className="remove-button"
            onClick={() => logout()}
          >
            Sair
          </button>
        </section>
      )}
    </>
  );
}