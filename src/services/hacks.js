// Constants
import {
    GET_TOP_STORIES_URL,
    GET_HACK_URL,
    PAGE_SIZE,
    HACKS_IDS_KEY
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
    // 1. Get the hack from the HN API.
    const res = await fetch(`${GET_HACK_URL}/${id}.json`);
    const data = await res.json();

    // 3. Return it.
    return data;
}

async function getHacks(currentPage = 0) {
    const ids = getItem(HACKS_IDS_KEY);
    const data = [];

    if (!ids.length) {
        return data;
    }

    const start = currentPage * PAGE_SIZE;
    const end = (PAGE_SIZE * currentPage) + PAGE_SIZE;
    const range = ids.slice(start, end);

    for (let i = 0; i < range.length; i++) {
        const hack = await getOneHack(range[i]);
        data.push(hack);
    }

    return data;
}

export {
    processHacks,
    getHacks
};