import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase } from "lucide-react";

const ExecutiveTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-gray-800">
            {/* Header */}
            <header className="p-8 text-white" style={{ backgroundColor: accentColor }}>
                <div className="flex items-center gap-6">
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold mb-2">
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        <div className="flex items-center gap-2 text-lg opacity-90">
                            <Briefcase className="size-5" />
                            <span>Senior Professional</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid lg:grid-cols-[300px_1fr] gap-0">
                {/* Sidebar */}
                <aside className="bg-gray-50 p-6 border-r border-gray-200">
                    {/* Contact Information */}
                    <section className="mb-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: accentColor }}>
                            Contact
                        </h3>
                        <div className="space-y-3 text-sm">
                            {data.personal_info?.email && (
                                <div className="flex items-start gap-2">
                                    <Mail className="size-4 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <span className="break-all">{data.personal_info.email}</span>
                                </div>
                            )}
                            {data.personal_info?.phone && (
                                <div className="flex items-start gap-2">
                                    <Phone className="size-4 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <span>{data.personal_info.phone}</span>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-start gap-2">
                                    <MapPin className="size-4 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <span>{data.personal_info.location}</span>
                                </div>
                            )}
                            {data.personal_info?.linkedin && (
                                <div className="flex items-start gap-2">
                                    <Linkedin className="size-4 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <a href={data.personal_info.linkedin} className="break-all hover:underline">
                                        {data.personal_info.linkedin.replace(/https?:\/\/(www\.)?/, '')}
                                    </a>
                                </div>
                            )}
                            {data.personal_info?.website && (
                                <div className="flex items-start gap-2">
                                    <Globe className="size-4 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <a href={data.personal_info.website} className="break-all hover:underline">
                                        {data.personal_info.website.replace(/https?:\/\/(www\.)?/, '')}
                                    </a>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: accentColor }}>
                                Core Skills
                            </h3>
                            <div className="space-y-2">
                                {data.skills.map((skill, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
                                        <span className="text-sm text-gray-700">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: accentColor }}>
                                Education
                            </h3>
                            <div className="space-y-4">
                                {data.education.map((edu, index) => (
                                    <div key={index} className="text-sm">
                                        <h4 className="font-semibold text-gray-900">
                                            {edu.degree}
                                        </h4>
                                        {edu.field && <p className="text-gray-700">{edu.field}</p>}
                                        <p className="text-gray-600 text-xs mt-1">{edu.institution}</p>
                                        <p className="text-gray-500 text-xs">{formatDate(edu.graduation_date)}</p>
                                        {edu.gpa && <p className="text-gray-600 text-xs">GPA: {edu.gpa}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {data.languages && data.languages.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: accentColor }}>
                                Languages
                            </h3>
                            <div className="space-y-2">
                                {data.languages.map((language, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
                                        <span className="text-sm text-gray-700">{language}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Hobbies */}
                    {data.hobbies && data.hobbies.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: accentColor }}>
                                Hobbies
                            </h3>
                            <div className="space-y-2">
                                {data.hobbies.map((hobby, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
                                        <span className="text-sm text-gray-700">{hobby}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Main Content */}
                <main className="p-8">
                    {/* Professional Summary */}
                    {data.professional_summary && (
                        <section className="mb-8">
                            <h2 className="text-xl font-bold uppercase tracking-wide mb-4 pb-2 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>
                                Executive Summary
                            </h2>
                            <p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
                        </section>
                    )}

                    {/* Professional Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xl font-bold uppercase tracking-wide mb-4 pb-2 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>
                                Professional Experience
                            </h2>

                            <div className="space-y-6">
                                {data.experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                                                <p className="font-semibold" style={{ color: accentColor }}>{exp.company}</p>
                                            </div>
                                            <div className="text-right text-sm">
                                                <p className="text-gray-600 font-medium">
                                                    {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                                </p>
                                            </div>
                                        </div>
                                        {exp.description && (
                                            <div className="text-gray-700 leading-relaxed mt-2 whitespace-pre-line">
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
                        <section className="mb-8">
                            <h2 className="text-xl font-bold uppercase tracking-wide mb-4 pb-2 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>
                                Key Projects
                            </h2>

                            <div className="space-y-4">
                                {data.project.map((proj, index) => (
                                    <div key={index}>
                                        <h3 className="text-lg font-bold text-gray-900">{proj.name}</h3>
                                        {proj.description && (
                                            <p className="text-gray-700 leading-relaxed mt-1">{proj.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certificates */}
                    {data.certificates && data.certificates.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xl font-bold uppercase tracking-wide mb-4 pb-2 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>
                                Certificates
                            </h2>

                            <div className="space-y-4">
                                {data.certificates.map((cert, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-gray-900">{cert.title}</h3>
                                            <span className="text-sm text-gray-600">{cert.date}</span>
                                        </div>
                                        <p className="font-semibold text-sm" style={{ color: accentColor }}>{cert.issuer}</p>
                                        {cert.description && <p className="text-gray-700 text-sm mt-1">{cert.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Achievements */}
                    {data.achievements && data.achievements.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-wide mb-4 pb-2 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>
                                Achievements
                            </h2>

                            <div className="space-y-4">
                                {data.achievements.map((achievement, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-gray-900">{achievement.title}</h3>
                                            <span className="text-sm text-gray-600">{achievement.date}</span>
                                        </div>
                                        {achievement.description && <p className="text-gray-700 text-sm mt-1">{achievement.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ExecutiveTemplate;
