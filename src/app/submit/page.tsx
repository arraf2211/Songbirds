"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useContext } from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { hashSha256Sync } from "@stacks/encryption"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { BigInput } from "@/components/ui/biginput";
import { BiggerInput } from "@/components/ui/biggerinput";
import { WalletContext } from "@/lib/useWalletContext";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 characters.",
  }),

  preview: z.string().min(1, {
    message: "Preview must be at least 1 characters.",
  }),

  detailed: z.string().min(1, {
    message: "Title must be at least 1 characters.",
  }),

  price: z
    .union([z.number().positive(), z.string().regex(/^\d+(\.\d{1,2})?$/)])
    .refine((value) => {
      // This custom validation function ensures that the value is a positive number
      if (typeof value === 'number') {
        return value >= 0;
      }
      if (typeof value === 'string') {
        const floatValue = parseFloat(value);
        return !isNaN(floatValue) && floatValue >= 0;
      }
      return false;
    }, {
      message: "Price must be a positive number.",
    }),

});

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
    },
  });

  const { postMessage } = useContext(WalletContext)

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    

    postMessage(values.title, parseInt(values.price as string),  hashSha256Sync(new TextEncoder().encode(values.detailed)))
  }

  return (
    <div className="p-10 h-full overflow-hidden">
  {/* <hr style={{ color: "", backgroundColor: "grey", height: 1 }} /> */}
  <div className="flex justify-center h-full py-10 overflow-x-hidden overflow-y-auto ">
    <div className="flex-1 pr-10">
      <h1 className="text-2xl font-semibold mb-4">Submit Your Story</h1>
      <p className="text-gray-600 mb-8">
        Share your important story with the world and contribute to our mission of upholding honesty and integrity.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Story Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Story Title"
                    {...field}
                    onChange={field.onChange}
                    className="text-black outline-"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Story Preview */}
          <FormField
            control={form.control}
            name="preview"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preview</FormLabel>
                <FormControl>
                  <BigInput
                    placeholder="Story Preview"
                    {...field}
                    onChange={field.onChange}
                    className="text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Price"
                    type="number"
                    step="0.01"
                    {...field}
                    onChange={field.onChange}
                    className="text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Evidence Upload */}
          {/* <FormField
            control={form.control}
            name="evidence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Evidence</FormLabel>
                <FormControl>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input id="evidence" type="file" />
                  </div>
                </FormControl>
                <FormDescription>
                  Attach any supporting evidence (optional).
                </FormDescription>
              </FormItem>
            )}
          /> */}
        </form>
      </Form>
    </div>

    <div className="flex-1">
      <h2 className="text-xl font-semibold mb-4">Story Details</h2>
      <p className="text-gray-600 mb-8">
        Provide a comprehensive description of your story. Your voice matters in our fight against misinformation.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Story Description */}
          <FormField
            control={form.control}
            name="detailed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <BiggerInput
                    placeholder="Your story in more detail"
                    {...field}
                    onChange={field.onChange}
                    className="text-black"
                  />
                </FormControl>
                <FormDescription>
                  Provide a detailed description of your story.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" variant="ghost">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  </div>
  
</div>

  );
}
