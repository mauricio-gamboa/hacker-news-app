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
    const data = [];

    if (!ids.length) {
        return data;
    }

    const multiplier = currentPage * PAGE_SIZE;
    const range = ids.slice(multiplier, multiplier + PAGE_SIZE);

    for (let i = 0; i < range.length; i++) {
        const hack = await getOneHack(range[i]);
        data.push(hack);
    }

    const hacks = getItem(HACKS_KEY);
    const newHacks = [...hacks, ...data];
    setItem(HACKS_KEY, newHacks);

    return data;
}

export {
    processHacks,
    getHacks
};