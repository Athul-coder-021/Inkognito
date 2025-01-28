import { Message } from "@/model/User";

export interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean; //not always send
    messages?: Array<Message>; //not always send
}