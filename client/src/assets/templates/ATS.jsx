import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const OverleafTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-4xl font-bold mb-3 tracking-tight" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700 border-b pb-4" style={{ borderColor: accentColor }}>
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-3" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-3" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-3" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin className="size-3" />
                            <span className="break-all">{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-1">
                            <Globe className="size-3" />
                            <span className="break-all">{data.personal_info.website}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-2 uppercase tracking-wide" style={{ color: accentColor }}>
                        Summary
                    </h2>
                    <p className="text-gray-800 text-sm leading-relaxed text-justify">{data.professional_summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
                        Experience
                    </h2>

                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                                    <span className="text-xs text-gray-600 italic">
                                        {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-sm italic text-gray-700 mb-2">{exp.company}</p>
                                {exp.description && (
                                    <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line text-justify">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
                        Projects
                    </h2>

                    <div className="space-y-3">
                        {data.project.map((proj, index) => (
                            <div key={index}>
                                <h3 className="font-bold text-gray-900 text-sm">{proj.name}</h3>
                                <p className="text-sm text-gray-700 leading-relaxed text-justify">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
                        Education
                    </h2>

                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-gray-900">
                                        {edu.degree}{edu.field && ` in ${edu.field}`}
                                    </h3>
                                    <span className="text-xs text-gray-600 italic">
                                        {formatDate(edu.graduation_date)}
                                    </span>
                                </div>
                                <p className="text-sm italic text-gray-700">{edu.institution}</p>
                                {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
                        Skills
                    </h2>

                    <div className="text-sm text-gray-800">
                        {data.skills.join(" • ")}
                    </div>
                </section>
            )}

            {/* Certificates */}
            {data.certificates && data.certificates.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
                        Certifications
                    </h2>

                    <div className="space-y-3">
                        {data.certificates.map((cert, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-gray-900">{cert.title}</h3>
                                    <span className="text-xs text-gray-600 italic">{cert.date}</span>
                                </div>
                                <p className="text-sm italic text-gray-700">{cert.issuer}</p>
                                {cert.description && <p className="text-sm text-gray-800 mt-1">{cert.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Achievements */}
            {data.achievements && data.achievements.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
                        Achievements
                    </h2>

                    <div className="space-y-3">
                        {data.achievements.map((achievement, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-gray-900">{achievement.title}</h3>
                                    <span className="text-xs text-gray-600 italic">{achievement.date}</span>
                                </div>
                                {achievement.description && <p className="text-sm text-gray-800 mt-1">{achievement.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
                        Languages
                    </h2>

                    <div className="text-sm text-gray-800">
                        {data.languages.join(" • ")}
                    </div>
                </section>
            )}

            {/* Hobbies */}
            {data.hobbies && data.hobbies.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
                        Interests
                    </h2>

                    <div className="text-sm text-gray-800">
                        {data.hobbies.join(" • ")}
                    </div>
                </section>
            )}
        </div>
    );
}

export default OverleafTemplate;