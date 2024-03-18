export async function POST(request: Request, response: Response) {
    try {
        const {address, solana} = await request.json();
     
        //check if address exists
       
        //addressExists
        if (true) {
            //pass in the logic to give the sol tokens to the particular address
            return Response.json({ message: "Success" });
        } else {
            return Response.json({ error: "Address is Invalid" });
        }
    } catch (error) {
        return Response.json({ error: error });
    }
}