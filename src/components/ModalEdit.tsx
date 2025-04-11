
import { User } from '../types/index';

type EditUserModalProps = {
 
    editingUser: User;
    setEditingUser: (user: User) => void;
    setModalEdit: (value: boolean) => void;
    SaveUser: (user: User) => void
  };
 export default function EditUserModal({ editingUser, setEditingUser, setModalEdit, SaveUser }: EditUserModalProps){

   
    return (
      
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>
            <div className="space-y-4">
              <label htmlFor='nameE' className='flex items-center gap-3 text-gray-600'>Name
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  type="text"
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                  placeholder="Name"
                  required
                  id='nameE'
                />
              </label>
              <label htmlFor='usernameE' className='flex items-center gap-3 text-gray-600'>Username
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  type="text"
                  value={editingUser.username}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, username: e.target.value })
                  }
                  placeholder="username"
                  required
                  id="usernameE"
                />
              </label>
              <label htmlFor='emailE' className='flex items-center gap-3 text-gray-600'>Email
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  placeholder="email"
                  required
                  id="emailE"
                />
              </label>
              <label htmlFor='websiteE' className='flex items-center gap-3 text-gray-600'>Website
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  type="text"
                  value={editingUser.website}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, website: e.target.value })
                  }
                  placeholder="website"
                  required
                  id="websiteE"
                />
              </label>
              <label htmlFor='CompanyE' className='flex items-center gap-3 text-gray-600'>Company
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  type="text"
                  value={editingUser.company.name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, company: { ...editingUser.company, name: e.target.value } })
                  }
                  placeholder="Company"
                  required
                  id="CompanyE"
                />
              </label>

            </div>

            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded mr-2"
                onClick={() => setModalEdit(false)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded ${editingUser.name.length <= 3 || /\S+@\S+\.\S+/.test(editingUser.email) === false
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 text-white"
                  }`}
                disabled={editingUser.name.length <= 3 || /\S+@\S+\.\S+/.test(editingUser.email) === false}
                onClick={() => {

                  SaveUser(editingUser);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        
    )
}

