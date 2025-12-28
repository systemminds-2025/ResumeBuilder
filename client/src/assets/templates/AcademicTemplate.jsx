import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const AcademicTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-10 bg-white text-gray-900 font-serif">
            {/* Header - Centered, Formal */}
            <header className="text-center mb-8 pb-6 border-b" style={{ borderColor: accentColor }}>
                <h1 className="text-3xl font-bold mb-3 tracking-wide" style={{ color: accentColor }}>
                    {data.personal_info?.full_name?.toUpperCase() || "YOUR NAME"}
                </h1>

                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-700">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-3.5" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-3.5" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-3.5" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                </div>

                {(data.personal_info?.linkedin || data.personal_info?.website) && (
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-600 mt-2">
                        {data.personal_info?.linkedin && (
                            <div className="flex items-center gap-1">
                                <Linkedin className="size-3" />
                                <span className="break-all">{data.personal_info.linkedin.replace(/https?:\/\/(www\.)?/, '')}</span>
                            </div>
                        )}
                        {data.personal_info?.website && (
                            <div className="flex items-center gap-1">
                                <Globe className="size-3" />
                                <span className="break-all">{data.personal_info.website.replace(/https?:\/\/(www\.)?/, '')}</span>
                            </div>
                        )}
                    </div>
                )}
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>
                        Research Interests
                    </h2>
                    <p className="text-gray-800 leading-relaxed text-sm">{data.professional_summary}</p>
                </section>
            )}

            {/* Education - Prominent placement */}
            {data.education && data.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>
                        Education
                    </h2>

                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900">
                                            {edu.degree} {edu.field && `in ${edu.field}`}
                                        </h3>
                                        <p className="text-gray-700 italic">{edu.institution}</p>
                                        {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                                    </div>
                                    <div className="text-sm text-gray-600 text-right">
                                        <p>{formatDate(edu.graduation_date)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Professional Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>
                        Professional Experience
                    </h2>

                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                                        <p className="text-gray-700 italic">{exp.company}</p>
                                    </div>
                                    <div className="text-sm text-gray-600 text-right">
                                        <p>{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</p>
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className="text-gray-800 leading-relaxed text-sm mt-2 whitespace-pre-line">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Publications/Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>
                        Publications & Research
                    </h2>

                    <div className="space-y-3">
                        {data.project.map((proj, index) => (
                            <div key={index}>
                                <h3 className="font-bold text-gray-900">{proj.name}</h3>
                                {proj.description && (
                                    <p className="text-gray-800 leading-relaxed text-sm mt-1">{proj.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills & Competencies */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>
                        Skills & Competencies
                    </h2>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                        {data.skills.map((skill, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <span className="text-gray-400 select-none">•</span>
                                <span className="text-sm text-gray-800">{skill}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certificates */}
            {data.certificates && data.certificates.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>
                        Certifications
                    </h2>

                    <div className="space-y-3">
                        {data.certificates.map((cert, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-gray-900">{cert.title}</h3>
                                    <span className="text-sm text-gray-600">{cert.date}</span>
                                </div>
                                <p className="text-gray-700 italic text-sm">{cert.issuer}</p>
                                {cert.description && (
                                    <p className="text-gray-800 text-sm mt-1">{cert.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Achievements */}
            {data.achievements && data.achievements.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>
                        Honors & Awards
                    </h2>

                    <div className="space-y-3">
                        {data.achievements.map((achievement, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-gray-900">{achievement.title}</h3>
                                    <span className="text-sm text-gray-600">{achievement.date}</span>
                                </div>
                                {achievement.description && (
                                    <p className="text-gray-800 text-sm mt-1">{achievement.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>
                        Languages
                    </h2>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                        {data.languages.map((language, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <span className="text-gray-400 select-none">•</span>
                                <span className="text-sm text-gray-800">{language}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Hobbies */}
            {data.hobbies && data.hobbies.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>
                        Interests
                    </h2>

                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {data.hobbies.map((hobby, index) => (
                            <span key={index} className="text-sm text-gray-800">• {hobby}</span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default AcademicTemplate;
