import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { address } = body;

  try {
    const customerRef = collection(db, "eligibility");

    const q = query(customerRef, where("address", "==", address));
    const querySnapshot = await getDocs(q);

    return Response.json({ eligiblity: querySnapshot.size > 0 ? true : false });
  } catch (error) {
    console.error("Error writing customer data:", error);
    return Response.json(
      { error: "Something went wrong when writing customer data" },
      { status: 500 }
    );
  }
}
