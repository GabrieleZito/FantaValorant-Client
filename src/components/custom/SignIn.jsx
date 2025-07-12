import { useState } from "react";

export function SignIn() {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <>
            <section className="flex w-full flex-col items-center justify-center bg-white/30">
                <div class="mx-auto flex w-xl flex-col items-center justify-center px-6 py-8">
                    <div class="w-full rounded-lg bg-white dark:border dark:border-gray-700 dark:bg-gray-800">
                        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
                            <h1 class="text-xl leading-tight font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                {isLogin ? "Sign in to your account" : "Create an account"}
                            </h1>
                            <form class="space-y-4 md:space-y-6" action="#">
                                {isLogin ? (
                                    ""
                                ) : (
                                    <>
                                        <div className="flex flex-row gap-2">
                                            <div className="w-full">
                                                <label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                    placeholder="Mario"
                                                    required=""
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"
                                                    class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                    placeholder="Rossi"
                                                    required=""
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                name="username"
                                                id="username"
                                                class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                placeholder="someusername123"
                                                required=""
                                            />
                                        </div>
                                    </>
                                )}
                                <div>
                                    <label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                        placeholder="name@company.com"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label for="password" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                        required=""
                                    />
                                </div>
                                {isLogin ? (
                                    ""
                                ) : (
                                    <>
                                        <div>
                                            <label for="confirm-password" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                                Confirm password
                                            </label>
                                            <input
                                                type="confirm-password"
                                                name="confirm-password"
                                                id="confirm-password"
                                                placeholder="••••••••"
                                                class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                required=""
                                            />
                                        </div>
                                        <div class="flex items-start">
                                            <div class="flex h-5 items-center">
                                                <input
                                                    id="terms"
                                                    aria-describedby="terms"
                                                    type="checkbox"
                                                    class="focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-3 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                                                    required=""
                                                />
                                            </div>
                                            <div class="ml-3 text-sm">
                                                <label for="terms" class="font-light text-gray-500 dark:text-gray-300">
                                                    I accept the{" "}
                                                    <a class="text-primary-600 dark:text-primary-500 font-medium hover:underline" href="#">
                                                        Terms and Conditions
                                                    </a>
                                                </label>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {isLogin ? (
                                    <>
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-start">
                                                <div class="flex h-5 items-center">
                                                    <input
                                                        id="remember"
                                                        aria-describedby="remember"
                                                        type="checkbox"
                                                        class="h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                                                        required=""
                                                    />
                                                </div>

                                                <div class="ml-3 text-sm">
                                                    <label for="remember" class="text-gray-500 dark:text-gray-300">
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>
                                            <a href="#" class="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </>
                                ) : (
                                    ""
                                )}
                                <button
                                    type="submit"
                                    class="w-full rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:cursor-pointer hover:bg-red-600 focus:ring-4 focus:ring-neutral-300 focus:outline-none dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800"
                                >
                                    {isLogin ? "Sign In" : "Create an account"}
                                </button>
                                {isLogin ? (
                                    <>
                                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Don’t have an account yet?{" "}
                                            <a
                                                href="#"
                                                class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                                                onClick={() => setIsLogin((x) => !x)}
                                            >
                                                Sign up
                                            </a>
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Already have an account?{" "}
                                            <a href="#" class="font-medium text-red-500 hover:underline" onClick={() => setIsLogin((x) => !x)}>
                                                Login here
                                            </a>
                                        </p>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
