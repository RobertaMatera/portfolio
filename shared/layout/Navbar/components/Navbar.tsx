"use client";

import { useNavbar } from "./useNavbar";
import { LanguageCode } from "./modelNavbar";

export default function Navbar() {
  const { items:
      navItems,
      languages,
      isLangOpen,
      setIsLangOpen
  } = useNavbar();

  return (
    <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-default">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-7" alt="Flowbite Logo" />
                  
                <div>
                    <div className="self-center text-xl text-heading font-semibold whitespace-nowrap">Roberta Matera</div>
                    <div className="self-center text-xl text-heading font-semibold whitespace-nowrap">FULL STACK DEVELOPER</div>
                </div>
                
                
            </a>
            <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/></svg>
            </button>

            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                    {navItems.map((item) => (
                        <li key={item.label}>
                        <a className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent" href={item.href}>
                            {item.label}
                        </a>
                        </li>
                    ))}

                    {/* Dropdown inserted here */}
                    <li className="relative">
                      <button onClick={() => setIsLangOpen((lang) => !lang)}>
                        {LanguageCode.EN}
                      </button>

                      {isLangOpen && (
                        <ul className="absolute right-0 mt-2 w-40 rounded border bg-white shadow">
                          {languages.map((lang) => (
                            <li
                                className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                                key={lang.code}
                             >
                              <button
                                onClick={() => {
                                  console.log("selected:", lang.code);
                                  setIsLangOpen(false);
                                }}
                                className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                              >
                                {lang.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  );
}