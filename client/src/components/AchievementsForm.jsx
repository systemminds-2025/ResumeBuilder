import { Trophy, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const AchievementsForm = ({ data, onChange }) => {
    const achievements = data || [];

    const addAchievement = () => {
        const newAchievement = {
            title: "",
            date: "",
            description: ""
        };
        onChange([...achievements, newAchievement])
    }

    const removeAchievement = (index) => {
        const updated = achievements.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateAchievement = (index, field, value) => {
        const updated = [...achievements];
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Achievements</h3>
                    <p className='text-sm text-gray-500'>Add your awards, recognitions, and accomplishments</p>
                </div>
                <button onClick={addAchievement} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'>
                    <Plus className="size-4" />
                    Add Achievement
                </button>
            </div>

            {achievements.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                    <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No achievements added yet.</p>
                    <p className="text-sm">Click "Add Achievement" to get started.</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {achievements.map((achievement, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                            <div className='flex justify-between items-start'>
                                <h4>Achievement #{index + 1}</h4>
                                <button onClick={() => removeAchievement(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-3'>

                                <input value={achievement.title || ""} onChange={(e) => updateAchievement(index, "title", e.target.value)} type="text" placeholder="Achievement Title (e.g., Employee of the Year)" className="px-3 py-2 text-sm rounded-lg md:col-span-1" />

                                <input value={achievement.date || ""} onChange={(e) => updateAchievement(index, "date", e.target.value)} type="text" placeholder="Date (e.g., 2023, Q1 2024)" className="px-3 py-2 text-sm rounded-lg" />
                            </div>

                            <div className="space-y-2">
                                <label className='text-sm font-medium text-gray-700'>Description</label>
                                <textarea value={achievement.description || ""} onChange={(e) => updateAchievement(index, "description", e.target.value)} rows={3} className="w-full text-sm px-3 py-2 rounded-lg resize-none" placeholder="Describe your achievement and its impact..." />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AchievementsForm
