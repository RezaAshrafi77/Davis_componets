/* eslint-disable react/prop-types */
import classNames from "classnames"
import { Divider } from "../Divider"
import { Label } from "../Label"
import { BiError } from "react-icons/bi"
import { useState, useEffect, useRef } from "react"
import styles from "./styles.module.css"

export const TextEditor = ({
    questionKey,
    useFormContext,
    validation,
    label,
    disabled,
    labelClassName,
    divider,
    userGuide,
    educationalContent,
    archive,
    labelMore,
    dividerClassName,
    containerClassName,
    wrapperClassName,
    editorClassName,
    toolbarClassName,
}) => {
    const {
        watch,
        setValue,
        register,
        formState: { errors },
    } = useFormContext()

    const [editorState, setEditorState] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const EditorRef = useRef(null)

    useEffect(() => {
        register(questionKey, validation)

        const loadEditorLibraries = async () => {
            try {
                const [
                    { Editor },
                    { EditorState, ContentState, convertFromRaw },
                    htmlToDraftModule,
                    { stateToHTML },
                ] = await Promise.all([
                    import("react-draft-wysiwyg"),
                    import("draft-js"),
                    import("html-to-draftjs"),
                    import("draft-js-export-html"),
                ])

                // Assign the dynamically imported components/functions
                EditorRef.current = Editor
                const htmlToDraft = htmlToDraftModule.default

                // Initialize editor state
                const getEditorState = () => {
                    const value = watch(questionKey)
                    if (!value) return EditorState.createEmpty()

                    try {
                        if (typeof value === "string") {
                            const parsedValue = JSON.parse(value)
                            if (parsedValue.blocks) {
                                return EditorState.createWithContent(
                                    convertFromRaw(parsedValue)
                                )
                            }
                        }
                    } catch (error) {
                        console.warn("Text editor error")
                    }

                    // If JSON parsing fails, assume it's HTML
                    const blocksFromHTML = htmlToDraft(value)
                    if (blocksFromHTML) {
                        const contentState = ContentState.createFromBlockArray(
                            blocksFromHTML.contentBlocks,
                            blocksFromHTML.entityMap
                        )
                        return EditorState.createWithContent(contentState)
                    }

                    return EditorState.createEmpty()
                }

                setEditorState(getEditorState())
                setIsLoading(false)

                // Save stateToHTML for later use
                window.stateToHTML = stateToHTML
            } catch (error) {
                console.error("Failed to load editor libraries:", error)
            }
        }

        loadEditorLibraries()
    }, [])

    const handleEditorChange = (newState) => {
        setEditorState(newState)
        const html = window.stateToHTML(newState.getCurrentContent())
        setValue(questionKey, html, { shouldValidate: true })
    }

    const error = errors?.[questionKey] ? errors?.[questionKey]?.message : null

    const labelDirectionStyle = {
        center: "label-center",
        right: "label-right",
        left: "label-left",
    }

    if (isLoading) {
        return <div className="text-center py-4">Loading editor...</div>
    }

    const Editor = EditorRef.current

    return (
        <div
            className={classNames(
                "w-full flex flex-col relative bg-formItem p-2 rounded shadow-formItem",
                containerClassName,
                error ? "field-error" : ""
            )}
        >
            {label && (
                <Label
                    className={classNames(
                        labelClassName,
                        labelDirectionStyle[divider]
                    )}
                    userGuide={userGuide}
                    educationalContent={educationalContent}
                    archive={archive ? { ...archive, questionKey } : false}
                    label={label}
                    required={validation ? validation.required : null}
                    more={labelMore}
                    disabled={disabled}
                />
            )}
            {divider && (
                <Divider
                    className={classNames(dividerClassName)}
                    position={divider}
                />
            )}

            {/* Rich Text Editor */}
            <Editor
                editorState={editorState}
                toolbarClassName={styles.toolbar + " " + toolbarClassName}
                wrapperClassName={styles.wrapper + " " + wrapperClassName}
                editorClassName={
                    styles.editor +
                    " " +
                    editorClassName +
                    " " +
                    "prose min-w-full"
                }
                onEditorStateChange={handleEditorChange} // Update form state
                readOnly={disabled}
            />
            {error && (
                <span className="error">
                    <BiError className="text-xs lg:text-base" />
                    {error}
                </span>
            )}
        </div>
    )
}
