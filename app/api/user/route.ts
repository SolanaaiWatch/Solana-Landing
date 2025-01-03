import { db } from "@/lib/firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { tele, x, address } = body;

  try {
    const customerRef = doc(collection(db, "customers"));

    await setDoc(customerRef, { tele, x, address });
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error writing customer data:", error);
    return Response.json(
      { error: "Something went wrong when writing customer data" },
      { status: 500 }
    );
  }
}
