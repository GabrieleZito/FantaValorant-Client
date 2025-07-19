import { useState } from "react";
import { get, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "../../zod/UserSchema";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import userAPI from "../../API/userAPI";
import { setUser } from "../../redux/slices/userSlice";

export function SignIn() {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <>
            <section className="flex flex-col items-center justify-center w-full bg-white/30">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-xl">
                    <div className="w-full bg-white rounded-lg dark:border dark:border-gray-700 dark:bg-gray-800">
                        <div className="p-6 space-y-4 sm:p-8 md:space-y-6">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                {isLogin ? "Sign in to your account" : "Create an account"}
                            </h1>
                            {isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <RegisterForm setIsLogin={setIsLogin} />}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function LoginForm({ setIsLogin }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginSchema = UserSchema.pick({
        email: true,
        password: true,
    });

    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors },
    } = useForm({ resolver: zodResolver(loginSchema) });

    const sendLogin = useMutation({
        mutationFn: userAPI.login,
        mutationKey: ["login"],
        onSuccess: (response) => {
            dispatch(setUser(response.data));
            navigate("/dashboard");
        },
        onError: (err) => {
            console.log(err);
        },
        retry: false,
    });

    const login = () => {
        sendLogin.mutate({
            email: getValues("email"),
            password: getValues("password"),
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(login)} className="space-y-4 md:space-y-6">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your email
                    </label>
                    <input
                        {...register("email")}
                        type="email"
                        id="email"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="name@company.com"
                        required
                    />
                    {errors.email ? <p className="mt-2 text-sm text-red-500"> {errors.email.message} </p> : ""}
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                    </label>
                    <input
                        {...register("password")}
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        required
                    />
                    {errors.password ? <p className="mt-2 text-sm text-red-500">{errors.password.message}</p> : ""}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                aria-describedby="remember"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                                required=""
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <a href="#" className="text-sm font-medium hover:underline">
                        Forgot password?
                    </a>
                </div>

                <button className="w-full rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:cursor-pointer hover:bg-red-600 focus:ring-4 focus:ring-neutral-300 focus:outline-none dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800">
                    Sign In
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <a href="#" className="font-medium text-red-500 hover:underline" onClick={() => setIsLogin((x) => !x)}>
                        Sign up
                    </a>
                </p>
            </form>
        </>
    );
}

function RegisterForm({ setIsLogin }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const registerSchema = UserSchema;
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors },
    } = useForm({ resolver: zodResolver(registerSchema) });

    const sendRegistration = useMutation({
        mutationFn: userAPI.register,
        mutationKey: ["registration"],
        onSuccess: (response) => {
            /* console.log("Response from registration");
            console.log(response); */
            dispatch(setUser(response.data));
            navigate("/dashboard");
        },
        onError: (err) => {
            const field = err.response.data.data.field
            const message = err.response.data.message
            console.log(message);
            // messaggi di errore di sequelize
            /* const error = err.response.data.message.errors[0].message;
            const fieldObj = err.response.data.message.fields;
            const field = Object.keys(fieldObj)[0];
            console.log("Error: " + error);
            console.log("Field: " + field); */
            setError(field, { message: message});
        },
        retry: false,
    });

    const registerUser = () => {
        //console.log("Register");
        sendRegistration.mutate({
            firstName: getValues("firstName"),
            lastName: getValues("lastName"),
            username: getValues("username"),
            email: getValues("email"),
            password: getValues("password"),
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(registerUser)} className="space-y-4 md:space-y-6" noValidate>
                <div className="flex flex-row gap-2">
                    <div className="w-full">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Name
                        </label>
                        <input
                            {...register("firstName")}
                            type="text"
                            id="firstName"
                            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Mario"
                            required
                        />
                        {errors.firstName ? <p className="mt-2 text-sm text-red-500">{errors.firstName.message}</p> : ""}
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Last Name
                        </label>
                        <input
                            {...register("lastName")}
                            type="text"
                            id="lastName"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Rossi"
                            required
                        />
                        {errors.lastName ? <p className="mt-2 text-sm text-red-500">{errors.lastName.message}</p> : ""}
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Username
                    </label>
                    <input
                        {...register("username")}
                        type="text"
                        id="username"
                        className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="someusername123"
                        required
                    />
                    {errors.username ? <p className="mt-2 text-sm text-red-500">{errors.username.message}</p> : ""}
                </div>

                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your email
                    </label>
                    <input
                        {...register("email")}
                        type="email"
                        id="email"
                        className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="name@company.com"
                        required
                    />
                    {errors.email ? <p className="mt-2 text-sm text-red-500">{errors.email.message}</p> : ""}
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                    </label>
                    <input
                        {...register("password")}
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        required
                    />
                    {errors.password ? <p className="mt-2 text-sm text-red-500">{errors.password.message}</p> : ""}
                </div>

                <div>
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Confirm password
                    </label>
                    <input
                        {...register("repeatPassword")}
                        type="password"
                        id="confirm-password"
                        placeholder="••••••••"
                        className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        required
                    />
                    {errors.repeatPassword ? <p className="mt-2 text-sm text-red-500">{errors.repeatPassword.message}</p> : ""}
                </div>
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            aria-describedby="terms"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                            required
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                            I accept the{" "}
                            <a className="font-medium text-primary-600 dark:text-primary-500 hover:underline" href="#">
                                Terms and Conditions
                            </a>
                        </label>
                    </div>
                </div>

                <button className="w-full rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:cursor-pointer hover:bg-red-600 focus:ring-4 focus:ring-neutral-300 focus:outline-none dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800">
                    Create an account
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <a href="#" className="font-medium text-red-500 hover:underline" onClick={() => setIsLogin((x) => !x)}>
                        Login here
                    </a>
                </p>
            </form>
        </>
    );
}
