import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
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
      no: 0
    }
    querySnapshot.forEach((doc) => {
      data.yes += doc.data().yes;
      data.no += doc.data().no;
    })
    return Response.json({ ...data });
  } catch (error) {
    console.error("Error writing customer data:", error);
    return Response.json(
      { error: "Something went wrong when writing customer data" },
      { status: 500 }
    );
  }
}
