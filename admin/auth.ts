import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      return true;
    },
    async jwt({ token, user }) {
      //   if (!token.sub) return token;

      //   const existingUser = await getUserById(token.sub);
      //   if (!existingUser) return token;

      //   token.role = existingUser.role;

      //   console.log({ token });
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      //   if (token.role && session.user) {
      //     session.user.role = token.role as UserRole;
      //   }
      console.log({ sessionToken: token, session });
      return session;
    },
  },
  ...authConfig,
  session: { strategy: "jwt" },
});
