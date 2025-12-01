import leaguesAPI from "@/API/leaguesAPI";
import { useSocket } from "@/contexts/SocketContext";
import { useQuery } from "@tanstack/react-query";
import { Ban, Clock, Coins, Pause, Play, TrendingUp, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { LoadingSpinnerMini } from "./LoadingSpinner";
import { Card, CardContent, CardTitle, CardHeader, CardFooter } from "../ui/card";
import { AvatarImage, Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { useSelector } from "react-redux";
import { useAuctionSocket } from "@/hooks/useAuctionSocket";
import { Button } from "@material-tailwind/react";

export function Auction() {
    const params = useParams();
    const user = useSelector((state) => state.auth.user);
    const { socket, isConnected } = useSocket();

    const [timeLeft, setTimeLeft] = useState(20);
    const [users, setUsers] = useState([]);
    const [bids, setBids] = useState([]);
    const [player, setPlayer] = useState(null);

    const getLeagueDetails = useQuery({
        queryKey: ["leagueDetails"],
        queryFn: () => leaguesAPI.getLeagueDetails(params.leaguename),
    });

    useAuctionSocket({ getLeagueDetails, setUsers });

    if (getLeagueDetails.isLoading) {
        return <LoadingSpinnerMini />;
    }

    if (getLeagueDetails.isError) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-3xl">
                <Ban color="red" size={48} />
                You don't have access to this league
            </div>
        );
    }

    if (getLeagueDetails.isSuccess && !getLeagueDetails.data.data.Auction) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-3xl">
                <Ban color="red" size={48} />
                Auction is not started yet
            </div>
        );
    }
    
    if (getLeagueDetails.isSuccess && getLeagueDetails.data.data.Auction) {
        const league = getLeagueDetails.data.data;

        return (
            <div className="p-4">
                <div className="flex justify-between mb-6 max-h-28">
                    <div className="">
                        <h1 className="text-2xl font-bold">{league.name.toUpperCase()}'s Auction</h1>
                        {league.createdBy == user.id ? (
                            <div className="flex items-center justify-center gap-2 mt-5">
                                <button className="flex items-center justify-center w-10 h-10 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600">
                                    <Play className="w-4 h-4" />
                                </button>
                                <button className="flex items-center justify-center w-10 h-10 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600">
                                    <Pause className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Balance balance={40} />
                        <AuctionTimer timeLeft={timeLeft} />
                    </div>
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <PlayerCard player={player} />
                    </div>
                    <div className="space-y-6">
                        <ConnectedUsers users={users} />
                        <Bids bids={bids} />
                    </div>
                </div>
            </div>
        );
    }
}

function PlayerCard({ player }) {
    return (
        <Card className={`h-185 overflow-hidden transition-all hover:shadow-lg`}>
            {/* ${player ? "" : "blur-sm"} */}
            <CardHeader className="bg-primary text-primary-foreground">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold text-balance">NOME</CardTitle>
                        <p className="text-sm opacity-90">POSIZIONE • TEAM</p>
                    </div>
                    <Badge variant="secondary" className="text-lg font-bold">
                        POSIZIONE
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Player Image */}
                    <div className="bg-muted relative aspect-[3/4] overflow-hidden rounded-lg">
                        {/* <Image src={"/placeholder.svg"} alt={"player.name"} fill className="object-cover" /> */}
                    </div>

                    {/* Player Stats */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Season Statistics</h3>
                        <div className="grid gap-3">
                            <StatItem label="Rushing Yards" value={12} />
                            <StatItem label="Touchdowns" value={234} />
                            <StatItem label="Receptions" value={12} />
                            <StatItem label="Receiving Yards" value={4645} />
                            <StatItem label="Yards Per Carry" value={4545} />
                        </div>
                    </div>
                </div>

                {/* Current Bid */}
                <div className="p-4 mt-6 text-center rounded-lg bg-accent/10">
                    <p className="text-sm text-muted-foreground">Current Bid</p>
                    <p className="text-4xl font-bold text-accent">$234</p>
                </div>
            </CardContent>

            {/* <CardFooter className="flex flex-col gap-3 p-6 bg-muted/50 sm:flex-row">
                <Input
                    type="number"
                    placeholder="Enter bid amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="flex-1"
                    min={currentBid + 1}
                    max={userCoins}
                />
                <Button onClick={onPlaceBid} disabled={!isValidBid} size="lg" className="w-full sm:w-auto">
                    Place Bid
                </Button>
            </CardFooter> */}
        </Card>
    );
}

function StatItem({ label, value }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-md bg-muted">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="font-semibold">{value}</span>
        </div>
    );
}

function AuctionTimer({ timeLeft }) {
    const [time, setTime] = useState(timeLeft);
    useEffect(() => {
        if (time <= 0) return;
        const timer = setInterval(() => {
            setTime(Math.max(0, time - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [time, setTime]);

    const isUrgent = time <= 10;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <Card className={`${isUrgent ? "border-destructive animate-pulse" : ""}`}>
            <CardContent className="flex items-center gap-2">
                <Clock className={`h-5 w-5 ${isUrgent ? "text-destructive" : ""}`} />
                <div className="text-center">
                    <p>Time Left</p>
                    <p className={`text-2xl font-bold tabular-nums ${isUrgent ? "text-destructive" : ""}`}>
                        {minutes}:{seconds.toString().padStart(2, "0")}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function ConnectedUsers({ users }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="w-5 h-5" />
                    Connected Users
                    <Badge variant="secondary" className="ml-auto">
                        {users.length}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[250px] pr-4">
                    <div className="space-y-3">
                        {users.length > 0
                            ? users.map((user) => {
                                  if (user.id) {
                                      return (
                                          <div key={user.id} className="flex items-center gap-3 p-2 transition-colors rounded-lg hover:bg-muted">
                                              <Avatar className="w-8 h-8">
                                                  <AvatarImage src={user.propic} alt={user.username} />
                                                  <AvatarFallback>{user.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
                                              </Avatar>
                                              <div className="flex-1">
                                                  <p className="font-medium leading-none">{user.username}</p>
                                              </div>
                                          </div>
                                      );
                                  }
                              })
                            : "No user connected"}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}

function Balance({ balance }) {
    return (
        <Card>
            <CardContent className={"flex items-center gap-2"}>
                <Coins size={24} />
                <div className="text-center">
                    <p className="">Your Balance</p>
                    <p className="text-2xl font-bold">{balance}</p>
                </div>
            </CardContent>
        </Card>
    );
}

function Bids({ bids }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="w-5 h-5" />
                    Bid History
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[250px] pr-4">
                    <div className="space-y-2">
                        {bids.length > 0
                            ? bids.map((bid, index) => (
                                  <div key={bid.id} className={`rounded-lg p-3 ${index % 2 === 0 ? "bg-muted/50" : "bg-card"}`}>
                                      <div className="flex items-center justify-between">
                                          <div>
                                              <p className="font-semibold">{bid.user}</p>
                                          </div>
                                          <p className="text-lg font-bold text-accent">${bid.amount}</p>
                                      </div>
                                  </div>
                              ))
                            : "No bids yet"}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
