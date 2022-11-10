import { useCalendarStore } from "../../hooks";
export const FabDelete = () => {
  const { deleteEvent } = useCalendarStore();

  const handleDelete = () => {
    console.log('delete');
    deleteEvent();
  };

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDelete}>
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
