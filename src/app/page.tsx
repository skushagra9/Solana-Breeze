"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const { toast } = useToast();
  const [solAmount, setSolAmount] = useState(1);
  const [url, setUrl] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: text, solana: solAmount }),
      });
      const data = await response.json();
      if (data.error) {
        console.log("this is", data.error);
        toast({
          variant: "destructive",
          title: data.error,
        });

        return;
      }
      setUrl(data.url);
      toast({
        title: "Success",
        description: data.id,
      });
    } catch (error) {
      console.error("Error processing address:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center p-4 md:p-8 mt-44">
      <span className="font-heading font-bold flex flex-col justify-center items-center subpixel-antialiased font-semibold  text-6xl md:text-7xl p-4">
        Solana Breeze
        <span className="font-medium text-center subpixel-antialiased text-xl md:text-2xl p-2">
          Your Premier Destination for Exclusive Solana Airdrops!
        </span>
      </span>
      {/* make all of this below - appear in a card component 
      and implement zod validation
      */}
      <div className="flex flex-col items-center justify-center w-full max-w-full p-4">
        <Input
          className="w-full lg:w-1/3 border-4 border-indigo-light shadow-sm placeholder:text-muted-foreground rounded-xl mb-4 overflow-hidden focus-visible:outline-none resize-none"
          value={text}
          placeholder="Enter your Solana Account Address"
          onChange={(event) => {
            setText(event.target.value);
          }}
        ></Input>
        <div className="flex justify-center mb-4 items-center">
          <label className="font-medium text-center text-md lg:p-2 mr-2">
            Enter the amount of SOL you want to send:
          </label>
          <Input
            type="number"
            className="w-1/6 overflow-hidden focus-visible:outline-none resize-none"
            min="0.00"
            value={solAmount}
            onChange={(event) => {
              const newValue = parseFloat(event.target.value);

              if (newValue >= 0) {
                setSolAmount(newValue);
              } else {
                setSolAmount(0);
              }
            }}
          />
        </div>
        <Button className="font-bold" variant="default" onClick={handleSubmit}>
          {loading ? (
            <ReloadIcon className="h-6 w-6 animate-spin mr-2" />
          ) : (
            "Devnet"
          )}
        </Button>
        {url && (
          <div className="mt-4 text-center">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {url}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
