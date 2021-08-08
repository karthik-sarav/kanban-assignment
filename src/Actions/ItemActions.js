export const addItems = (newItem) => {
    return {
        type: "ADD_ITEMS",
        payload: newItem
    }
}

export const reorderItems = (reorderedItems) => {
    return {
        type: "REORDER_ITEMS",
        payload: reorderedItems
    }
}

