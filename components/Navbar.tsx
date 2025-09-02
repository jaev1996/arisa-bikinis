"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-secondary/10 backdrop-blur-md text-primary px-4 sm:px-6 py-3 sm:py-4 fixed w-full z-50 shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-2 sm:mb-0 w-full sm:w-auto justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src="/logos/arisa-logo-bg-white.png"
                alt="Logo Arisa Bikinis"
                width={150}
                height={150}
                className="object-cover hover:opacity-100 transition duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Hamburguer menu solo en móviles */}
          <button
            className="sm:hidden ml-auto p-2 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Abrir menú"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Opciones del menú */}
        <ul className="hidden sm:flex flex-row gap-6 text-sm font-medium items-center w-auto text-white">
          <li>
            <Link href="/" className="hover:text-accent hover:scale-110 transition duration-200 font-bold">
              INICIO
            </Link>
          </li>
          <li>
            <Link href="/catalogo" className="hover:text-accent hover:scale-110 transition duration-200 font-bold">
              CATALOGO
            </Link>
          </li>
          <li>
            <Link href="/nosotros" className="hover:text-accent hover:scale-110 transition duration-200 font-bold">
              NOSOTROS
            </Link>
          </li>
          <li>
            <a
              href="https://wa.me/584141234567"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-primary font-semibold px-4 py-2 rounded-full shadow transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center gap-2 hover:bg-primary hover:text-accent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.93.547 3.77 1.584 5.377L2 22l4.755-1.561A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.64 0-3.232-.443-4.61-1.282l-.33-.197-2.826.929.937-2.75-.215-.352C4.443 15.232 4 13.64 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.297-5.021c-.237-.119-1.398-.689-1.615-.768-.217-.08-.375-.119-.532.119-.158.237-.609.768-.747.926-.138.158-.276.178-.513.06-.237-.119-.999-.368-1.903-1.174-.703-.627-1.179-1.403-1.318-1.64-.138-.237-.015-.365.104-.484.107-.106.237-.276.356-.414.119-.138.158-.237.237-.395.079-.158.04-.296-.02-.414-.06-.119-.532-1.287-.729-1.762-.192-.462-.388-.399-.532-.406-.138-.007-.296-.009-.454-.009-.158 0-.414.06-.63.296-.217.237-.827.808-.827 1.969 0 1.161.846 2.285.963 2.444.119.158 1.666 2.547 4.037 3.463.565.194 1.005.31 1.35.397.567.144 1.084.124 1.492.075.455-.055 1.398-.572 1.597-1.126.198-.553.198-1.027.139-1.126-.06-.099-.217-.158-.454-.277z" />
              </svg>
              WhatsApp
            </a>
          </li>
        </ul>

        {/* Menú móvil */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex flex-col items-center justify-center">
            <button
              className="absolute top-6 right-6 text-primary bg-accent hover:bg-opacity-80 rounded-full p-2 shadow-lg"
              aria-label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ul className="flex flex-col gap-6 text-lg font-bold items-center text-white">
              <li>
                <Link href="/" className="hover:text-accent transition block py-2" onClick={() => setMenuOpen(false)}>INICIO</Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-accent transition block py-2" onClick={() => setMenuOpen(false)}>CATALOGO</Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-accent transition block py-2" onClick={() => setMenuOpen(false)}>NOSOTROS</Link>
              </li>
              <li>
                <a
                  href="https://wa.me/584141234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent text-primary font-semibold px-6 py-3 rounded-full shadow transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center gap-2 hover:bg-primary hover:text-accent"
                  onClick={() => setMenuOpen(false)}
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
