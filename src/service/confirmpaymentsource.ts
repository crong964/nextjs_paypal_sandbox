import axios from "axios";
import { Token } from "./generateToke";
interface iCreateOrder extends Token {

    id: string
}
export async function ConfirmPayment(res: iCreateOrder): Promise<Token> {


    const res2 = await axios({
        url: `${process.env.CHECKOUTPAYPAL}/${res.id}/capture`,
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${res.token_type} ${res.access_token}`
        }
    })

    return res2.data
}