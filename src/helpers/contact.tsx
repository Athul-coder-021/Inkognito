'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { Separator } from '@/components/ui/separator';

// Define Zod schema
const MessageSchema = z.object({
    message: z.string().min(10, 'Message must be of min 10 characters').max(500, 'Message too long'),
});

export default function Contact({ username }: { username: string }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(MessageSchema),
    });
    const { toast } = useToast();

    const onSubmit = async (data: any) => {
        try {
            // Check if user accepts messages
            const acceptResponse = await axios.get<ApiResponse>('/api/accept-messages');
            if (!acceptResponse.data.isAcceptingMessages) {
                toast({
                    title: 'User is not accepting messages right now.',
                    variant: 'destructive',
                });
                return;
            }

            // Send the message
            const response = await axios.post<ApiResponse>('/api/send-message', {
                username,
                content: data.message,
            });

            toast({
                title: response.data.message,
                variant: 'default',
            });

            reset(); // Clear textarea after submission
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: 'Error',
                description: axiosError.response?.data.message ?? 'Failed to send message',
                variant: 'destructive',
            });
        }
    };

    return (
        <>
        <form className="w-full max-w-5xl" onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-15'>
                <label htmlFor='name' className='mb-3 block text-base font-bold text-black'>
                    Send Anonymous Message to {username}
                </label>
            </div>

            <div className='mb-5'>
                <textarea
                    rows={5}
                    placeholder='Type your message'
                    className='w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
                    {...register('message')}
                ></textarea>
                {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.message?.message && typeof errors.message.message === 'string'
                            ? errors.message.message
                            : ''}
                    </p>

                )}
            </div>

            <div>
                <button className='hover:shadow-form rounded-md bg-white border py-3 px-8 text-base font-semibold outline-none text-gray-700'>
                    Submit
                </button>   
            </div>
        </form>
       {/* <Separator className="my-6" /> */}
       </>

    );
}
