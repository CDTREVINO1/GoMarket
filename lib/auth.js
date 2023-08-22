import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "lib/dbConnect";
import User from "models/user";
import { hash, compare } from "bcryptjs";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ username: credentials.user });

        if (!user) {
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          console.log("Invalid username or password");
          throw new Error("Invalid username or password");
        }

        return { username: user.username, email: user.email };
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.username;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token, user }) {
      await dbConnect();

      const dbUser = await User.findOne({ email: token.email });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser._id.toString(),
        username: dbUser.username,
        email: dbUser.email,
      };
    },
  },
};

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}
