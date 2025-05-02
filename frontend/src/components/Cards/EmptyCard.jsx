import add_notes from "../../assets/add_notes.png";

const EmptyCard = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-28">
      <img src={add_notes} alt="No Notes" className="w-60" />
      <h2 className="w-1/2 font-medium text-slate-700 dark:text-gray-200 text-center leading-7 mt-5">
        Ready to create your first note?
      </h2>
      <p className="w-1/2 text-sm text-slate-600 dark:text-gray-400 text-center leading-6 mt-2">
        Click the 'Add' button to capture your thoughts, ideas, and reminders. Let's begin!
      </p>
    </div>
  );
};

export default EmptyCard;