import { hashPassword } from "lib/auth";
import dbConnect from "lib/dbConnect";
import User from "models/user";

export async function POST(request) {
  try {
    await dbConnect();

    const data = await request.json();
    const { username, password, email } = data;

    if (
      !email ||
      !email.includes("@") ||
      !username ||
      !password ||
      password.trim().length < 7
    ) {
      return new Response(
        JSON.stringify({
          message:
            "Invalid input - password should also be at least 7 characters long.",
        }),
        { status: 422 }
      );
    }

    const hashedPassword = await hashPassword(password);

    let user = await User.find({
      $or: [{ username: username }, { email: email }],
    });

    if (user.length >= 1) {
      return new Response(
        JSON.stringify({ message: "Email or username already exists." }),
        { status: 409 }
      );
    } else {
      user = new User({
        username: username,
        password: hashedPassword,
        email: email,
      });
      user.save();
      console.log(user);
      return new Response(JSON.stringify({ message: "User created." }), {
        status: 201,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error }), { status: 422 });
  }
}
