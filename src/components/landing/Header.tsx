
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/button';
import { AppointmentModal } from './AppointmentModal';
import whatsappIconPng from '@/components/icons/whatsapplogo.png';
import { Menu, X } from 'lucide-react';

const WHATSAPP_NUMBER = "573108740006";
const WHATSAPP_MESSAGE = "Hola, me gustaría obtener más información sobre sus servicios.";

export function Header() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      id="main-header"
      className="py-3 px-4 navbreak:px-8 sticky top-0 z-50 bg-[rgba(35,31,32,0.85)] backdrop-blur-md shadow-md"
    >
      <div className="container mx-auto flex justify-between items-center max-w-[1140px] header-content-fade-unblur">
        <Link href="/" aria-label="Página de inicio de Cita Fácil">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden navbreak:flex items-center gap-6">
          <Link href="/#problemas" className="text-sm font-medium text-white/80 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-primary-foreground/10">
            Servicios
          </Link>
          <Link href="/#contacto-final" className="text-sm font-medium text-white/80 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-primary-foreground/10">
            Contáctanos
          </Link>
          <AppointmentModal
            triggerButtonText="Agenda una llamada"
            triggerButtonVariant="ghost"
            triggerButtonClassName="text-sm font-medium !text-white/80 hover:!text-white hover:!bg-primary-foreground/10"
          />
          <Button
            asChild
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-md transition"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
              <Image src={whatsappIconPng} alt="WhatsApp" width={16} height={16} />
              WhatsApp
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="navbreak:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white/80 hover:text-white focus:outline-none"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="navbreak:hidden absolute top-full left-0 right-0 bg-[rgba(35,31,32,0.98)] shadow-xl rounded-b-lg z-40 border-t border-white/10">
          <nav className="flex flex-col items-center gap-3 p-4">
            <Link
              href="/#problemas"
              className="block w-full text-center text-base text-white/90 hover:text-white py-2.5 px-4 rounded-md hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Servicios
            </Link>
            <Link
              href="/#contacto-final"
              className="block w-full text-center text-base text-white/90 hover:text-white py-2.5 px-4 rounded-md hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contáctanos
            </Link>
            <div className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
              <AppointmentModal
                triggerButtonText="Agenda una llamada"
                triggerButtonVariant="ghost"
                triggerButtonClassName="w-full text-center text-base !text-white/90 hover:!text-white !bg-transparent py-2.5 px-4 rounded-md hover:!bg-white/10 transition-colors"
              />
            </div>
            <Button
              asChild
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-md transition text-base"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src={whatsappIconPng} alt="WhatsApp" width={18} height={18} />
                WhatsApp
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
