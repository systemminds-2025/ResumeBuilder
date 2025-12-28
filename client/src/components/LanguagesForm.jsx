import { Plus, Languages as LanguagesIcon, X } from 'lucide-react'
import React, { useState } from 'react'

const LanguagesForm = ({ data, onChange }) => {
    const languages = data || [];
    const [newLanguage, setNewLanguage] = useState("")

    const addLanguage = () => {
        if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
            onChange([...languages, newLanguage.trim()])
            setNewLanguage("")
        }
    }

    const removeLanguage = (indexToRemove) => {
        onChange(languages.filter((_, index) => index !== indexToRemove))
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addLanguage();
        }
    }
    return (
        <div className='space-y-4'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Languages</h3>
                <p className='text-sm text-gray-500'>Add languages you speak and your proficiency level</p>
            </div>

            <div className="flex gap-2">
                <input type="text" placeholder="e.g., English (Native), Spanish (Fluent), French (Basic)" className='flex-1 px-3 py-2 text-sm'
                    onChange={(e) => setNewLanguage(e.target.value)}
                    value={newLanguage}
                    onKeyDown={handleKeyPress}
                />
                <button onClick={addLanguage} disabled={!newLanguage.trim()} className='flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                    <Plus className="size-4" /> Add
                </button>
            </div>

            {languages.length > 0 ? (
                <div className='flex flex-wrap gap-2'>
                    {languages.map((language, index) => (
                        <span key={index} className='flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm'>
                            {language}
                            <button onClick={() => removeLanguage(index)} className="ml-1 hover:bg-purple-200 rounded-full p-0.5 transition-colors">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
            )
                :
                (
                    <div className='text-center py-6 text-gray-500'>
                        <LanguagesIcon className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                        <p>No languages added yet.</p>
                        <p className="text-sm">Add languages you speak above.</p>
                    </div>
                )}

            <div className='bg-purple-50 p-3 rounded-lg'>
                <p className='text-sm text-purple-800'><strong>Tip:</strong> Include your proficiency level (e.g., Native, Fluent, Intermediate, Basic) for each language.</p>
            </div>
        </div>
    )
}

export default LanguagesForm
