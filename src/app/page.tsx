import { CreateOrder } from "@/service/createOrder";
import { generateToke } from "@/service/generateToke";
import { randomUUID } from "crypto";

import { redirect } from "next/navigation";



export default function Home() {
  return (
    <div className="flex h-screen justify-center bg-yellow-50 ">
      <form className="w-[500px] p-7.5 rounded-4xl h-max flex flex-col bg-white transform translate-y-1/2" action={createInvoice} method="post">
        <div className="font-bold text-[50px]">
          By me a coffee
        </div>
        <input name="money" className="p-4 w-full border-black border-2 " placeholder="input number" type="number" />
        <input className="p-3 hover:text-white font-bold hover:bg-blue-500 cursor-pointer mt-3.5 w-max rounded-2xl" readOnly type="submit" value="submit" />
      </form>
    </div>
  );
}


async function createInvoice(formData: FormData) {
  'use server'
  const money: string = formData.get("money") as string
  
  
  const res = await generateToke()
  const res2 = await CreateOrder({ ...res, PayPal_Request_Id: randomUUID(), CreateOrderReq: { currency_code: "", intent: "CAPTURE", value: money || "200" } })

  redirect(`https://www.sandbox.paypal.com/checkoutnow?token=${res2.id}`)
}