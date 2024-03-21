for i in $(seq 3); do 
  SIGNER="signer-${i}.json"
  PUBKEY=$(solana-keygen pubkey "$SIGNER")
  spl-token transfer token-address 5000 "$PUBKEY"
done


