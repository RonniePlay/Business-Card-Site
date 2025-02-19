import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useTranslation, i18n, I18n } from "next-i18next";
import { useRouter } from "next/router.js";
import { ScrollContext } from "@/pages/_app";
import styles from "./headerStyle.module.css";

export default function Header({ scroll }: any) {
  const [showLng, setShowLng] = useState(false);
  const [showMobLng, setShowMobLng] = useState(false);
  const [showBurger, setShowBurger] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const { pathname, query } = router;
  const setIsScroll = useContext(ScrollContext);

  if (!setIsScroll) {
    throw new Error(
      "useScrollContext must be used within a ScrollContext.Provider"
    );
  }

  const changeShowLng = (e: any) => {
    if (!e.target.closest(".c-lng")) setShowLng(false);
  };

  const changeLanguage = (lang: any) => {
    router.push({ pathname, query }, undefined, {
      locale: lang,
    });
    (i18n as I18n).changeLanguage(lang);
    setShowLng(false);
    setShowMobLng(false);
  };

  useEffect(() => {
    if (showLng) {
      document.addEventListener("click", changeShowLng);
    } else {
      document.removeEventListener("click", changeShowLng);
    }

    return () => {
      document.removeEventListener("click", changeShowLng);
    };
  }, [showLng]);

  return (
    <header
      className={`sticky select-none z-10 top-0 bg-opacity-80 flex items-center justify-between px-5 fsm:px-20 py-5 transition ${
        scroll > 40 ? "bg-zinc-900" : ""
      }`}
    >
      <Link href="/" className="focus:outline-none">
        <Image
          src="/images/header/avatar.png"
          alt="avatar"
          width="50"
          height="50"
          draggable={false}
        />
      </Link>
      <nav className="hidden md:block font-tthb">
        <ul className="flex">
          <li>
            <Link
              className={`${styles.page_select} ${
                pathname == "/" ? "text-red-700" : "hover:text-red-500"
              }`}
              href="/"
            >
              {t("header.home").toLocaleUpperCase()}
            </Link>
          </li>
          <li>
            <Link
              className={`${styles.page_select} ${
                pathname == "/about" ? "text-red-700" : "hover:text-red-500"
              }`}
              href="/about"
            >
              {t("header.about").toLocaleUpperCase()}
            </Link>
          </li>
          <li>
            <Link
              className={`${styles.page_select} ${
                pathname == "/contacts" ? "text-red-700" : "hover:text-red-500"
              }`}
              href="/contacts"
            >
              {t("header.contacts").toLocaleUpperCase()}
            </Link>
          </li>
          <li>
            <Link
              className={`${styles.page_select} ${
                pathname == "/portfolio" ? "text-red-700" : "hover:text-red-500"
              }`}
              href="/portfolio"
            >
              {t("header.portfolio").toLocaleUpperCase()}
            </Link>
          </li>
        </ul>
      </nav>
      <div className={`relative hidden md:block font-tthb`}>
        <button
          className={`c-lng border-2 px-3 py-1 rounded-lg pb-1.5 transition duration-200 ${
            showLng
              ? "border-red-700 shadow-red-center"
              : "hover:border-red-500 hover:shadow-red-center"
          }`}
          onClick={() => setShowLng(!showLng)}
        >
          {router.locale?.toLocaleUpperCase()}
        </button>
        <div
          className={`c-lng border-2 rounded-lg absolute top-full bg-black transition duration-200 ${
            showLng
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-1/3 pointer-events-none"
          }`}
        >
          {router.locales
            ?.filter((item) => item !== router.locale)
            .map((item, index) => (
              <button
                onClick={() => changeLanguage(item)}
                key={index}
                className="c-lng px-3 py-1 hover:text-red-500"
              >
                {item.toLocaleUpperCase()}
              </button>
            ))}
        </div>
      </div>
      <button
        className="md:hidden cursor-pointer"
        onClick={() => {
          setShowBurger(true);
          setIsScroll(false);
        }}
      >
        <div className="w-7 bg-white h-0.5 rounded-lg"></div>
        <div className="w-7 bg-white h-0.5 rounded-lg my-1.5"></div>
        <div className="w-7 bg-white h-0.5 rounded-lg"></div>
      </button>
      <div
        onClick={() => {
          setShowBurger(false);
          setIsScroll(true);
        }}
        className={`${
          showBurger ? "visible opacity-100" : "invisible opacity-0"
        } fixed cursor-pointer md:hidden transition-opacity right-0 left-0 top-0 bottom-0 bg-zinc-600 bg-opacity-70`}
      ></div>
      <div
        className={`${
          showBurger
            ? "visible translate-x-0 opacity-100"
            : "invisible translate-x-96 opacity-0"
        } fixed md:hidden shadow-2xl right-0 transition-all top-0 bottom-0 w-full min_sm:w-80 bg-zinc-900 grid grid-rows-[auto_1fr_auto]`}
      >
        <div>
          <button
            className="border-2 hover:border-red-500 transition h-8 rounded-full m-5 mt-8 p-3 py-4"
            onClick={() => {
              setShowBurger(false);
              setIsScroll(true);
            }}
          >
            <div className="w-7 rotate-45 -translate-y-0.5 bg-white h-0.5 rounded-lg"></div>
            <div className="w-7 -rotate-45 -translate-y-1 bg-white h-0.5 rounded-lg"></div>
          </button>
          <div className="text-center text-2xl font-tthb [&_>span]:text-red-500 overline decoration-red-500">
            <span>_</span>REVEIN<span>_</span>OFF<span>_</span>
          </div>
        </div>
        <nav className="m-5 opensans">
          <Link
            href="/"
            className={styles.sidebar_pages}
            onClick={() => setShowBurger(false)}
          >
            <Image
              src="/images/header/home.svg"
              width="25"
              height="25"
              alt="home"
              className="mr-3"
              draggable={false}
            />
            <div>{t("header.home")}</div>
          </Link>
          <Link
            href="/about"
            className={styles.sidebar_pages}
            onClick={() => setShowBurger(false)}
          >
            <Image
              src="/images/header/about.svg"
              width="25"
              height="25"
              alt="about"
              className="mr-3"
              draggable={false}
            />
            <div>{t("header.about")}</div>
          </Link>
          <Link
            href="/contacts"
            className={styles.sidebar_pages}
            onClick={() => setShowBurger(false)}
          >
            <Image
              src="/images/header/contacts.svg"
              width="25"
              height="25"
              alt="contacts"
              className="mr-3"
              draggable={false}
            />
            <div>{t("header.contacts")}</div>
          </Link>
          <Link
            href="/portfolio"
            className={styles.sidebar_pages}
            onClick={() => setShowBurger(false)}
          >
            <Image
              src="/images/header/portfolio.svg"
              width="25"
              height="25"
              alt="portfolio"
              className="mr-3"
              draggable={false}
            />
            <div>{t("header.portfolio")}</div>
          </Link>
        </nav>
        <div className="m-5 mt-0 relative font-tthb">
          <div className="absolute bottom-20 w-full">
            {router.locales
              ?.filter((item) => item !== router.locale)
              .map((item, index) => (
                <button
                  className={`block text-xl bg-zinc-700 hover:bg-zinc-600 w-full mb-3 last:mb-0 rounded-lg py-2 transition-all ${
                    showMobLng
                      ? "translate-y-0 opacity-100 visible first:delay-100"
                      : "translate-y-20 opacity-0 invisible"
                  }`}
                  key={index}
                  onClick={() => changeLanguage(item)}
                >
                  {item.toLocaleUpperCase()}
                </button>
              ))}
          </div>
          <button
            className="flex bg-zinc-700 hover:bg-zinc-600 rounded-lg items-center w-full px-5 py-4"
            onClick={() => setShowMobLng(!showMobLng)}
          >
            <Image
              src="/images/header/language.svg"
              width="25"
              height="25"
              alt="language"
              className="mr-3"
              draggable={false}
            />
            <div className="text-xl">{router.locale?.toLocaleUpperCase()}</div>
            <Image
              src="/images/header/arrow.svg"
              width="15"
              height="15"
              alt="arrow"
              className={`ml-auto transition-all ${
                showMobLng ? "rotate-180" : "rotate-0"
              }`}
              draggable={false}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
