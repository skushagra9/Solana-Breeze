import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export async function POST(request: Request, response: Response) {
  const solanaConnection = new Connection("https://api.devnet.solana.com");
  try {
    const { address, solana } = await request.json();

    const newaddress = new PublicKey(address)
    const accountInfo = await solanaConnection.getAccountInfo(newaddress);
    console.log(accountInfo)
    if (!accountInfo) {
      return Response.json({ error: "Address does not exist" });
    }

    const airdropSignature = await solanaConnection.requestAirdrop(
        newaddress,
      solana * LAMPORTS_PER_SOL
    );
    console.log(airdropSignature)
    try {
      const txId = airdropSignature;
    //   console.log(`Airdrop Transaction Id: ${txId}`);
    //   console.log(`https://explorer.solana.com/tx/${txId}?cluster=devnet`);
      return Response.json({
        message: "Success",
        id: `Airdrop Transaction Id: ${txId}`,
        url: `https://explorer.solana.com/tx/${txId}?cluster=devnet`,
      });
    } catch (err) {
      return Response.json({ error: "err" });
    }
  } catch (error) {
    return Response.json({ error: 'error' });
  }
}
