import { authOptions } from "lib/auth";
import { getServerSession } from "next-auth/next";
import { hashPassword, verifyPassword } from "lib/auth";
import dbConnect from "lib/dbConnect";
import User from "models/user";

export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);
    const data = await request.json();

    if (!session)
      return new Response(JSON.stringify({ message: "Not authenticated!" }), {
        status: 401,
      });

    const username = session.user.name;
    const { oldPassword, newPassword } = data;

    await dbConnect();

    const user = await User.findOne({ username: username });

    if (!user)
      return new Response(JSON.stringify({ message: "User not found." }), {
        status: 404,
      });

    const currentPassword = user.password;

    const passwordsAreEqual = await verifyPassword(
      oldPassword,
      currentPassword
    );

    if (!passwordsAreEqual)
      return new Response(JSON.stringify({ message: "Invalid password." }), {
        status: 403,
      });

    if (!newPassword || newPassword.trim().length < 7)
      return new Response(
        JSON.stringify({
          message:
            "Invalid input - new password should also be at least 7 characters long.",
        }),
        { status: 422 }
      );

    const hashedPassword = await hashPassword(newPassword);

    const result = await User.updateOne(
      { username: username },
      { $set: { password: hashedPassword } }
    );

    return new Response(JSON.stringify({ message: "Password updated." }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error }), { status: 422 });
  }
}
