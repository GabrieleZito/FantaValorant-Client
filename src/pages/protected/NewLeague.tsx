import { LeagueSchema } from "@/zod/NewLeagueSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trophy, Coins, Eye, EyeOff } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export function NewLeague() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        control,
    } = useForm({
        resolver: zodResolver(LeagueSchema),
    });
    const isPublic = watch("isPublic");

    const onSubmit = () => {
        console.log("ciao");
    };

    const Page1 = (
        <CardContent className="grid gap-6">
            {/* Name */}
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    placeholder="e.g., Summer Hackathon 2025"
                    autoComplete="off"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                />
                {errors.name && (
                    <p id="name-error" className="text-destructive text-sm">
                        {errors.name.message}
                    </p>
                )}
                <p className="text-muted-foreground text-sm">This will be visible to participants.</p>
            </div>

            {/* Participation Fee */}
            {/* <div className="grid gap-2">
                <Label htmlFor="participationFee">Participation fee</Label>
                <div className="relative">
                    <span className={"text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"} aria-hidden="true">
                        <DollarSign className="h-4 w-4" />
                    </span>
                    <Input
                        id="participationFee"
                        inputMode="decimal"
                        type="number"
                        step="0.01"
                        min="0"
                        className="pl-9"
                        placeholder="0.00"
                        aria-invalid={!!errors.participationFee}
                        aria-describedby={errors.participationFee ? "fee-error" : undefined}
                        {...register("participationFee")}
                    />
                </div>
                {errors.participationFee && (
                    <p id="fee-error" className="text-destructive text-sm">
                        {errors.participationFee.message}
                    </p>
                )}
                <p className="text-muted-foreground text-sm">Set to 0 if the leaderboard is free to join.</p>
            </div> */}

            {/* Coins per user */}
            <div className="grid gap-2">
                <Label htmlFor="coinsPerUser">Number of coins per user</Label>
                <div className="relative">
                    <span className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" aria-hidden="true">
                        <Coins className="h-4 w-4" />
                    </span>
                    <Input
                        id="coinsPerUser"
                        type="number"
                        inputMode="numeric"
                        min="1"
                        step="1"
                        className="pl-9"
                        placeholder="100"
                        aria-invalid={!!errors.coinsPerUser}
                        aria-describedby={errors.coinsPerUser ? "coins-error" : undefined}
                        {...register("coinsPerUser")}
                    />
                </div>
                {errors.coinsPerUser && (
                    <p id="coins-error" className="text-destructive text-sm">
                        {errors.coinsPerUser.message}
                    </p>
                )}
                <p className="text-muted-foreground text-sm">How many coins each participant starts with.</p>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="teamname">Name your team</Label>
                <Input
                    id="teamname"
                    placeholder="e.g., Summer Hackathon 2025"
                    autoComplete="off"
                    aria-invalid={!!errors.teamname}
                    aria-describedby={errors.teamname ? "teamname-error" : undefined}
                    {...register("teamname")}
                />
                {errors.teamname && (
                    <p id="teamname-error" className="text-destructive text-sm">
                        {errors.teamname.message}
                    </p>
                )}
                <p className="text-muted-foreground text-sm">This will be visible to participants.</p>
            </div>
            {/* Visibility */}
            <div className="grid gap-2">
                <Label>Visibility</Label>
                <div className="flex items-center justify-between rounded-md border p-3">
                    <div className="space-y-1">
                        <p className="font-medium">{isPublic ? "Public" : "Private"}</p>
                        <p className="text-muted-foreground text-sm">{isPublic ? "Anyone with the link can view and join if allowed." : "Only invited users can view and join."}</p>
                    </div>
                    <Controller
                        control={control}
                        name="isPublic"
                        render={({ field }) => (
                            <div className="flex items-center gap-2">
                                <Switch id="visibility" checked={field.value} onCheckedChange={field.onChange} aria-label="Toggle visibility" />
                                {field.value ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                            </div>
                        )}
                    />
                </div>
            </div>
        </CardContent>
    );

    return (
        <>
            <div className="py-6">
                <CardHeader className="mb-4">
                    <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5" />
                        Create Leaderboard
                    </CardTitle>
                    <CardDescription>Set the basic details for your leaderboard.</CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {Page1}

                    <CardFooter className="mt-3 flex items-center justify-between gap-2">
                        <Button type="button" variant="outline" onClick={() => reset()} disabled={isSubmitting}>
                            Reset
                        </Button>
                        <div className="flex items-center gap-1">
                            <Button className="cursor-pointer" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Creating..." : "Create leaderboard"}
                            </Button>
                        </div>
                    </CardFooter>
                </form>
            </div>
        </>
    );
}
