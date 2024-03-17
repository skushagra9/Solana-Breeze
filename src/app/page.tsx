"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ReloadIcon, ArrowRightIcon, SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes"

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const { toast } = useToast();
  const [solAmount, setSolAmount] = useState(0);
  const { setTheme } = useTheme()

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
          title: data.error
        })
   
        return;
      }
      console.log(data)
      //show an link to the website, where they can check the transaction
      //show it inside the toast only and also on the main page
      toast({
        title: data.message
      })
    } catch (error) {
      console.error("Error processing address:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 md:p-8 mt-44">
      <span className="font-heading font-bold flex flex-col justify-center items-center subpixel-antialiased font-semibold  text-5xl md:text-7xl p-4">
        Solana Breeze
        <span className="font-medium text-xl md:text-2xl p-2">
          Your Premier Destination for Exclusive Solana Airdrops!
        </span>
      </span>
      <div className="relative w-full md:w-1/3 max-w-full p-4">
        <div className="relative border-4 border-indigo-light shadow-sm placeholder:text-muted-foreground rounded-xl mb-4">
          <Input
            className="overflow-hidden focus-visible:outline-none resize-none resize-none w-full"
            value={text}
            placeholder="Enter your Solana Account Address"
            onChange={(event) => {
              setText(event.target.value);
            }}
          ></Input>
          
          <Button
            className="absolute right-0 bottom-0 hover:text-indigo-600 transition-colors"
            size="icon"
            variant="ghost"
            onClick={handleSubmit}
          >
            {" "}
            <ArrowRightIcon />
          </Button>
        </div>
        <Input
            type="number"  
            min={0}
            className="overflow-hidden focus-visible:outline-none resize-none w-1/4"
            value={solAmount}
            onChange={(event) => setSolAmount(parseInt(event.target.value, 10))}
          />
      </div>
      <Button variant="ghost" size="icon" onClick={() => setTheme("light")}>
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    </div>
  );
}
