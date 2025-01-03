"use client";
import React, { useEffect, useState } from "react";
import style from "./Template.module.scss";
import Image from "next/image";
import Arrow1 from "./arrow.svg";
import Arrow2 from "./arrow2.svg";

const NeedsToggle = () => {
  const [selected, setSelected] = useState(null);
  const toggle = (i: any) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  let number = 1;
  return (
    <>
      <div className={style.container}>
        <div className={style.needs}>
          {data.map((item, i) => (
            <div className={style.need} key={item?.title}>
              <div className={style.needTop} onClick={() => toggle(i)}>
                <div className={style.needNumber}>
                  <p>{number++}</p>
                </div>
                <div className={style.needTitle}>
                  <h3>{item?.title}</h3>
                </div>
                <div className={style.needIcon}>
                  <Image src={selected === i ? Arrow1 : Arrow2} alt="more" />
                </div>
              </div>
              <div
                //className={style.needDesc}
                className={
                  selected === i
                    ? `${style.needDesc} ${style.show}`
                    : style.needDesc
                }
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: item.description,
                  }}
                ></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const data = [
  {
    title: "AI Terminal",
    description: `Integrating multiple AI capabilities into a single device, including an AI trading assistant, AI agent, AI data analysis, and more—experience the power of an AI terminal on your wrist.`,
  },
  {
    title: "dApp Store",
    description: `A native dApp store offering a diverse range of decentralized applications (dApps) from the Solana ecosystem.`,
  },
  {
    title: "DePIN Protocol",
    description: `The Digital Resource Networks (DRNs) built on the Solana network. The Solana Watch DePIN protocol establishes a location-independent backend for the cloud, incentivizing users to provide digital resources.`,
  },
  {
    title: "Token Rewards System",
    description: `A built-in rewards system for users, users earn token rewards while using SolanaWatch, seamlessly integrated with the Solana blockchain.`,
  },
];

export default NeedsToggle;
