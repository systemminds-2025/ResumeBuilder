import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const CompactATSTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        const date = new Date(year, month - 1);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-black text-sm leading-snug">
            {/* Header */}
            <header className="mb-4">
                <div className="flex justify-between items-start mb-2">
                    <div className="text-xs">
                        {data.personal_info?.phone && <div>{data.personal_info.phone}</div>}
                        {data.personal_info?.location && <div>{data.personal_info.location}</div>}
                        {data.personal_info?.email && (
                            <div style={{ color: accentColor }}>{data.personal_info.email}</div>
                        )}
                    </div>

                    <div className="text-center flex-1 mx-8">
                        <h1 className="text-3xl font-bold mb-1">
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        <p className="text-base" style={{ color: accentColor }}>
                            {data.personal_info?.title || "Data Scientist / Junior Developer"}
                        </p>
                    </div>

                    <div className="text-xs text-right">
                        {data.personal_info?.website && (
                            <div>
                                <span className="font-semibold">Portfolio: </span>
                                <span style={{ color: accentColor }}>{data.personal_info.website}</span>
                            </div>
                        )}
                        {data.personal_info?.github && (
                            <div style={{ color: accentColor }}>{data.personal_info.github}</div>
                        )}
                        {data.personal_info?.linkedin && (
                            <div style={{ color: accentColor }}>{data.personal_info.linkedin}</div>
                        )}
                    </div>
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-4">
                    <p className="text-justify leading-relaxed">{data.professional_summary}</p>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b border-gray-400">
                        Skills
                    </h2>
                    <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                        {data.skills.map((skill, index) => (
                            <div key={index}>
                                <span className="font-semibold">{skill.category || "Category"}</span>
                                <span className="ml-2">{skill.items || skill}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b border-gray-400">
                        Technical Experience
                    </h2>

                    <div className="space-y-3">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <div>
                                        <span className="font-bold uppercase">{exp.position}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold">
                                            {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-baseline mb-1">
                                    <div className="italic">{exp.company}</div>
                                    <div className="italic text-right text-xs">{exp.location || "somewhere, state"}</div>
                                </div>
                                {exp.description && (
                                    <ul className="list-disc ml-5 space-y-0.5">
                                        {exp.description.split('\n').filter(line => line.trim()).map((item, i) => (
                                            <li key={i}>{item.trim()}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b border-gray-400">
                        Projects
                    </h2>

                    <div className="space-y-3">
                        {data.project.map((proj, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="font-bold uppercase">{proj.name}</span>
                                    {proj.date && (
                                        <span className="font-bold">{proj.date}</span>
                                    )}
                                </div>
                                {proj.company && <div className="italic mb-1">{proj.company}</div>}
                                {proj.description && (
                                    <ul className="list-disc ml-5 space-y-0.5">
                                        {proj.description.split('\n').filter(line => line.trim()).map((item, i) => (
                                            <li key={i}>{item.trim()}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b border-gray-400">
                        Education
                    </h2>

                    <div className="space-y-2">
                        {data.education.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <div>
                                        <span className="font-bold">
                                            {edu.degree}{edu.field && ` in ${edu.field}`}
                                        </span>
                                        <span className="italic">, {edu.institution}</span>
                                    </div>
                                    <span className="font-bold">{formatDate(edu.graduation_date)}</span>
                                </div>
                                {edu.details && (
                                    <div className="italic text-xs">{edu.details}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certificates */}
            {data.certificates && data.certificates.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b border-gray-400">
                        Certifications
                    </h2>

                    <div className="space-y-2">
                        {data.certificates.map((cert, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <span className="font-bold">{cert.title}</span>
                                    <span className="text-xs">{cert.date}</span>
                                </div>
                                <div className="italic text-xs">{cert.issuer}</div>
                                {cert.description && <div className="text-xs mt-1">{cert.description}</div>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Achievements */}
            {data.achievements && data.achievements.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b border-gray-400">
                        Achievements
                    </h2>

                    <div className="space-y-2">
                        {data.achievements.map((achievement, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <span className="font-bold">{achievement.title}</span>
                                    <span className="text-xs">{achievement.date}</span>
                                </div>
                                {achievement.description && <div className="text-xs mt-1">{achievement.description}</div>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b border-gray-400">
                        Languages
                    </h2>

                    <div className="text-sm">
                        {data.languages.join(" • ")}
                    </div>
                </section>
            )}

            {/* Hobbies */}
            {data.hobbies && data.hobbies.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b border-gray-400">
                        Interests
                    </h2>

                    <div className="text-sm">
                        {data.hobbies.join(" • ")}
                    </div>
                </section>
            )}

            {/* Activities */}
            {data.activities && data.activities.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b border-gray-400">
                        Activities
                    </h2>

                    <div className="space-y-1">
                        {data.activities.map((activity, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>{activity.title}</div>
                                <div className="text-right">{activity.date}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default CompactATSTemplate;