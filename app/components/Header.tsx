'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold text-primary">
          Psi Ludmyla Costa
        </Link>
        
        {/* Menu para dispositivos móveis */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-primary focus:outline-none"
          >
            <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-current transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
        
        {/* Menu para desktop */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><Link href="#home" className="nav-link">Início</Link></li>
            <li><Link href="#sobre" className="nav-link">Sobre</Link></li>
            <li><Link href="#servicos" className="nav-link">Serviços</Link></li>
            <li><Link href="#galeria" className="nav-link">Galeria</Link></li>
            <li><Link href="#contato" className="nav-link">Contato</Link></li>
          </ul>
        </nav>
        
        {/* Botão de agendamento */}
        <a 
          href="https://www.instagram.com/psiludmylacosta/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors"
        >
          <span>Agende sua sessão</span>
          <FaInstagram />
        </a>
      </div>
      
      {/* Menu mobile expandido */}
      <div className={`md:hidden absolute w-full bg-white shadow-md transition-all duration-300 ${isMenuOpen ? 'max-h-96 py-4' : 'max-h-0 overflow-hidden'}`}>
        <ul className="flex flex-col space-y-4 px-4">
          <li><Link href="#home" className="block py-2" onClick={() => setIsMenuOpen(false)}>Início</Link></li>
          <li><Link href="#sobre" className="block py-2" onClick={() => setIsMenuOpen(false)}>Sobre</Link></li>
          <li><Link href="#servicos" className="block py-2" onClick={() => setIsMenuOpen(false)}>Serviços</Link></li>
          <li><Link href="#galeria" className="block py-2" onClick={() => setIsMenuOpen(false)}>Galeria</Link></li>
          <li><Link href="#contato" className="block py-2" onClick={() => setIsMenuOpen(false)}>Contato</Link></li>
          <li>
            <a 
              href="https://www.instagram.com/psiludmylacosta/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors w-full justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Agende sua sessão</span>
              <FaInstagram />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}