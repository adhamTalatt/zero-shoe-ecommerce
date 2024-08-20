"use client";
import { createBanner } from "@/app/actions";
import SubmitBtn from "@/components/dashboard/SubmitBtn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/utils/uploadthing";
import { bannerSchema } from "@/utils/zodValidtionShemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import Image from "next/image";

import "react-toastify/dist/ReactToastify.css";
const CreateBannerRoute = () => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [lastResult, action] = useFormState(createBanner, undefined);
  console.log(image);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bannerSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-x-4">
        <Button variant={"outline"} size={"icon"} asChild>
          <Link href={"/dashboard/products"}>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tighter">New Banner</h1>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Banner Detatils</CardTitle>
          <CardDescription> Create your banner right here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className=" flex flex-col gap-6">
            <div className=" flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
                placeholder="Create title for Banner"
              />
              <p className="text-red-500">{fields.title.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Image</Label>
              <input
                type="hidden"
                name={fields.imageString.name}
                key={fields.imageString.key}
                defaultValue={image}
              />
              {image === undefined ? (
                <UploadDropzone
                  onClientUploadComplete={(res) => {
                    setImage(res[0].url);
                    toast.success("Upload finished");
                  }}
                  onUploadError={(error: Error) => {
                    toast.success(error?.message);
                  }}
                  endpoint={"imageBannerRoute"}
                />
              ) : (
                <Image
                  src={image}
                  alt="Image"
                  height={200}
                  width={200}
                  className="w-[200px] h-[200px] object-cover border rounded-lg"
                />
              )}
              <p className="text-red-500">{fields.imageString.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitBtn text={"Create Banner"} />
        </CardFooter>
      </Card>
    </form>
  );
};

export default CreateBannerRoute;
