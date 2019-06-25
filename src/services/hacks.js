// Constants
import {
    GET_TOP_STORIES_URL,
    GET_HACK_URL,
    PAGE_SIZE,
    HACKS_IDS_KEY,
    HACKS_KEY
} from '../contants';

// Services
import {
    setItem,
    getItem
} from './store';

async function getAllHacks() {
    // Gets the tops hacks (only ids) from local storage
    let data = getItem(HACKS_IDS_KEY);

    if (data.length) {
        return data;
    }

    // Gets the tops hacks (only ids) from the HN API
    const res = await fetch(GET_TOP_STORIES_URL);
    data = await res.json();

    // Saves the tops hacks (only ids) in local storage
    setItem(HACKS_IDS_KEY, data);

    return data;
}

async function getOneHack(id) {
    // Gets the hack from the local storage (whole object)
    const hacks = getItem(HACKS_KEY);
    const hackFound = hacks &&
        hacks.length &&
        hacks.find(hack => hack.id === id);

    if (hackFound) {
        return hackFound;
    }

    // Gets the hack from the HN API storage (whole object)
    const res = await fetch(`${GET_HACK_URL}/${id}.json`);
    const data = await res.json();

    return data;
}

function getOneFromStorage(id) {
    const hacks = getItem(HACKS_KEY);
    const found = hacks.find(hack => parseInt(hack.id) === parseInt(id));
    return found;
}

async function getHacks(currentPage = 0) {
    const ids = getItem(HACKS_IDS_KEY);

    if (!ids.length) {
        return [];
    }

    const data = await getRange(ids, currentPage);
    const hacks = getItem(HACKS_KEY);
    const newHacks = [...hacks, ...data];

    setItem(HACKS_KEY, newHacks);

    return data;
}

async function getComments(commentsIds, currentPage = 0) {
    if (!commentsIds.length) {
        return [];
    }

    const comments = await getRange(commentsIds, currentPage);

    return comments;
}

async function getRange(array, delimiter) {
    let range = [];

    if (!array.length) {
        return range;
    }

    const data = [];

    const multiplier = delimiter * PAGE_SIZE;
    range = array.slice(multiplier, multiplier + PAGE_SIZE);

    for (let i = 0; i < range.length; i++) {
        const hack = await getOneHack(range[i]);
        data.push(hack);
    }

    return data;
}

export {
    getAllHacks,
    getHacks,
    getOneFromStorage,
    getComments
};