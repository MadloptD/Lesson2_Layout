import {FlexAlignType, ImageResizeMode} from "react-native";

type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
type FlexJustifyType = "flex-start" | "flex-end" | "center" | "space-between" | "space-around";

export const FlexAlign = {
    start: "flex-start" as FlexAlignType,
    end: "flex-end" as FlexAlignType,
    center: "center" as FlexAlignType,
    stretch: "stretch" as FlexAlignType,
};
export const FlexJustify = {
    start: "flex-start" as FlexJustifyType,
    end: "flex-end" as FlexJustifyType,
    center: "center" as FlexJustifyType,
    spaceBetween: "space-between" as FlexJustifyType,
    spaceAround: "space-around" as FlexJustifyType,
};
export const FlexDirectionType = {
    row: "row" as FlexDirection,
    column: "column" as FlexDirection,
    rowReverse: "row-reverse" as FlexDirection,
    columnReverse: "column-reverse" as FlexDirection
};

export const FlexStyles = {
    align: {
        start: "flex-start" as FlexAlignType,
        end: "flex-end" as FlexAlignType,
        center: "center" as FlexAlignType,
        stretch: "stretch" as FlexAlignType,
    },
    justify: {
        start: "flex-start" as FlexJustifyType,
        end: "flex-end" as FlexJustifyType,
        center: "center" as FlexJustifyType,
        spaceBetween: "space-between" as FlexJustifyType,
        spaceAround: "space-around" as FlexJustifyType,
    },
    direction: {
        row: "row" as FlexDirection,
        column: "column" as FlexDirection,
        rowReverse: "row-reverse" as FlexDirection,
        columnReverse: "column-reverse" as FlexDirection
    },
    resizeMode: {
        contain: "contain" as ImageResizeMode,
        cover: "cover" as ImageResizeMode,
        stretch: "stretch" as ImageResizeMode,
        center: "center"  as ImageResizeMode,
        repeat: "repeat"as ImageResizeMode,
    }
};

export class FlexDimension {
    static null: any = null;
}
