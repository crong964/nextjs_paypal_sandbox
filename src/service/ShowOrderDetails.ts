import axios from "axios";
import { Token } from "./generateToke";
interface OderDetailReq extends Token {
    idOrder: string
}
interface OderDetailRes {
    idOrder: string
    status: string
    intent: string
    payment_source: {
        paypal: {
            name: {
                given_name: string
                surname: string
            },
            email_address: string
            account_id: string
        }
    }
    purchase_units: [
        {
            reference_id: string,
            amount: {
                currency_code: string
                value: string
            }
        }
    ],
    paypal: {
        name: {
            given_name: string
            surname: string
        },
        email_address: string
        account_id: string
    }
}
export async function OderDetail(order: OderDetailReq): Promise<OderDetailRes> {

    const res2 = await axios({
        url: `${process.env.CHECKOUTPAYPAL}/${order.idOrder}`,
        method: "get",
        headers: {
            'Authorization': `${order.token_type} ${order.access_token}`
        }
    })
    return res2.data
}