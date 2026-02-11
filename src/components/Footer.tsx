import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#D1E8E2]/30 border-t-2 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#19747E] to-[#4A9B8F] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                C
              </div>
              <div>
                <span className="font-extrabold text-xl text-gray-900">Calendrier</span>
                <span className="font-extrabold text-xl text-[#19747E]">PME</span>
              </div>
            </div>
            <p className="text-gray-600 mb-6 max-w-sm">
              L&apos;outil gratuit pour ne jamais manquer une échéance importante.
              Conçu pour les PME québécoises.
            </p>
            
            {/* Propulsé par RayV */}
            <a 
              href="https://rayv.ca" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-gray-200 hover:border-[#19747E]/40 transition-all group"
            >
              <span className="text-gray-500 text-sm">Propulsé par</span>
              <span className="font-bold text-gray-900 group-hover:text-[#DE7D18] transition-colors">
                Ray<span className="text-[#DE7D18]">V</span>
              </span>
            </a>
          </div>
          
          <div>
            <p className="font-bold text-lg mb-6 text-gray-900">Navigation</p>
            <ul className="space-y-3">
              <li><Link href="/calendrier" className="text-gray-600 hover:text-[#19747E] transition-colors">Calendrier</Link></li>
              <li><Link href="/planificateur" className="text-gray-600 hover:text-[#19747E] transition-colors">Le Planificateur</Link></li>
              <li><Link href="/#faq" className="text-gray-600 hover:text-[#19747E] transition-colors">FAQ</Link></li>
              <li><a href="mailto:info@calendrierpme.ca" className="text-gray-600 hover:text-[#19747E] transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <p className="font-bold text-lg mb-6 text-gray-900">Sources officielles</p>
            <ul className="space-y-3">
              <li><a href="https://www.revenuquebec.ca" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#19747E] transition-colors">Revenu Québec</a></li>
              <li><a href="https://www.canada.ca/fr/agence-revenu.html" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#19747E] transition-colors">Agence du revenu du Canada</a></li>
              <li><a href="https://www.cnesst.gouv.qc.ca" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#19747E] transition-colors">CNESST</a></li>
              <li><a href="https://www.quebec.ca/entreprises" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#19747E] transition-colors">Québec.ca Entreprises</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t-2 border-gray-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Calendrier PME Québec. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <Link href="/confidentialite" className="hover:text-[#19747E] transition-colors">Confidentialité</Link>
            <Link href="/conditions" className="hover:text-[#19747E] transition-colors">Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
