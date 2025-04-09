"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signUp,signInParams } from "@/lib/actions/auth.action";

const authFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === "sign-up"
        ? z.string().min(1, { message: "Name is required" })
        : z.string().optional(),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password is required" }),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-in") {
        // toast.success("Sign in successful!");
        const { email, password } = values;
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const idToken = await userCredential.user.getIdToken();

        if(!idToken) {
          toast.error("Something went wrong. Please try again.sign in failed");
          return;
        }

        await signInParams({
          email,
          idToken,
        })

        toast.success("Sign in successful!");
        router.push("/");

      } else if (type === "sign-up") {
        // Sign up logic here
        // Sign in logic here
        const { name, email, password } = values;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          email,
          name: name!,
          password,
        });

        if (!result.sucess) {
          toast.error(result.message);
          return;
        }
        toast.success("User created successfully");

        console.log("Sign in values", values);
        router.push("/sign-in");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  const isSignIn = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src={"/logo.svg"} alt="logo" height={32} width={32} />
          <h2 className="text-primary-100">Voicee</h2>
        </div>
        <h3>Practice Job Interview with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4 w-full form"
          >
            {!isSignIn && (
              <FormField
                name="name"
                control={form.control}
                label="Name"
                placeholder="Enter your name"
                type="text"
              />
            )}
            {form.formState.errors.name && (
              <p className="text-destructive-100 text-sm">
                {form.formState.errors.name.message}
              </p>
            )}
            <FormField
              name="email"
              control={form.control}
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            {form.formState.errors.email && (
              <p className="text-destructive-100 text-sm">
                {form.formState.errors.email.message}
              </p>
            )}
            <FormField
              name="password"
              control={form.control}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            {form.formState.errors.password && (
              <p className="text-destructive-100 text-sm">
                {form.formState.errors.password.message}
              </p>
            )}
            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create account"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "No Account Yet? " : "Have an account already? "}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-shadow-primary-100 ml-1"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
