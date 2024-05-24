"use client";

import React from "react";
import { ref, onValue, remove } from "firebase/database";
import { db } from "../../../services/firebase/firebaseConfiguration";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

interface IMeta {
    [key: string]: {
        titulo: string;
        descricao: string;
        datainicio: string;
        datafim: string;
        id_usuario: string;
        status: boolean
    }
}

export default function vermetasPagina() {
    const [loading, setLoading] = useState(true);
    const [metas, setMetas] = useState<IMeta>({});
    const auth = getAuth();
    const user = auth.currentUser;


    const { userAuth } = useAuthContext();
    const router = useRouter();
                                // codigo para criar um login required
    if (userAuth == null) {
        router.push("/signIn");
        return null; 
      }


    useEffect(() => {
        const fetchData = () => {
            const unsubscribe = onValue(ref(db, "/metas"), (querySnapShot) => {
                const metasData: IMeta = querySnapShot.val() || {};
                const userMetas = Object.keys(metasData)
                    .filter(key => metasData[key].id_usuario === user?.uid)
                    .reduce((obj, key) => {
                        obj[key] = metasData[key];
                        return obj;
                    }, {});
                setMetas(userMetas);
                setLoading(false);
            });

            return () => unsubscribe();
        };

        if (user) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [user]);
    
    function removerMeta(userId: string) {
        const metaRef = ref(db, `/metas/${userId}`);
        remove(metaRef);
        alert("Meta removida com sucesso!")
    }

    return (
        <div className="container">
            <div className="card">
                <h2 className="card-header">
                    {loading ? "Carregando..." : "Suas Metas"}
                </h2>
                {!loading && Object.keys(metas).length > 0 ? (
                    Object.keys(metas).map((userId) => (
                        <div key={userId} className="meta">
                            <h1 className="meta-title">{`${metas[userId].titulo}`}</h1>
                            <p className="meta-description">{`Descrição: ${metas[userId].descricao}`}</p>
                            <p className="meta-description">{`Data de Início: ${metas[userId].datainicio}`}</p>
                            <p className="meta-description">{`Data de Fim: ${metas[userId].datafim}`}</p>
                            <p className="meta-description">{`Status: ${metas[userId].status ? "Concluído" : "Pendente"}`}</p>
                            <button
                                className="remove-button"
                                onClick={() => removerMeta(userId)}
                            >
                                Remover
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="no-meta">Nenhuma meta encontrada.</p>
                )}
            </div>
        </div>
    );
    
}
