"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSchema } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { gsap, Power3 } from "gsap";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Logo from "./logo.svg";
import style from "./NavBar.module.scss";

const NavBar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [isPending, setIsPending] = useState(false);

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

  const formik = useFormik({
    initialValues: { tele: "", x: "", address: "" },
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      const hasSubmitted = JSON.parse(
        localStorage.getItem("SOLWATCH_WL_SUBMISSION") ?? ""
      );
      if (hasSubmitted) {
        toast.error("You have already submitted your whitelist");
      }

      setIsPending(true);
      try {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          throw new Error(`${res.status}, ${res.statusText}`);
        }
        localStorage.setItem("SOLWATCH_WL_SUBMISSION", JSON.stringify(values));
        toast.success("Submit successfully", { className: "" });
      } catch (error: any) {
        toast.error(`Submit failed ${error.message}`, { className: "" });
        console.error(error);
      } finally {
        setIsPending(false);
      }
    },
  });

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
            <Link href="/dao">
              <p>DAO</p>
            </Link>
          </div>
          <div className={style.btn}>
            <button onClick={() => setOpenForm(true)}>Whitelist</button>
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
            <Link onClick={hideNavbar} href="/dao">
              <p>DAO</p>
            </Link>
          </div>
        </div>
      </div>
      <AlertDialog open={openForm} onOpenChange={setOpenForm}>
        <AlertDialogContent
          className={cn(
            "w-4/5 max-w-md bg-black/80 rounded-xl border border-[#ffa5001a]"
          )}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center md:text-xl text-[#21eea3] mb-5">
              Whitelist
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-start gap-2">
                    <Label className="mb-1" htmlFor="tele">
                      Telegram
                    </Label>
                    <Input
                      id="tele"
                      placeholder="@solanaaiwatch"
                      required
                      type="text"
                      className="bg-gray-800/50 border border-[#ffa5001a] placeholder:text-sm md:placeholder:text-base py-2 h-auto focus-visible:ring-[#b42cf7]"
                      {...formik.getFieldProps("tele")}
                    />
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    <Label className="mb-1" htmlFor="x">
                      X
                    </Label>
                    <Input
                      id="x"
                      placeholder="@SolanaAIWatch"
                      required
                      type="text"
                      className="bg-gray-800/50 border border-[#ffa5001a] placeholder:text-sm md:placeholder:text-base py-2 h-auto focus-visible:ring-[#b42cf7]"
                      {...formik.getFieldProps("x")}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <Label className="mb-1 capitalize" htmlFor="address">
                      Solana address
                    </Label>
                    <Input
                      id="address"
                      placeholder="Your solana wallet address"
                      required
                      type="text"
                      className="bg-gray-800/50 border border-[#ffa5001a] placeholder:text-sm md:placeholder:text-base py-2 h-auto focus-visible:ring-[#b42cf7]"
                      {...formik.getFieldProps("address")}
                    />
                  </div>
                  <button
                    className={cn(
                      "disabled:opacity-80 text-base font-semibold !w-full mx-auto flex justify-center items-center gap-2",
                      style.btn__form
                    )}
                    disabled={isPending || !(formik.isValid && formik.dirty)}
                  >
                    {isPending && <Loader className="animate-spin" />}
                    Submit
                  </button>
                </div>
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => formik.resetForm()}
              className="bg-[#dc2626] text-[#fafafa] shadow-sm hover:bg-[#dc2626e6] border-0 rounded-full h-12 text-base font-semibold w-full"
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        className="z-[99999] w-4/5 mx-auto mt-6 md:w-auto"
      />
    </>
  );
};

export default NavBar;
