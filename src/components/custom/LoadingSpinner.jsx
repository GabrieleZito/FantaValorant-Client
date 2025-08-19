export function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-b-2 border-red-500 rounded-full animate-spin"></div>
                <p className="text-gray-600 dark:text-gray-300">Loading...</p>
            </div>
        </div>
    );
}
