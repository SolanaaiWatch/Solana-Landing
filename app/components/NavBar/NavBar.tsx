"use client";
import { gsap, Power3 } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./logo.svg";
import style from "./NavBar.module.scss";

const NavBar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const menu = useRef<HTMLDivElement>(null);
  const openMenu = useRef<SVGSVGElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  const handleToggle = () => setIsMenuActive((prev) => !prev);

  const hideNavbar = () => setIsMenuActive(false);

  const animateMenu = (isOpen: boolean) => {
    if (!menu.current) return;

    const t1 = gsap.timeline();
    t1.to(menu.current, 1, {
      left: isOpen ? 0 : -innerWidth,
      ease: Power3.easeInOut,
      duration: 0.09,
    });
  };

  useEffect(() => {
    if (!openMenu.current) return;
    openMenu.current.classList.toggle("active", isMenuActive);
    animateMenu(isMenuActive);
  }, [isMenuActive]);

  useEffect(() => {
    setIsMenuActive(false);
  }, [pathname]);

  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <Link href="/" className={style.logoBx}>
            <Image src={Logo} alt="SolWatch" /> {/*change to text? */}
          </Link>
          <div className={style.links}>
            <Link href="/">
              <p>Home</p>
            </Link>
            <Link href="#">
              <p>Features</p>
            </Link>
            <Link href="#">
              <p>SolWatch Experience</p>
            </Link>

            <Link href="#">
              <p>Contact</p>
            </Link>
            <Link href="/docs">
              <p>Docs</p>
            </Link>
          </div>
          <div className={style.btn}>
            <button
            >
              Pre-Order
            </button>
            <div className={style.hamBox}>
              <svg
                className="ham hamRotate ham1 menu-open"
                viewBox="0 0 100 100"
                width="80"
                //onclick="this.classList.toggle('active')"
                onClick={handleToggle}
                ref={openMenu}
              >
                <path
                  className="hline top"
                  d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
                />
                <path className="hline middle" d="m 30,50 h 40" />
                <path
                  className="hline bottom"
                  d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className={style.menu} ref={menu}>
        <div className={style.menuContent}>
          <div className={style.menuLinks}>
            <Link onClick={hideNavbar} href="/">
              <p>Home</p>
            </Link>
            <Link onClick={hideNavbar} href="#">
              <p>Features</p>
            </Link>
            <Link onClick={hideNavbar} href="#">
              <p>SolWatch Experience</p>
            </Link>

            <Link onClick={hideNavbar} href="#">
              <p>Contact</p>
            </Link>
            <Link onClick={hideNavbar} href="/docs">
              <p>Docs</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
