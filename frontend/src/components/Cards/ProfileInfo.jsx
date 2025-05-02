import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  if (!userInfo) {
    return null;
  }

  const { fullName } = userInfo;

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 dark:text-gray-200 font-medium bg-slate-100 dark:bg-gray-600">
        {getInitials(fullName)}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-800 dark:text-gray-200">{fullName}</p>
        <button
          type="button"
          className="text-sm text-slate-700 dark:text-gray-300 underline"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;