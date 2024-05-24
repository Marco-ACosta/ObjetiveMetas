"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";

const Header = () => {
  const pathname = usePathname();
  const { userAuth, logout } = useAuthContext();

  return (
    <header className="header">
      <div className="header-container">
        <div className="user-info">
          <h2>Usuário: {userAuth?.email}</h2>
        </div>
        <nav className="nav">
          <Link href="/" legacyBehavior>
            <a className={`${pathname === '/' ? 'active' : ''}`}>
              Home
            </a>
          </Link>
          <Link href="/admin" legacyBehavior>
            <a className={`${pathname === '/admin' ? 'active' : ''}`}>
              Admin
            </a>
          </Link>
          <Link href="/admin/novameta" legacyBehavior>
            <a className={`${pathname === '/admin/novameta' ? 'active' : ''}`}>
              Adicionar Meta
            </a>
          </Link>
          <Link href="/admin/vermetas" legacyBehavior>
            <a className={`${pathname === '/admin/vermetas' ? 'active' : ''}`}>
              Ver Metas
            </a>
          </Link>
          <Link href="/signIn" legacyBehavior>
            <a className={`${pathname === '/signIn' ? 'active' : ''}`}>
              Entrar
            </a>
          </Link>
          <Link href="/signUp" legacyBehavior>
            <a className={`${pathname === '/signUp' ? 'active' : ''}`}>
              Cadastrar
            </a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
