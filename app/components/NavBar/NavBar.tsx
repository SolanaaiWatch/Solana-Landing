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
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormSchema } from "@/lib/auth";
import { watchAddress } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import { useFormik } from "formik";
import { gsap, Power3 } from "gsap";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Logo from "./logo.svg";
import style from "./NavBar.module.scss";

interface Progress {
  yes: number;
  no: number;
}

const NavBar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [watchBalance, setWatchBalance] = useState(0);

  const [progress, setProgress] = useState<Progress>({
    yes: 0,
    no: 0,
  });

  const menu = useRef<HTMLDivElement>(null);
  const openMenu = useRef<SVGSVGElement>(null);

  const pathname = usePathname();
  const { connection } = useConnection();

  const { publicKey, disconnect } = useWallet();

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

  const fetchVote = async () => {
    try {
      const res = await fetch("/api/vote");
      const data = await res.json();
      setProgress((prev) => ({ ...prev, yes: data.yes, no: data.no }));
    } catch (error: any) {
      toast.error(`Fetch voting data failed ${error.message}`);
      console.error(error);
    }
  };

  const fetchBalance = async () => {
    setIsFetching(true);
    try {
      const mint = new PublicKey(watchAddress);

      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey!,
        { mint }
      );

      if (tokenAccounts?.value?.length > 0) {
        const watchBalance =
          tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
        setWatchBalance(watchBalance);
      }
    } catch (error: any) {
      // toast.error(`Fetch $WATCH balance failed`);
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const formik = useFormik({
    initialValues: { answer: "yes" },
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      const hasVoted = JSON.parse(
        localStorage.getItem("SOLWATCH_DAO_VOTE") as string
      );
      if (hasVoted) {
        toast.error("You have already voted for the DAO");
        return;
      }

      setIsPending(true);
      try {
        const res = await fetch("/api/vote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          throw new Error(`${res.status}, ${res.statusText}`);
        }
        localStorage.setItem("SOLWATCH_DAO_VOTE", JSON.stringify(values));
        toast.success("Congratulations! You have been voted successfully.", {
          autoClose: 3000,
        });
        await fetchVote();
      } catch (error: any) {
        toast.error(`Vote failed ${error.message}`);
        console.error(error);
      } finally {
        setIsPending(false);
      }
    },
  });

  useEffect(() => {
    if (publicKey) {
      fetchBalance();
    }
  }, [publicKey]);

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
            {publicKey ? (
              <button className=" capitalize" onClick={() => setOpenForm(true)}>
                Vote
              </button>
            ) : (
              <WalletMultiButton className="!w-auto" />
            )}

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
              WATCH DAO Proposal
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              {isFetching ? (
                <Loader className="animate-spin size-10 m-auto" />
              ) : (
                <form onSubmit={formik.handleSubmit}>
                  {/* <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-start gap-2">
                      <Label className="mb-1 capitalize md:text-base leading-tight">
                        Should the team withdraw 300 Sol from DAO fund wallet
                        for marketing and buyback?
                      </Label>
                      <RadioGroup
                        className="w-full"
                        onValueChange={(value) =>
                          formik.setFieldValue("answer", value)
                        }
                        defaultValue="yes"
                        {...formik.getFieldProps("answer")}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            className="data-[state=checked]:bg-[#21eea3] data-[state=checked]:text-[#21eea3] data-[state=checked]:border-[#21eea3]"
                            value="yes"
                            id="yes"
                          />
                          <Label
                            className="w-6 md:w-10 md:text-lg"
                            htmlFor="yes"
                          >
                            Yes
                          </Label>
                          {progress.yes ? (
                            <>
                              <Progress
                                value={progress.yes}
                                className="w-[60%] md:w-full"
                              />
                              <Label className="">{progress.yes}%</Label>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            className="data-[state=checked]:bg-[#21eea3] data-[state=checked]:text-[#21eea3] data-[state=checked]:border-[#21eea3]"
                            value="no"
                            id="no"
                          />
                          <Label
                            className="w-6 md:w-10 md:text-lg"
                            htmlFor="no"
                          >
                            No
                          </Label>
                          {progress.no ? (
                            <>
                              <Progress
                                value={progress.no}
                                className="w-[60%] md:w-full"
                              />
                              <Label className="">{progress.no}%</Label>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </RadioGroup>
                    </div>
                    <button
                      className={cn(
                        "disabled:opacity-80 text-base font-semibold !w-full mx-auto flex justify-center items-center gap-2",
                        style.btn__form
                      )}
                      disabled={isPending || watchBalance <= 10000}
                    >
                      {isPending && <Loader className="animate-spin" />}
                      Submit
                    </button>
                  </div> */}
                </form>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isPending}
              onClick={() => {
                formik.resetForm();
                setProgress((prev) => ({ ...prev, yes: 0, no: 0 }));
              }}
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
        draggable={false}
        pauseOnHover
        theme="light"
        transition={Bounce}
        className="z-[99999] !w-1/2 mx-auto mt-6 md:w-auto"
      />
    </>
  );
};

export default NavBar;
