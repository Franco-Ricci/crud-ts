import React, { useState } from 'react';

interface ModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
}


export default function Modal({ user, isOpen, onClose, onSave }: ModalProps) {
    const [editedUser, setEditedUser] = useState<User | null>(user);

    // Update the local state when the modal is opened with a new user
    React.useEffect(() => {
        setEditedUser(user);
    }, [user]);

    if (!isOpen || !user) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editedUser) {
            setEditedUser({
                ...editedUser,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSave = () => {
        if (editedUser) {
            onSave(editedUser);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Edit User</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={editedUser?.name || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        name="username"
                        value={editedUser?.username || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Username"
                    />
                    <input
                        type="email"
                        name="email"
                        value={editedUser?.email || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        name="website"
                        value={editedUser?.website || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Website"
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

