import axios from "axios";
export interface Token {
    scope: string,
    access_token: string
    app_id: string
    expires_in: string
    nonce: string
    token_type: string
}
export async function generateToke(): Promise<Token> {
    const res = await axios({
        url: process.env.TOKEN,
        method: "post",
        data: "grant_type=client_credentials",
        headers: {
            "Content-Encoding": "application/x-www-form-urlencoded"
        },
        auth: {
            username: process.env.ClientID || "",
            password: process.env.Clientsecret || ""
        }

    })
    return res.data
}