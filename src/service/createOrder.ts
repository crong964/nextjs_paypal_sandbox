import axios from "axios";
import { Token } from "./generateToke";
interface iCreateOrder extends Token {
    PayPal_Request_Id: string
    CreateOrderReq: {
        intent: "CAPTURE" | "AUTHORIZE"
        currency_code: string,
        value: string
    }
}
export async function CreateOrder(res: iCreateOrder): Promise<{ id: string, status: string }> {

    const res2 = await axios({
        url: process.env.CHECKOUTPAYPAL,
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'PayPal-Request-Id': `${res.PayPal_Request_Id}`,
            'Authorization': `${res.token_type} ${res.access_token}`
        },
        data: JSON.stringify(
            {
                "intent": "CAPTURE",
                application_context: {
                    return_url: process.env.RETURN_URL,
                    cancel_url: process.env.CANCEL_URL,
                    shipping_preference: 'NO_SHIPPING',
                    user_action: 'PAY_NOW',
                    brand_name: 'manfra.io'
                },
                "purchase_units":
                    [
                        {
                            items: [
                                {
                                    name: 'Node.js Complete Course',
                                    description: 'Node.js Complete Course with Express and MongoDB',
                                    quantity: 1,
                                    unit_amount: {
                                        currency_code: 'USD',
                                        value: res.CreateOrderReq.value
                                    }
                                }
                            ], amount: {
                                currency_code: 'USD',
                                value: res.CreateOrderReq.value,
                                breakdown: {
                                    item_total: {
                                        currency_code: 'USD',
                                        value: res.CreateOrderReq.value
                                    }
                                }
                            }
                        }
                    ]
            })
    })
    return res2.data
}