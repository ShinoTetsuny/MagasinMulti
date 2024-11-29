import { Trash } from "lucide-react";
import { deleteCategory } from "../../lib/service";
function Category({data, onDelete}) {
    const handleDelete = async () => {
        try {
            await deleteCategory(data._id)
            onDelete(data._id)
        } catch (error) {
            return error
        }
    }
  return (
    <li className="flex justify-between my-2">
      <p>{data.name}</p>
      <button className="bg-red-500 py-2 px-2 rounded hover:bg-red-600" onClick={handleDelete}><Trash size={20} color="white" /></button>
    </li>
  );
}

export default Category;
