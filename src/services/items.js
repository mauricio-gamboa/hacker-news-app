// Constants
import {
    GET_TOP_ITEMS_URL,
    GET_ITEM_URL,
    PAGE_SIZE,
    ITEMS_IDS_KEY,
    ITEMS_KEY
} from '../contants';

// Services
import {
    setItem,
    getItem
} from './store';

async function getItemsIds() {
    // Gets the tops items (only ids) from local storage
    let data = getItem(ITEMS_IDS_KEY);

    if (data.length) {
        return data;
    }

    // Gets the tops items (only ids) from the HN API
    const res = await fetch(GET_TOP_ITEMS_URL);
    data = await res.json();

    // Saves the tops items (only ids) in local storage
    setItem(ITEMS_IDS_KEY, data);

    return data;
}

async function getOneItem(id) {
    // Gets the item from the local storage (whole object)
    const itemFound = getOneFromStorage(id);

    if (itemFound) {
        return itemFound;
    }

    // Gets the item from the HN API storage (whole object)
    const res = await fetch(`${GET_ITEM_URL}/${id}.json`);
    const data = await res.json();

    return data;
}

function getOneFromStorage(id) {
    const items = getItem(ITEMS_KEY);
    const found = items.find(item => parseInt(item.id) === parseInt(id));
    return found;
}

async function getItems(currentPage = 0) {
    const ids = getItem(ITEMS_IDS_KEY);

    if (!ids.length) {
        return [];
    }

    const data = await getRange(ids, currentPage);
    const items = getItem(ITEMS_KEY);
    const newItems = [...items, ...data];

    setItem(ITEMS_KEY, newItems);

    return data;
}

async function getComments(commentsIds, currentPage = 0) {
    if (!commentsIds.length) {
        return [];
    }

    const comments = await getRange(commentsIds, currentPage);

    return comments;
}

async function getRange(array, chunck) {
    let range = [];

    if (!array.length) {
        return range;
    }

    const data = [];

    const pageChunk = chunck * PAGE_SIZE;
    range = array.slice(pageChunk, pageChunk + PAGE_SIZE);

    for (let i = 0; i < range.length; i++) {
        const item = await getOneItem(range[i]);
        data.push(item);
    }

    return data;
}

export {
    getItemsIds,
    getItems,
    getOneFromStorage,
    getComments
};