import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { Video } from "lucide-react";
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
import { useProModal } from "@/hooks/use-pro-modal";
import { domainUrl } from "@/domain";
import { useAuth } from '@clerk/clerk-react';
import { useRefresh } from "@/context/refresh-context";

const formSchema = z.object({
    prompt: z.string().min(1, {
        message: 'Prompt must be at least one character long',
    }),
});

const VideoPage = () => {
    const { getToken } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const proModal = useProModal();
    const { setRefresh } = useRefresh();
    const [video, setVideo] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined);

            const token = await getToken();

            const response = await axios.post(`${domainUrl}/api/video`, values, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setVideo(response.data[0]);
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
        <div className="pb-10">
            <Heading
                title="AI Video Creation"
                description="Generate videos with powerful AI models."
                icon={Video}
                iconColor="text-orange-500"
                bgColor="bg-orange-600/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outine-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Horse racing..."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} />
                            <Button className="col-span-12 lg:col-span-2 w-full bg-stone-600" disabled={isLoading}>Create</Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 w-full flex items-center justify-center">
                            <Loader />
                        </div>
                    )}

                    {!video && !isLoading && (
                        <Empty label="Create videos by typing in prompts above." />
                    )}

                    {video && (
                        <video controls className="w-full aspect-video mt-8 rounded-lg border bg-black">
                            <source src={video} />
                        </video>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoPage;