import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-primary text-secondary py-8 mt-10 w-full border-t border-accent/40">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 flex flex-col items-center sm:items-start text-sm">
          <p className="font-bold text-lg mb-2">ARISA BIKINIS</p>
          <p className="mb-1">Correo: <a href="mailto:contacto@arisabikinis.com" className="underline text-accent hover:text-secondary">contacto@arisabikinis.com</a></p>
          <p className="mb-1">Teléfono: <a href="tel:+584141234567" className="underline text-accent hover:text-secondary">+58 414 1234567</a></p>
          <p className="mt-2 text-neutral-400">Sitio desarrollado por <a href="https://www.eleva.marketing" target="_blank" rel="noopener noreferrer" className="underline text-accent hover:text-secondary">ELEVA MARKETING</a></p>
        </div>
        {/* Logo alternativo centrado */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <Image src="/logos/arisa-alternative-bg-black.jpg" alt="Logo Alternativo Arisa" width={220} height={220} className="mx-auto mb-2" />
        </div>
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="flex gap-4 mb-2">
            <a href="https://www.instagram.com/arisabikinis" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-accent hover:text-secondary transition hover:shadow-lg hover:shadow-accent/60 rounded-full">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" /></svg>
            </a>
            <a href="https://www.facebook.com/arisabikinis" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-accent hover:text-secondary transition hover:shadow-lg hover:shadow-accent/60 rounded-full">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.104c.73 0 1.325-.592 1.325-1.326V1.326C24 .592 23.405 0 22.675 0z" /></svg>
            </a>
            <a href="https://www.tiktok.com/@arisabikinis" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-accent hover:text-secondary transition hover:shadow-lg hover:shadow-accent/60 rounded-full">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.004 2.003c.001 2.209 1.792 4.001 4.001 4.001.001 0 .001 0 .001 0v2.001c-1.104 0-2.001-.897-2.001-2.001V2.003h-2.001v12.001c0 1.104-.897 2.001-2.001 2.001s-2.001-.897-2.001-2.001c0-1.104.897-2.001 2.001-2.001.001 0 .001 0 .001 0V10.003c-2.209 0-4.001 1.792-4.001 4.001s1.792 4.001 4.001 4.001c2.209 0 4.001-1.792 4.001-4.001V4.004c0-.001 0-.001 0-.001h-2.001z" /></svg>
            </a>
          </div>
          <span className="text-xs text-neutral-400">Síguenos en redes sociales</span>
        </div>
      </div>
      <div className="text-center text-xs text-neutral-500 mt-6">
        <p>© {new Date().getFullYear()} Arisa Bikinis. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
