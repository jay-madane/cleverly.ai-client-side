import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { Download, Image as img } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from 'react-router-dom';
import toast from "react-hot-toast";

import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import { useProModal } from "@/hooks/use-pro-modal";

import { amountOptions, formSchema, resolutionOptions } from "../constants/image-constants";
import { domainUrl } from "@/domain";
import { useAuth } from '@clerk/clerk-react';
import { useRefresh } from "@/context/refresh-context";

const ImagePage = () => {
    const { getToken } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const proModal = useProModal();
    const { setRefresh } = useRefresh();
    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);

            const token = await getToken();

            const response = await axios.post(`${domainUrl}/api/image`, values, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const urls = response.data.map((image: { url: string }) => image);

            setImages(urls);
            setRefresh(true);
            form.reset();

        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error("Something went wrong");
                console.log(error);
            }
        } finally {
            navigate(location.pathname);
        }
    };

    return (
        <div>
            <Heading
                title="AI Image Creation"
                description="The most advanced AI Image creation tool for your wide and vivid imagination."
                icon={img}
                iconColor="text-yellow-500"
                bgColor="bg-yellow-600/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-6">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outine-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="An Image of a cat sitting in front of a fireplace, with the sun setting behind it..."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} />
                            <FormField name="amount" control={form.control} render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {amountOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )} />
                            <FormField name="resolution" control={form.control} render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {resolutionOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )} />
                            <Button className="col-span-12 lg:col-span-2 w-full bg-stone-600" disabled={isLoading}>Create</Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-20">
                            <Loader />
                        </div>
                    )}

                    {images.length === 0 && !isLoading && (
                        <Empty label="Create new images by typing in a prompt above." />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((source, index) => (
                            <Card key={index} className="rounded-lg overflow-hidden">
                                <div className="relative aspect-square">
                                    <img
                                        alt="Image"
                                        src={source}
                                    />
                                </div>
                                <CardFooter className="p-2">
                                    <Button onClick={() => window.open(source)} variant="secondary" className="w-full">
                                        <Download className="h-4 w-4 mr-2" />
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImagePage;