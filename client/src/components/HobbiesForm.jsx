import { Plus, Heart, X } from 'lucide-react'
import React, { useState } from 'react'

const HobbiesForm = ({ data, onChange }) => {
    const hobbies = data || [];
    const [newHobby, setNewHobby] = useState("")

    const addHobby = () => {
        if (newHobby.trim() && !hobbies.includes(newHobby.trim())) {
            onChange([...hobbies, newHobby.trim()])
            setNewHobby("")
        }
    }

    const removeHobby = (indexToRemove) => {
        onChange(hobbies.filter((_, index) => index !== indexToRemove))
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addHobby();
        }
    }
    return (
        <div className='space-y-4'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Hobbies & Interests</h3>
                <p className='text-sm text-gray-500'>Add your personal interests and hobbies</p>
            </div>

            <div className="flex gap-2">
                <input type="text" placeholder="e.g., Photography, Hiking, Chess, Reading" className='flex-1 px-3 py-2 text-sm'
                    onChange={(e) => setNewHobby(e.target.value)}
                    value={newHobby}
                    onKeyDown={handleKeyPress}
                />
                <button onClick={addHobby} disabled={!newHobby.trim()} className='flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                    <Plus className="size-4" /> Add
                </button>
            </div>

            {hobbies.length > 0 ? (
                <div className='flex flex-wrap gap-2'>
                    {hobbies.map((hobby, index) => (
                        <span key={index} className='flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm'>
                            {hobby}
                            <button onClick={() => removeHobby(index)} className="ml-1 hover:bg-pink-200 rounded-full p-0.5 transition-colors">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
            )
                :
                (
                    <div className='text-center py-6 text-gray-500'>
                        <Heart className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                        <p>No hobbies added yet.</p>
                        <p className="text-sm">Add your interests and hobbies above.</p>
                    </div>
                )}

            <div className='bg-pink-50 p-3 rounded-lg'>
                <p className='text-sm text-pink-800'><strong>Tip:</strong> Include hobbies that show personality or relevant skills. Keep it professional and concise.</p>
            </div>
        </div>
    )
}

export default HobbiesForm
