"use client"
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";

require("@solana/wallet-adapter-react-ui/styles.css");

const endpoint =
  "https://solana-mainnet.g.alchemy.com/v2/kN9jE4UfUURtAtZYil_SoTQm9s3EdMRW";

export const WalletConnectionProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {mounted && children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
