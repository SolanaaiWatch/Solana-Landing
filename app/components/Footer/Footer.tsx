import { routes } from "@/lib/constants";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import Discord from "./discord.svg";
import style from "./Footer.module.scss";
import Tg from "./tg.svg";
import X from "./x.svg";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.footerTxt}>
          <div>
            <div className={style.links}>
              <Link href="#">
                <p>Features</p>
              </Link>
              <Link href="#">
                <p>SolWatch Experience</p>
              </Link>
              <Link href="#">
                <p>About</p>
              </Link>
            </div>
            <div className={style.privacyAndTermsContainer}>
              <Link href="/terms">
                <p>Terms Of Use </p>
              </Link>
              <Link href="/privacy-policy" className={style.privacy}>
                <p>Privacy Policy</p>
              </Link>
            </div>
          </div>
          <div className={cn("relative", style.logoBx)}>
            <Image src={Logo} alt="logo" />
            <p>
              Solana <strong>Watch</strong>{" "}
            </p>
            <p className="hidden md:block absolute !text-base !-bottom-8 !ml-0">
              3Cg8ETCZCbVi4igJYtDiUffr8pnQKW8vogtZcFN2TYqe
            </p>
          </div>
          <p className="text-xs my-4 sm:hidden">
            3Cg8ETCZCbVi4igJYtDiUffr8pnQKW8vogtZcFN2TYqe
          </p>
          <div className={style.socials}>
            <Link target="_blank" href={routes.x} className={style.social}>
              <Image src={X} alt="x" />
            </Link>
            <Link target="_blank" href={routes.tele} className={style.social}>
              <Image src={Tg} alt="telegram" />
            </Link>
            <Link target="_blank" href="#" className={style.social}>
              <Image className={style.disc} src={Discord} alt="discord" />
            </Link>
          </div>
        </div>
        <div className={style.copyright}>
          <p>Solana Watch &copy; 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
