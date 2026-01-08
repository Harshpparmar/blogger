import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

export default function MarkdownEditor({ content, onChange, placeholder = "Paste your markdown here..." }) {
    const [activeTab, setActiveTab] = useState('edit')

    const handleChange = (e) => {
        onChange(e.target.value)
    }

    return (
        <div className="space-y-3">
            {/* Tabs */}
            <div className="flex gap-2 border-b border-border transition-colors duration-300">
                <button
                    onClick={() => setActiveTab('edit')}
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                        activeTab === 'edit'
                            ? 'border-b-2 border-foreground text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                    Edit
                </button>
                <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                        activeTab === 'preview'
                            ? 'border-b-2 border-foreground text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                    Preview
                </button>
            </div>

            {/* Edit Tab */}
            {activeTab === 'edit' && (
                <textarea
                    value={content}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full h-96 p-4 border border-border rounded-lg focus:outline-none focus:border-foreground resize-none font-mono text-sm bg-transparent text-foreground placeholder:text-muted-foreground/50 transition-colors duration-300"
                    spellCheck="false"
                />
            )}

            {/* Preview Tab */}
            {activeTab === 'preview' && (
                <div className="prose prose-sm max-w-none p-4 border border-border rounded-lg bg-card min-h-96 overflow-auto transition-colors duration-300">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                            h1: (props) => <h1 className="text-3xl font-bold mb-4 text-foreground" {...props} />,
                            h2: (props) => <h2 className="text-2xl font-bold mb-3 text-foreground" {...props} />,
                            h3: (props) => <h3 className="text-xl font-bold mb-2 text-foreground" {...props} />,
                            table: (props) => <table className="border-collapse w-full my-4" {...props} />,
                            thead: (props) => <thead className="bg-muted" {...props} />,
                            th: (props) => <th className="border border-border px-3 py-2 font-semibold text-left text-foreground" {...props} />,
                            td: (props) => <td className="border border-border px-3 py-2 text-foreground" {...props} />,
                            tr: (props) => <tr className="hover:bg-muted/50" {...props} />,
                            code: ({ inline, ...props }) => 
                                inline ? (
                                    <code className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                                ) : (
                                    <code className="block bg-secondary text-secondary-foreground p-4 rounded-lg overflow-x-auto font-mono text-sm" {...props} />
                                ),
                            pre: (props) => <pre className="bg-secondary p-4 rounded-lg overflow-x-auto my-4" {...props} />,
                            blockquote: (props) => <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground my-4" {...props} />,
                            a: (props) => <a className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer" {...props} />,
                            img: (props) => <img className="max-w-full h-auto rounded my-4" {...props} />,
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    )
}