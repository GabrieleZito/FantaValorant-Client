import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectUser } from "@/redux/slices/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountSchema, type AccountType } from "@/zod/AccountSchema";

export function Account() {
    const user = useAppSelector(selectUser);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AccountType>({
        resolver: zodResolver(AccountSchema),
        defaultValues: {
            username: user?.username || "",
            email: user?.email || "",
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            bio: user?.bio || "",
            birthday: user?.birthday ? new Date(user.birthday).toISOString().slice(0, 10) : "",
            propic: user?.propic || "",
        },
    });

    const onSubmit = (data: AccountType) => {
        // TODO: handle update logic (API call)
        alert("Account updated!\n" + JSON.stringify(data, null, 2));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-[60vh] w-full flex-col items-center justify-center p-4" autoComplete="off">
            <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-lg bg-white/10 p-8 shadow-md">
                <img src={user?.propic || "/default-avatar.png"} alt="Profile" className="mb-2 h-24 w-24 rounded-full border border-gray-300 object-cover" />
                <Input type="text" {...register("propic")} placeholder="Profile picture URL" className="mb-2" />
                {errors.propic && <p className="text-xs text-red-500">{errors.propic.message}</p>}

                <Input type="text" {...register("username")} placeholder="Username" className="mb-2" />
                {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}

                <Input type="email" {...register("email")} placeholder="Email" className="mb-2" />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}

                <div className="flex w-full gap-2">
                    <Input type="text" {...register("firstName")} placeholder="First Name" className="mb-2" />
                    <Input type="text" {...register("lastName")} placeholder="Last Name" className="mb-2" />
                </div>
                {(errors.firstName || errors.lastName) && (
                    <div className="flex w-full gap-2">
                        {errors.firstName && <p className="w-full text-xs text-red-500">{errors.firstName.message}</p>}
                        {errors.lastName && <p className="w-full text-xs text-red-500">{errors.lastName.message}</p>}
                    </div>
                )}

                <Input type="date" {...register("birthday")} placeholder="Birthday" className="mb-2" />
                {errors.birthday && <p className="text-xs text-red-500">{errors.birthday.message}</p>}

                <textarea
                    {...register("bio")}
                    placeholder="Bio"
                    className="mb-2 min-h-15 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-xs"
                />
                {errors.bio && <p className="text-xs text-red-500">{errors.bio.message}</p>}

                <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    );
}
