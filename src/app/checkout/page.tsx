import { ConfirmPayment } from "@/service/confirmpaymentsource"
import { generateToke } from "@/service/generateToke"
import { OderDetail } from "@/service/ShowOrderDetails"

export default async function CheckOutPage({
    params, searchParams,
}: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ token: string, PayerID: string }>
}) {
    const token = await generateToke()
    const id = (await searchParams).token
    const order = await OderDetail({ ...token, idOrder: id })
    const s = await ConfirmPayment({ ...token, id: id })
    return <div>{JSON.stringify(s)}</div>
}