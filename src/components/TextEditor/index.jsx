/* eslint-disable react/prop-types */
import classNames from "classnames";
import { Divider } from "../Divider";
import { Label } from "../Label";
import { BiError } from "react-icons/bi";
import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "./styles.module.css";
import { HiOutlinePrinter } from "react-icons/hi";
import { printThis } from "../../utils/printThis";
import { EditorState } from "draft-js";

export const TextEditor = forwardRef(
  (
    {
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
    },
    ref
  ) => {
    const toolbarColors = [
      "rgb(97,189,109)",
      "rgb(26,188,156)",
      "rgb(84,172,210)",
      "rgb(44,130,201)",
      "rgb(147,101,184)",
      "rgb(71,85,119)",
      "rgb(204,204,204)",
      "rgb(65,168,95)",
      "rgb(0,168,133)",
      "rgb(61,142,185)",
      "rgb(41,105,176)",
      "rgb(85,57,130)",
      "rgb(40,50,78)",
      "rgb(0,0,0)",
      "rgb(247,218,100)",
      "rgb(251,160,38)",
      "rgb(235,107,86)",
      "rgb(226,80,65)",
      "rgb(163,143,132)",
      "rgb(239,239,239)",
      "rgb(255,255,255)",
      "rgb(250,197,28)",
      "rgb(243,121,52)",
      "rgb(209,72,65)",
      "rgb(184,49,47)",
      "rgb(124,112,107)",
      "rgb(209,213,216)",
    ];

    const {
      watch,
      setValue,
      register,
      formState: { errors },
    } = useFormContext();

    const [editorState, setEditorState] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const EditorRef = useRef(null);

    const handleAppendText = (value) => {
      if (!editorState) return;

      const contentState = editorState.getCurrentContent();
      const selection = editorState.getSelection();
      const newText = value;

      const newContentState = Modifier.insertText(
        contentState,
        selection,
        newText
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "insert-characters"
      );

      setEditorState(newEditorState);

      const html = window.stateToHTML(newContentState);
      setValue(questionKey, html, { shouldValidate: true });
    };

    const clear = () => {
      setEditorState(EditorState.createEmpty());
      setValue(questionKey, "", { shouldValidate: true });
    };

    useEffect(() => {
      register(questionKey, validation);

      const loadEditorLibraries = async () => {
        try {
          const [
            { Editor },
            {
              EditorState,
              convertToRaw,
              Modifier,
              ContentState,
              convertFromRaw,
            },
            htmlToDraftModule,
            { stateToHTML },
          ] = await Promise.all([
            import("react-draft-wysiwyg"),
            import("draft-js"),
            import("html-to-draftjs"),
            import("draft-js-export-html"),
          ]);

          // Assign the dynamically imported components/functions
          EditorRef.current = Editor;
          const htmlToDraft = htmlToDraftModule.default;

          // Initialize editor state
          const getEditorState = () => {
            const value = watch(questionKey);
            if (!value) return EditorState.createEmpty();

            try {
              if (typeof value === "string") {
                const parsedValue = JSON.parse(value);
                if (parsedValue.blocks) {
                  return EditorState.createWithContent(
                    convertFromRaw(parsedValue)
                  );
                }
              }
            } catch (error) {
              console.warn("Text editor error");
            }

            // If JSON parsing fails, assume it's HTML
            const blocksFromHTML = htmlToDraft(value);
            if (blocksFromHTML) {
              const contentState = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
              );
              return EditorState.createWithContent(contentState);
            }

            return EditorState.createEmpty();
          };

          setEditorState(getEditorState());
          setIsLoading(false);

          // Save stateToHTML for later use
          window.stateToHTML = stateToHTML;
          window.convertToRaw = convertToRaw;
          window.Modifier = Modifier;
          window.EditorState = EditorState;
        } catch (error) {
          console.error("Failed to load editor libraries:", error);
        }
      };

      loadEditorLibraries();
    }, []);

    // Now move useImperativeHandle BELOW handleAppendText
    useImperativeHandle(ref, () => ({
      appendText: handleAppendText,
      clear: clear,
    }));

    const handleEditorChange = (newState) => {
      setEditorState(newState);
      const contentState = newState.getCurrentContent();

      // Convert editor state to HTML while preserving inline styles
      const html = window.stateToHTML(contentState, {
        inlineStyleFn: (styles) => {
          const colorStyle = styles.find((style) =>
            style.startsWith("color-rgb")
          );
          const fontSizeStyle = styles.find((style) =>
            style.startsWith("fontsize-")
          );

          const styleObject = {};

          if (colorStyle) {
            styleObject.color = colorStyle.replace("color-", "");
          }

          if (fontSizeStyle) {
            styleObject.fontSize =
              fontSizeStyle.replace("fontsize-", "") + "px";
          }

          return Object.keys(styleObject).length
            ? { style: styleObject }
            : null;
        },
        blockStyleFn: (block) => {
          const alignment = block.getData()?.get("text-align");
          if (alignment) {
            return { style: { textAlign: alignment } };
          }
        },
      });

      setValue(questionKey, html, { shouldValidate: true });
    };

    // Update your style map to match exactly what's in the editor
    const styleMap = toolbarColors.reduce((styles, color) => {
      styles[`COLOR_${color}`] = {
        color: color.startsWith("#") ? color : `rgb(${color})`,
      };
      return styles;
    }, {});

    const error = errors?.[questionKey] ? errors?.[questionKey]?.message : null;

    const labelDirectionStyle = {
      center: "label-center",
      right: "label-right",
      left: "label-left",
    };

    if (isLoading) {
      return <div className="text-center py-4">Loading editor...</div>;
    }

    const Editor = EditorRef.current;

    const Print = () => {
      return (
        <div
          className="rdw-link-wrapper"
          aria-label="rdw-link-control"
          onClick={() => printThis("", watch(questionKey))}
        >
          <div className="rdw-option-wrapper" title="print">
            <HiOutlinePrinter className="xs:text-sm lg:text-xl" />
          </div>
        </div>
      );
    };

    return (
      <div
        className={classNames(
          "w-full flex flex-col relative bg-formItem p-2 rounded",
          containerClassName,
          error ? "field-error" : ""
        )}
        style={{
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
        }}
      >
        {label && (
          <Label
            className={classNames(labelClassName, labelDirectionStyle[divider])}
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
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "list",
              "textAlign",
              "colorPicker",
              "link",
              // "embedded",
              "emoji",
              "image",
              "remove",
              "history",
            ],
            textAlign: {
              inDropdown: false,
              options: ["left", "center", "right", "justify"],
            },
          }}
          editorState={editorState}
          toolbarClassName={styles.toolbar + " " + toolbarClassName}
          wrapperClassName={styles.wrapper + " " + wrapperClassName}
          editorClassName={
            styles.editor + " " + editorClassName + " " + "prose min-w-full"
          }
          onEditorStateChange={handleEditorChange} // Update form state
          readOnly={disabled}
          toolbarCustomButtons={[<Print />]}
          customStyleMap={styleMap}
        />
        {error && (
          <span className="error">
            <BiError className="text-xs lg:text-base" />
            {error}
          </span>
        )}
      </div>
    );
  }
);
