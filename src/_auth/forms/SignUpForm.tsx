import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Spinner } from "flowbite-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createNewUser, signInUser } from "@/lib/appwrite/api";
import { useUserContext } from "@/context/AuthContext";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "The name must be at least 2 characters" }),
  username: z
    .string()
    .min(3, { message: "The username must be at least 3 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "The password must be at least 8 characters" }),
});

const SignUpForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // async function createNewPassword() {
  //   const res = await api.post(apiRoutes.changePassword, watch());
  //   return res.data;
  // }

  // const { mutate, isPending } = useMutation({
  //   mutationFn: createNewPassword,
  //   onSuccess: (data) => {
  //     if (data?.success) {
  //       back();
  //       toast.success("password changed successfully");
  //     } else {
  //       toast.warning("an error occured");
  //     }
  //   },
  //   onError: (error: AxiosError<{ message: string }>) => {
  //     toast.error(error.response?.data.message as string);
  //   },
  // });

  /*{ submit handler }*/

  async function onSubmit(values: z.infer<typeof formSchema>) {
    //Create user.

    const newUser = await createNewUser(values);

    if (!newUser)
      return toast({
        title: "Sign 1 up failed. Please try again",
      });

    //Sign in user.
    const session = await signInUser({
      email: values.email,
      password: values.password,
    });

    if (!session)
      return toast({
        title: "Sign up 2 failed. Please try again",
      });

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({
        title: "Sign up 3 failed. Please try again",
      });
    }
    // console.log("new User:", newUser);
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <div className="text-4xl font-bold">
          <span className="text-gray-50">Pul</span>
          <span className="text-purple-800">se</span>
        </div>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary mt-5">
            {isUserLoading ? (
              <Spinner aria-label="Default status example" />
            ) : (
              "Sign Up"
            )}
          </Button>
          <div className="flex gap-1 text-gray-400">
            <p>already have an account?</p>
            <Link
              className="underline hover:cursor-pointer text-gray-50"
              to="/sign-in"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default SignUpForm;
