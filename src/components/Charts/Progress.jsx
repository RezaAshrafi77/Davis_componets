/* eslint-disable react/prop-types */
import classNames from "classnames"
import { Divider } from "../Divider"
import { Label } from "../Label"

export const ProgressChart = ({
    className,
    ranges,
    value,
    divider = "center",
    containerClassName,
    labelClassName,
    label,
    userGuide,
    archive,
    educationalContent,
    questionKey,
    required,
    en,
    dividerClassName,
}) => {
    let Max, target, targetColor, targetWidth
    if (value) {
        Max = ranges[ranges.length - 1].value.max
        // Min = ranges[0].value.min
        target =
            ranges.find((item) => item.value.max > value) ||
            ranges[ranges.length - 1]
        targetColor = target.color
        targetWidth = (value / Max) * 100 + "%"
    }

    const labelDirectionStyle = {
        center: "label-center",
        right: "label-right",
        left: "label-left",
    }

    return (
        <div
            className={classNames(
                "bg-formItem w-full flex flex-col relative p-2 rounded",
                containerClassName
            )}
            style={{
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
            }}
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
                    required={required}
                    en={en}
                />
            )}
            {divider && (
                <Divider
                    className={classNames(dividerClassName)}
                    position={divider}
                />
            )}
            <div
                className={classNames(
                    className,
                    "bg-[#e7e7e7] w-full flex justify-end h-6 lg:h-8 rounded overflow-hidden"
                )}
            >
                <div
                    className={`h-full flex justify-center items-center rounded-r transition-all origin-left duration-500 overflow-hidden`}
                    style={{
                        width: targetWidth || 0,
                        background: `linear-gradient(90deg, ${
                            targetColor + "aa"
                        } 0%, ${targetColor} 100%)`,
                    }}
                >
                    <span className="text-2xs lg:text-xs bg-black bg-opacity-30 text-white w-fit px-1 pt-[1px] rounded">
                        {value}
                    </span>
                </div>
            </div>
        </div>
    )
}
