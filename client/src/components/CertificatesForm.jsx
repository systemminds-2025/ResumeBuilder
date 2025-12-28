import { Award, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const CertificatesForm = ({ data, onChange }) => {
    const certificates = data || [];

    const addCertificate = () => {
        const newCertificate = {
            title: "",
            issuer: "",
            date: "",
            description: ""
        };
        onChange([...certificates, newCertificate])
    }

    const removeCertificate = (index) => {
        const updated = certificates.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateCertificate = (index, field, value) => {
        const updated = [...certificates];
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Certificates</h3>
                    <p className='text-sm text-gray-500'>Add your professional certifications and credentials</p>
                </div>
                <button onClick={addCertificate} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'>
                    <Plus className="size-4" />
                    Add Certificate
                </button>
            </div>

            {certificates.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                    <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No certificates added yet.</p>
                    <p className="text-sm">Click "Add Certificate" to get started.</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {certificates.map((certificate, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                            <div className='flex justify-between items-start'>
                                <h4>Certificate #{index + 1}</h4>
                                <button onClick={() => removeCertificate(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-3'>

                                <input value={certificate.title || ""} onChange={(e) => updateCertificate(index, "title", e.target.value)} type="text" placeholder="Certificate Name (e.g., AWS Certified Solutions Architect)" className="px-3 py-2 text-sm rounded-lg" />

                                <input value={certificate.issuer || ""} onChange={(e) => updateCertificate(index, "issuer", e.target.value)} type="text" placeholder="Issuing Organization (e.g., Amazon Web Services)" className="px-3 py-2 text-sm rounded-lg" />

                                <input value={certificate.date || ""} onChange={(e) => updateCertificate(index, "date", e.target.value)} type="month" placeholder="Issue Date" className="px-3 py-2 text-sm rounded-lg" />
                            </div>

                            <div className="space-y-2">
                                <label className='text-sm font-medium text-gray-700'>Description (Optional)</label>
                                <textarea value={certificate.description || ""} onChange={(e) => updateCertificate(index, "description", e.target.value)} rows={2} className="w-full text-sm px-3 py-2 rounded-lg resize-none" placeholder="Add any relevant details about this certification..." />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CertificatesForm
