import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
// import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Markdown } from '@tiptap/markdown'
import { useCallback, useState } from 'react'
// TODO: 
//  - Add code syntax highlighting extension in future
//  - Add more toolbar options as needed
//  - Add table support in future


export default function TiptapEditor({ content, onChange, placeholder = "Write your thoughts..." }) {
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)
    const [linkUrl, setLinkUrl] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Typography,
            Markdown.configure({
                markedOptions: {
                    gfm: true,
                    breaks: true,
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
            // Link.configure({
            //     openOnClick: false,
            //     HTMLAttributes: {
            //         class: 'text-blue-600 underline hover:text-blue-800',
            //     },
            // }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded my-4',
                },
            }),
        ],
        content,
        contentType: 'markdown',
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px] dark:prose-invert',
            },
        },
    })

    const openLinkModal = useCallback(() => {
        if (!editor) return
        const previousUrl = editor.getAttributes('link').href
        setLinkUrl(previousUrl || '')
        setIsLinkModalOpen(true)
    }, [editor])

    const setLink = useCallback(() => {
        if (!editor) return

        if (linkUrl === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
        } else {
            editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
        }
        
        setIsLinkModalOpen(false)
        setLinkUrl('')
    }, [editor, linkUrl])

    const openImageModal = useCallback(() => {
        if (!editor) return
        setImageUrl('')
        setIsImageModalOpen(true)
    }, [editor])

    const addImage = useCallback(() => {
        if (!editor || !imageUrl) return
        
        editor.chain().focus().setImage({ src: imageUrl }).run()
        setIsImageModalOpen(false)
        setImageUrl('')
    }, [editor, imageUrl])

    if (!editor) return null

    return (
        <div className="space-y-3">
            {/* Toolbar */}
            <div className="flex items-center gap-1 pb-3 border-b border-border flex-wrap">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`px-2 py-1 text-xs transition-colors rounded ${
                        editor.isActive('bold') 
                            ? 'bg-foreground text-background' 
                            : 'text-foreground hover:bg-muted'
                    }`}
                >
                    B
                </button>
                
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 text-xs transition-colors rounded ${
                        editor.isActive('italic') 
                            ? 'bg-foreground text-background' 
                            : 'text-foreground hover:bg-muted'
                    }`}
                >
                    <em>I</em>
                </button>

                <div className="w-px h-4 bg-border mx-1" />

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-2 py-1 text-xs transition-colors rounded ${
                        editor.isActive('heading', { level: 1 }) 
                            ? 'bg-foreground text-background' 
                            : 'text-foreground hover:bg-muted'
                    }`}
                >
                    H1
                </button>
                
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-2 py-1 text-xs transition-colors rounded ${
                        editor.isActive('heading', { level: 2 }) 
                            ? 'bg-foreground text-background' 
                            : 'text-foreground hover:bg-muted'
                    }`}
                >
                    H2
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-2 py-1 text-xs transition-colors rounded ${
                        editor.isActive('heading', { level: 3 }) 
                            ? 'bg-foreground text-background' 
                            : 'text-foreground hover:bg-muted'
                    }`}
                >
                    H3
                </button>

                <div className="w-px h-4 bg-border mx-1" />

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-2 py-1 text-xs transition-colors rounded ${
                        editor.isActive('bulletList') 
                            ? 'bg-foreground text-background' 
                            : 'text-foreground hover:bg-muted'
                    }`}
                >
                    • List
                </button>
                
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-2 py-1 text-xs transition-colors rounded ${
                        editor.isActive('orderedList') 
                            ? 'bg-foreground text-background' 
                            : 'text-foreground hover:bg-muted'
                    }`}
                >
                    1. List
                </button>

                <div className="w-px h-4 bg-border mx-1" />

                <button
                    type="button"
                    onClick={openLinkModal}
                    className={`px-2 py-1 text-xs transition-colors rounded ${
                        editor.isActive('link') 
                            ? 'bg-foreground text-background' 
                            : 'text-foreground hover:bg-muted'
                    }`}
                >
                    🔗 Link
                </button>

                <button
                    type="button"
                    onClick={openImageModal}
                    className="px-2 py-1 text-xs transition-colors rounded text-foreground hover:bg-muted"
                >
                    🖼️ Image
                </button>

                <div className="w-px h-4 bg-border mx-1" />

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`px-2 py-1 text-xs transition-colors rounded ${
                        editor.isActive('blockquote') 
                            ? 'bg-foreground text-background' 
                            : 'text-foreground hover:bg-muted'
                    }`}
                >
                    " Quote
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`px-2 py-1 text-xs transition-colors rounded ${
                        editor.isActive('codeBlock') 
                            ? 'bg-foreground text-background' 
                            : 'text-foreground hover:bg-muted'
                    }`}
                >
                    &lt;/&gt; Code
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={`px-2 py-1 text-xs transition-colors rounded ${
                        editor.isActive('code') 
                            ? 'bg-foreground text-background' 
                            : 'text-foreground hover:bg-muted'
                    }`}
                >
                    `code`
                </button>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} />

            {/* Link Modal */}
            {isLinkModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-card rounded-lg p-6 max-w-md w-full mx-4 space-y-4 border border-border">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-medium text-foreground">Insert Link</h3>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLinkModalOpen(false)
                                    setLinkUrl('')
                                }}
                                className="text-muted-foreground hover:text-foreground text-xl leading-none"
                            >
                                ×
                            </button>
                        </div>

                        <input
                            type="url"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-3 py-2 border border-border rounded outline-none focus:border-primary bg-background text-foreground transition-colors text-sm"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    setLink()
                                }
                            }}
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLinkModalOpen(false)
                                    setLinkUrl('')
                                }}
                                className="px-4 py-2 text-xs border border-border hover:bg-muted text-foreground transition-colors rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={setLink}
                                className="px-4 py-2 text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded"
                            >
                                Insert
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Modal */}
            {isImageModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-card rounded-lg p-6 max-w-md w-full mx-4 space-y-4 border border-border">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-medium text-foreground">Insert Image</h3>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsImageModalOpen(false)
                                    setImageUrl('')
                                }}
                                className="text-muted-foreground hover:text-foreground text-xl leading-none"
                            >
                                ×
                            </button>
                        </div>

                        <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-3 py-2 border border-border rounded outline-none focus:border-primary bg-background text-foreground transition-colors text-sm"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    addImage()
                                }
                            }}
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsImageModalOpen(false)
                                    setImageUrl('')
                                }}
                                className="px-4 py-2 text-xs border border-border hover:bg-muted text-foreground transition-colors rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={addImage}
                                className="px-4 py-2 text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded"
                            >
                                Insert
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
