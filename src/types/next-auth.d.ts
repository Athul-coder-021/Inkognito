// 1️⃣ What is a Type Declaration(.d.ts) file ?
//    TypeScript uses declaration files(.d.ts) to define custom types for third - party libraries like NextAuth.js.

import 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            _id?: string;
            isVerified?: boolean;
            isAcceptingMessages?: boolean;
            username?: string;
        } & DefaultSession['user'];
    }

    interface User {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
    }
}
