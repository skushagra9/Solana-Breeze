"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ReloadIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const { toast } = useToast();
  const [solAmount, setSolAmount] = useState(1);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: text, solana: solAmount }),
      });
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
        toast({
          variant: "destructive",
          title: data.error,
        });

        return;
      }
      console.log(data);
      //show an link to the website, where they can check the transaction
      //show it inside the toast only and also on the main page
      toast({
        title: data.message,
      });
    } catch (error) {
      console.error("Error processing address:", error);
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
      <div className="flex flex-col items-center justify-center w-full max-w-full p-4">
        <Input
          className="w-full lg:w-1/3 border-4 border-indigo-light shadow-sm placeholder:text-muted-foreground rounded-xl mb-4 overflow-hidden focus-visible:outline-none resize-none"
          value={text}
          placeholder="Enter your Solana Account Address"
          onChange={(event) => {
            setText(event.target.value);
          }}
        ></Input>
        <div className="flex items-center mb-4">
          <label className="font-medium text-md lg:p-2 mr-2">
            Enter the amount of SOL you want to send:
          </label>
          <Input
            type="number"
            className="w-1/6 overflow-hidden focus-visible:outline-none resize-none"
            min="0.00"
            value={solAmount}
            onChange={(event) => {
              const newValue = parseFloat(event.target.value);
              console.log(newValue);
              if (newValue >= 0) {
                setSolAmount(newValue);
              } else {
                setSolAmount(0);
              }
            }}
          />
        </div>
        <Button className="font-bold" variant="default" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
