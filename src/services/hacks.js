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
    let data = getItem(HACKS_IDS_KEY);

    if (data.length) {
        return data;
    }

    const res = await fetch(GET_TOP_STORIES_URL);
    data = await res.json();
    return data;
}

async function processHacks() {
    const data = await getAllHacks();
    setItem(HACKS_IDS_KEY, data);
    return data;
}

async function getOneHack(id) {
    const hacks = getItem(HACKS_KEY);

    if (hacks && hacks.length) {
        const hack = hacks.find(hack => hack.id === id);

        if (hack) {
            return hack;
        }
    }

    const res = await fetch(`${GET_HACK_URL}/${id}.json`);
    const data = await res.json();
    return data;
}

async function getHacks(currentPage = 0) {
    const ids = getItem(HACKS_IDS_KEY);

    if (!ids.length) {
        return data;
    }

    const range = getRange(ids, currentPage);
    const data = [];

    for (let i = 0; i < range.length; i++) {
        const hack = await getOneHack(range[i]);
        data.push(hack);
    }

    const hacks = getItem(HACKS_KEY);
    const newHacks = [...hacks, ...data];
    setItem(HACKS_KEY, newHacks);

    return data;
}

function getOneFromStorage(id) {
    const hacks = getItem(HACKS_KEY);
    const found = hacks.find(hack => parseInt(hack.id) === parseInt(id));
    return found;
}

async function getComments(commentsIds, currentPage = 0) {
    const range = getRange(commentsIds, currentPage);
    let comments = [];

    for (let i = 0; i < range.length; i++) {
        const comment = await getOneHack(range[i]);
        comments.push(comment);
    }

    return comments;
}

function getRange(array, delimiter) {
    let range = [];

    if (!array.length) {
        return range;
    }

    const multiplier = delimiter * PAGE_SIZE;
    range = array.slice(multiplier, multiplier + PAGE_SIZE);

    return range;
}

export {
    processHacks,
    getHacks,
    getOneFromStorage,
    getComments
};