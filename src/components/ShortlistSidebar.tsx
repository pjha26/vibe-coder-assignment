import { useShortlistStore } from "@/store/useShortlistStore";

interface ShortlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShortlistSidebar({ isOpen, onClose }: ShortlistSidebarProps) {
  const shortlisted = useShortlistStore((state) => state.shortlisted);
  const removeProfile = useShortlistStore((state) => state.removeProfile);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
      <div className="w-80 bg-white h-full p-4 overflow-y-auto shadow-lg flex flex-col">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-bold">Shortlisted Profiles</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            Close
          </button>
        </div>
        
        {shortlisted.length === 0 ? (
          <p className="text-gray-500 text-sm">No profiles in list yet.</p>
        ) : (
          <div className="flex flex-col gap-3 flex-1">
            {shortlisted.map((profile) => (
              <div key={profile.user_id} className="flex items-center gap-2 border p-2 rounded">
                <img src={profile.picture} alt={`${profile.username} profile`} className="w-10 h-10 rounded-full" />
                <div className="flex-1 overflow-hidden">
                  <div className="font-semibold text-sm truncate">@{profile.username}</div>
                  <div className="text-xs text-gray-500 truncate">{profile.fullname}</div>
                </div>
                <button 
                  onClick={() => removeProfile(profile.user_id)}
                  className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
