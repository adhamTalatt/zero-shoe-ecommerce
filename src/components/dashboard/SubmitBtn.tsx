"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface submitBtnProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}
const SubmitBtn = ({ text, variant }: submitBtnProps) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={variant}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button variant={variant} type="submit">
          {text}
        </Button>
      )}
    </>
  );
};

export default SubmitBtn;
