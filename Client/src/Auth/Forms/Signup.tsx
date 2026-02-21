import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signup } from "@/lib/api";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  fullname: z
    .string()
    .min(3, "Full name must be at least 3 characters.")
    .max(50, "Full name must be at most 50 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters."),
});

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const status = await signup(data);

      if (status) {
        toast.success("Account created successfully 🎉");
        navigate("/");
      } else {
        toast.error("Failed to create account. Try again.");
      }
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-gray-900 to-black px-4">
      <Card className="w-full max-w-md bg-gray-900/80 backdrop-blur border-gray-800 shadow-2xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold text-white">
            Create Account
          </CardTitle>
          <CardDescription className="text-gray-400">
            Join us today and get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="signup-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FieldGroup>
              {/* Full Name */}
              <Controller
                name="fullname"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-300">
                      Full Name
                    </FieldLabel>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="John Doe"
                      autoComplete="off"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-300">
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      disabled={loading}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-300">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      disabled={loading}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            form="signup-form"
            disabled={loading}
            className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold flex items-center justify-center gap-2"
          >
            {loading && <Spinner className="h-4 w-4 animate-spin" />}
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            disabled={loading}
            onClick={() => form.reset()}
            className="text-gray-400 hover:text-white"
          >
            Reset
          </Button>

          <p className="text-gray-300 text-sm">Already have an account? <Link to={'/sign-in'}><span className="text-white">Login</span></Link></p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;