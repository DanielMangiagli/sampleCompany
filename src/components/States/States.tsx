export const LoadingMsg = () => (
  <div className="flex justify-center items-center h-screen text-lg text-blue-500">
    Loading...
  </div>
);

export const NoItemsMsg = () => (
  <div className="flex justify-center items-center h-screen text-lg text-gray-500">
    No items found
  </div>
);

export const ErrorMsg = () => (
  <div className="flex justify-center items-center h-screen text-lg text-red-500">
    Error fetching devices
  </div>
);
