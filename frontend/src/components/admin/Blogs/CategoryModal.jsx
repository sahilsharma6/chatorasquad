import { X } from "lucide-react";

export default function CategoryModal({ isModalOpen, setIsModalOpen, setEditingCategory, handleUpdate, editingCategory, mode }) {
    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">{mode === 'edit' ? 'Edit Category' : 'Add Category'}</h2>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={editingCategory?.name || ''}
                                    onChange={(e) => setEditingCategory({
                                        ...editingCategory,
                                        name: e.target.value
                                    })}
                                    className="w-full px-3 py-4 border rounded-md focus:ring-1 focus:ring-orange-500 border-orange-500"
                                />
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
                            >
                                {mode === 'edit' ? 'Update Category' : 'Add Category'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}