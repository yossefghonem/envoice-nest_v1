import { ItemTypes } from "../enums/itemTypes.enum";

export function isItemType(type: string | ItemTypes): type is ItemTypes {
    return Object.values(ItemTypes).includes(type as ItemTypes);
}