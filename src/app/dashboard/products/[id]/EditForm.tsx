"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { $Enums, Product } from "@prisma/client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadDropzone } from "@/utils/uploadthing";
import { SubmitBtn } from "@/components/SubmitBtn";
import { ChevronLeft, XIcon } from "lucide-react";
import { useFormState } from "react-dom";
import { updateProduct } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { productSchema } from "@/utils/zodValidtionShemas";
import { parseWithZod } from "@conform-to/zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

interface EditFormProps {
  data: {
    id: string;
    name: string;
    description: string;
    status: $Enums.ProductStatus;
    price: number;
    images: string[];
    category: $Enums.Category;
    isFeatured: boolean;
  };
}

const EditForm = ({ data }: EditFormProps) => {
  const [images, setImages] = useState<string[]>(data.images);
  const [lastResult, action] = useFormState(updateProduct, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <input type="hidden" name="productId" value={data.id} />
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Update Product</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            In this form you can update your product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={data.name}
                type="text"
                className="w-full"
                placeholder="Product Name"
              />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={data.description}
                placeholder="Write your description right here..."
              />
            </div>
            <p className="text-red-500">{fields.description.errors}</p>
            <div className="flex flex-col gap-3">
              <Label>Price</Label>
              <Input
                key={fields.price.key}
                name={fields.price.name}
                defaultValue={data.price}
                type="number"
                placeholder="$55"
              />
              <p className="text-red-500">{fields.price.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Featured Product</Label>
              <Switch
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                defaultChecked={data.isFeatured}
              />
              <p className="text-red-500">{fields.isFeatured.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={data.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.status.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>category</Label>
              <Select
                key={fields.categery.key}
                name={fields.categery.name}
                defaultValue={data.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="man">Man</SelectItem>
                  <SelectItem value="women">Women</SelectItem>
                  <SelectItem value="kids">Kids</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.categery.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type={"hidden"}
                value={images}
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={fields.images.initialValue as any}
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((img, index) => {
                    return (
                      <div
                        key={index}
                        className=" relative w-[100px] h-[100px]"
                      >
                        <Image
                          src={img}
                          alt="Product Image"
                          height={100}
                          width={100}
                          className="w-full h-full object-cover rounded-lg border"
                        />
                        <button
                          onClick={() => handleDelete(index)}
                          className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                        >
                          <XIcon className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url));
                    toast.success("Finished uploading");
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    toast.success(error?.message);
                  }}
                />
              )}
              <p className="text-red-500">{fields.images.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitBtn text={"Update Product"} />
        </CardFooter>
      </Card>
    </form>
  );
};

export default EditForm;
