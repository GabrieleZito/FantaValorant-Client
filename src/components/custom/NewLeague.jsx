import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { LeagueSchema } from "@/zod/LeagueSchema";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Trophy, Coins, Eye, EyeOff, DollarSign } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import leaguesAPI from "@/API/leaguesAPI";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";

export function NewLeague() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [isNext, setIsNext] = useState(false);
    useBreadcrumb(dispatch, location.pathname);

    const {
        register,
        handleSubmit,
        getValues,
        control,
        setError,
        formState: { errors, isSubmitting },
        reset,
        watch,
        trigger,
    } = useForm({
        resolver: zodResolver(LeagueSchema),
        defaultValues: {
            name: "",
            participationFee: 0,
            coinsPerUser: 100,
            isPublic: true,
            teamname: "",
        },
    });
    const isPublic = watch("isPublic");

    const createLeaderboard = useMutation({
        mutationFn: leaguesAPI.createLeague,
        mutationKey: ["createLeague"],
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (data) => {
            console.log(data);
        },
    });

    function onSubmit() {
        createLeaderboard.mutate({
            name: getValues("name"),
            coinsPerUser: parseInt(getValues("coinsPerUser")),
            isPublic: getValues("isPublic"),
            participationFee: parseInt(getValues("participationFee")),
            tournament: getValues("tournament"),
            teamname: getValues("teamname"),
        });
    }

    const handleNext = async () => {
        const isValid = await trigger(["name", "coinsPerUser", "participationFee", "isPublic"]);
        if (isValid) {
            setIsNext((x) => !x);
        }
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
                    <p id="name-error" className="text-sm text-destructive">
                        {errors.name.message}
                    </p>
                )}
                <p className="text-sm text-muted-foreground">This will be visible to participants.</p>
            </div>

            {/* Participation Fee */}
            <div className="grid gap-2">
                <Label htmlFor="participationFee">Participation fee</Label>
                <div className="relative">
                    <span className={"text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"} aria-hidden="true">
                        <DollarSign className="w-4 h-4" />
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
                    <p id="fee-error" className="text-sm text-destructive">
                        {errors.participationFee.message}
                    </p>
                )}
                <p className="text-sm text-muted-foreground">Set to 0 if the leaderboard is free to join.</p>
            </div>

            {/* Coins per user */}
            <div className="grid gap-2">
                <Label htmlFor="coinsPerUser">Number of coins per user</Label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground" aria-hidden="true">
                        <Coins className="w-4 h-4" />
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
                    <p id="coins-error" className="text-sm text-destructive">
                        {errors.coinsPerUser.message}
                    </p>
                )}
                <p className="text-sm text-muted-foreground">How many coins each participant starts with.</p>
            </div>

            {/* Visibility */}
            <div className="grid gap-2">
                <Label>Visibility</Label>
                <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="space-y-1">
                        <p className="font-medium">{isPublic ? "Public" : "Private"}</p>
                        <p className="text-sm text-muted-foreground">
                            {isPublic ? "Anyone with the link can view and join if allowed." : "Only invited users can view and join."}
                        </p>
                    </div>
                    <Controller
                        control={control}
                        name="isPublic"
                        render={({ field }) => (
                            <div className="flex items-center gap-2">
                                <Switch id="visibility" checked={field.value} onCheckedChange={field.onChange} aria-label="Toggle visibility" />
                                {field.value ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </div>
                        )}
                    />
                </div>
            </div>
        </CardContent>
    );

    const Page2 = (
        <CardContent className="grid gap-6">
            {/* Tournament */}
            <div className="grid gap-2">
                <Label htmlFor="tournament">Tournament</Label>
                <Controller
                    control={control}
                    name="tournament"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                            <SelectTrigger
                                id="tournament"
                                aria-invalid={!!errors.tournament}
                                aria-describedby={errors.tournament ? "tournament-error" : undefined}
                            >
                                <SelectValue placeholder="Select a tournament" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">VCT 2025 (All season)</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.tournament && (
                    <p id="tournament-error" className="text-sm text-destructive">
                        {errors.tournament.message}
                    </p>
                )}
                <p className="text-sm text-muted-foreground">Choose the type of competition or activity.</p>
            </div>

            {/* Team Name */}
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
                    <p id="teamname-error" className="text-sm text-destructive">
                        {errors.teamname.message}
                    </p>
                )}
                <p className="text-sm text-muted-foreground">This will be visible to participants.</p>
            </div>
        </CardContent>
    );

    return (
        <>
            <div className="py-6">
                <CardHeader className="mb-4">
                    <CardTitle className="flex items-center gap-2">
                        <Trophy className="w-5 h-5" />
                        Create Leaderboard
                    </CardTitle>
                    <CardDescription>Set the basic details for your leaderboard.</CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {isNext ? Page2 : Page1}

                    <CardFooter className="flex items-center justify-between gap-2 mt-3">
                        <Button type="button" variant="outline" onClick={() => reset()} disabled={isSubmitting}>
                            Reset
                        </Button>
                        <div className="flex items-center gap-1">
                            {isNext ? (
                                <>
                                    <Button type="button" variant="outline" onClick={() => setIsNext((x) => !x)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Creating..." : "Create leaderboard"}
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button type="button" onClick={handleNext}>
                                        Next
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardFooter>
                </form>
            </div>
        </>
    );
}
