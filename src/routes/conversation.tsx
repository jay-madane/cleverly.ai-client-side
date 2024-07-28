import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from 'react-router-dom';
import toast from "react-hot-toast";
import { useAuth } from '@clerk/clerk-react';

import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { cn } from "@/lib/utils";
import { useProModal } from "@/hooks/use-pro-modal";
import { domainUrl } from "@/domain";
import { useRefresh } from '@/context/refresh-context';

const formSchema = z.object({
    prompt: z.string().min(1, {
        message: 'Prompt must be at least one character long',
    }),
});

interface ChatCompletionRequestMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    name?: string;
}

const ConversationPage = () => {
    const { getToken } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const proModal = useProModal();
    const { setRefresh } = useRefresh();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionRequestMessage = {
                role: "user",
                content: values.prompt,
            };
            const newMessages = [...messages, userMessage];
            setMessages(newMessages);

            const token = await getToken();

            const response = await axios.post(`${domainUrl}/api/conversation`, {
                messages: newMessages,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const botMessage: ChatCompletionRequestMessage = {
                role: "assistant",
                content: response.data,
            };

            setMessages((current) => [...current, botMessage]);
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
    }

    return (
        <div>
            <Heading
                title="AI Conversation"
                description="The most advanced AI conversation tool for your curiosity."
                icon={MessageCircle}
                iconColor="text-sky-500"
                bgColor="bg-sky-500/10"
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
                                            placeholder="How far is the Moon from the Earth?"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} />
                            <Button className="col-span-12 lg:col-span-2 w-full bg-stone-600" disabled={isLoading}>Ask</Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 w-full flex items-center justify-center">
                            <Loader />
                        </div>
                    )}

                    {messages.length === 0 && !isLoading && (
                        <Empty label="Start a new conversation by typing in a prompt above." />
                    )}

                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}
                            >
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <p className="text-sm">{message.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConversationPage;