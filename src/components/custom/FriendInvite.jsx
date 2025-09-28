import { useState, useRef, useEffect } from "react";
import { Plus, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import userAPI from "@/API/userAPI";
import toast from "react-hot-toast";

export function FriendInvite({ leagueId }) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    const getFriends = useQuery({
        queryKey: ["getFriends"],
        queryFn: userAPI.getFriends,
        retry: false,
    });

    // Filter friends based on search query
    useEffect(() => {
        if (query.trim() === "") {
            setFilteredFriends([]);
            return;
        }

        const filtered = getFriends.data.data.filter((friend) => friend.username.toLowerCase().includes(query.toLowerCase()));
        setFilteredFriends(filtered);
    }, [query]);

    // Handle clicking outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && inputRef.current && !inputRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setIsOpen(value.trim() !== "");
        setSelectedFriend(null);
    };

    const handleFriendSelect = (friend) => {
        setSelectedFriend(friend);
        setQuery(friend.username);
        setIsOpen(false);
    };

    const handleClear = () => {
        setQuery("");
        setSelectedFriend(null);
        setIsOpen(false);
        inputRef.current?.focus();
    };

    const handleInputFocus = () => {
        if (query.trim() !== "") {
            setIsOpen(true);
        }
    };

    const sendInvite = useMutation({
        mutationFn: userAPI.sendInvite,
        mutationKey: ["sendInvite"],
        onSuccess: (data) => {
            console.log(data);
            toast.success("Invite Sent", { position: "top-center" });
        },
        onError: (data) => {
            console.log(data);
            toast.error("Something went wrong", { position: "top-center" });
        },
    });

    const handleInvite = () => {
        sendInvite.mutate({ selectedFriend, leagueId });
    };

    if (getFriends.isSuccess && getFriends.data.data.length > 0) {
        return (
            <div className="relative w-1/2">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute w-4 h-4 transform -translate-y-1/2 text-muted-foreground top-1/2 left-3" />
                        <Input
                            ref={inputRef}
                            type="text"
                            placeholder="Search friends..."
                            value={query}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            className="pl-10 pr-10"
                        />
                        {query && (
                            <button
                                onClick={handleClear}
                                className="absolute transition-colors transform -translate-y-1/2 text-muted-foreground hover:text-foreground top-1/2 right-3"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <Button
                        variant="outline"
                        size="default"
                        className="bg-transparent shrink-0 hover:cursor-pointer"
                        disabled={selectedFriend ? false : true}
                        onClick={handleInvite}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Friend
                    </Button>
                </div>

                {/* Dropdown Results */}
                {isOpen && filteredFriends.length > 0 && (
                    <div
                        ref={dropdownRef}
                        className="absolute left-0 right-0 z-50 mt-1 overflow-y-auto border rounded-md shadow-lg bg-popover border-border top-full max-h-60"
                    >
                        {filteredFriends.map((friend) => (
                            <button
                                key={friend.id}
                                onClick={() => handleFriendSelect(friend)}
                                className="flex items-center w-full gap-3 p-3 text-left transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                            >
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={friend.propic || "/placeholder.svg"} alt={friend.username} />
                                    <AvatarFallback>
                                        {friend.username
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm truncate text-muted-foreground">{friend.username}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* No Results */}
                {isOpen && query.trim() !== "" && filteredFriends.length === 0 && (
                    <div
                        ref={dropdownRef}
                        className="absolute left-0 right-0 z-50 p-4 mt-1 text-center border rounded-md shadow-lg bg-popover border-border text-muted-foreground top-full"
                    >
                        No friends found matching "{query}"
                    </div>
                )}
            </div>
        );
    }
}
