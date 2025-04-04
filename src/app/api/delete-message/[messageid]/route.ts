import UserModel from '@/model/User';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbConnect';
import { authOptions } from '../../auth/[...nextauth]/options';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }

    // Extract message ID from request URL
    const urlParts = req.nextUrl.pathname.split('/');
    const messageid = urlParts[urlParts.length - 1];

    if (!messageid) {
        return NextResponse.json(
            { message: 'Message ID is required', success: false },
            { status: 400 }
        );
    }

    try {
        const updateResult = await UserModel.updateOne(
            { _id: session.user._id },
            { $pull: { messages: { _id: messageid } } }
        );

        if (updateResult.modifiedCount === 0) {
            return NextResponse.json(
                { message: 'Message not found or already deleted', success: false },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Message deleted', success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting message:', error);
        return NextResponse.json(
            { message: 'Error deleting message', success: false },
            { status: 500 }
        );
    }
}
