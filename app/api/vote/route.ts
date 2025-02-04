import { db } from "@/lib/firebase/config";
import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { answer } = await req.json();

    const voteRef = doc(db, "vote", "99DrdbFIpuLCiTtnw58W");
    const updateData = {
      [answer === "yes" ? "yes" : "no"]: increment(1),
      total: increment(1),
    };
    await setDoc(voteRef, updateData, { merge: true });
    return Response.json({ voted: true });
  } catch (error) {
    console.error("Error voting data:", error);
    return Response.json(
      { error: "Something went wrong when voting data" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const customerRef = collection(db, "vote");

    const q = query(customerRef, where("main", "==", true));
    const querySnapshot = await getDocs(q);
    let data = {
      yes: 0,
      no: 0,
    };
    querySnapshot.forEach((doc) => {
      data.yes += Number(
        ((doc.data().yes / doc.data().total) * 100).toFixed(0)
      );
    });
    return Response.json({ ...data, no: 100 - data.yes });
  } catch (error) {
    console.error("Error writing customer data:", error);
    return Response.json(
      { error: "Something went wrong when writing customer data" },
      { status: 500 }
    );
  }
}
