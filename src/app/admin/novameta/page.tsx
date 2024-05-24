"use client";

import { ref, onValue, push } from "firebase/database";
import { db } from "../../../services/firebase/firebaseConfiguration";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../../context/AuthContext";

export default function novametaPagina() {
  const [error, setError] = useState<string | null>(null);
  const { userAuth } = useAuthContext();
  const router = useRouter();

  if (userAuth == null) {
    router.push("/signIn");
    return null;
  }

  const [novaMeta, setNovaMeta] = useState({
    titulo: "",
    descricao: "",
    datainicio: "",
    datafim: "",
    id_usuario: userAuth?.uid, //puxando o id do usuário logado no firebase.
    status: false, //definindo status padrão como falso para que quando a meta seja criada, ela esteja pendente.
  })

  const regrasinput = () => {
    const { titulo, descricao, datainicio, datafim } = novaMeta;
    const currentDate = new Date().toISOString().split("T")[0];

    if (titulo.length < 5 || titulo.length > 100) {
      return "O título deve ter entre 5 e 100 caracteres.";
    }

    if (descricao.length < 10 || descricao.length > 500) {
      return "A descrição deve ter entre 10 e 500 caracteres.";
    }

    if (datainicio < currentDate) {
      return "A data de início não pode ser anterior à data atual.";
    }

    if (datafim < datainicio) {
      return "A data de conclusão não pode ser anterior à data de início.";
    }

    return null;
  };

  const addNovaMeta = () => {
    const validationError = regrasinput();
    if (validationError) {
      setError(validationError);
      return;
    }
    push(ref(db, "/metas"), novaMeta);
    setNovaMeta({
      titulo: "",
      descricao: "",
      datainicio: "",
      datafim: "",
      id_usuario: "",
      status: false
    })
    router.push("/admin/vermetas");
  }

  return (
    <div>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addNovaMeta();
        }}
      >
        <h2 className="text-center text-3xl mb-8 font-extrabold text-white">
          Adicionar Meta
        </h2>
        {error && <p className="error">{error}</p>}
        <div className="center">
          <label className="label" htmlFor="titulo">
            Titulo:
          </label>
          <input
            className="input"
            id="titulo"
            type="text"
            placeholder="Título da Meta"
            value={novaMeta.titulo}
            onChange={(e) =>
              setNovaMeta({ ...novaMeta, titulo: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="label" htmlFor="descricao">
            Descrição:
          </label>
          <input
            className="input"
            id="descricao"
            type="text"
            placeholder="Descrição"
            value={novaMeta.descricao}
            onChange={(e) =>
              setNovaMeta({ ...novaMeta, descricao: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="label" htmlFor="datainicio">
            Data de Início:
          </label>
          <input
            className="input"
            id="datainicio"
            type="date"
            placeholder="Data de Início"
            value={novaMeta.datainicio}
            onChange={(e) =>
              setNovaMeta({ ...novaMeta, datainicio: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="label" htmlFor="datafim">
            Data de Fim:
          </label>
          <input
            className="input"
            id="datafim"
            type="date"
            placeholder="Data de Fim"
            value={novaMeta.datafim}
            onChange={(e) =>
              setNovaMeta({ ...novaMeta, datafim: e.target.value })
            }
          />
        </div>
        <div className="flex items-center justify-center">
          <button className="button" type="submit">
            Adicionar Meta
          </button>
        </div>
      </form>
    </div>

  );
};
