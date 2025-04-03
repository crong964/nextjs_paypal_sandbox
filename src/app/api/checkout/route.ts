import { CreateOrder } from "@/service/createOrder";
import { generateToke } from "@/service/generateToke";
import { randomUUID } from "crypto";

///checkout?token=94508835VL562580S&PayerID=CA2H495L2CQ5E
export async function POST(request: Request) {
    const res = await generateToke()
    const res2 = await CreateOrder({ ...res, PayPal_Request_Id: randomUUID(), CreateOrderReq: { currency_code: "", intent: "CAPTURE", value: "200" } })
    return Response.json(res2)
}

export async function GET(request: Request) {

    return Response.json({ "res": "d" })
}