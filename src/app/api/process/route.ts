import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { InputCheck } from "@/app/utils/schema";

export async function POST(request: Request, response: Response) {
  const solanaConnection = new Connection("https://api.devnet.solana.com");
  try {
    const { address, solana } = await request.json();
    const isAddress = InputCheck.parse(address);
    const newaddress = new PublicKey(isAddress);
    const accountInfo = await solanaConnection.getAccountInfo(newaddress);
    console.log(accountInfo);
    if (!accountInfo) {
      return Response.json({ error: "Address does not exist" });
    }

    const airdropSignature = await solanaConnection.requestAirdrop(
      newaddress,
      solana * LAMPORTS_PER_SOL
    );
    return Response.json({
      message: "Success",
      id: `Airdrop Transaction Id: ${airdropSignature}`,
      url: `https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`,
    });
  } catch (error) {
    return Response.json({ error: "error" });
  }
}
