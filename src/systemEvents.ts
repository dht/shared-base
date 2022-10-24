import { ts } from '@gdi/language';

export type SystemEvent = {
    id: number;
    timestamp?: number;
    timestampText?: string;
} & Json;

export type LogCallback = (event: SystemEvent) => void;

type Listener = (event: SystemEvent) => void;
let listeners: Listener[] = [];
let index = 0;

const attempts: Record<string, number> = {};

const now = ts();

const deltaText = () => {
    const delta = (ts() - now) / 1000;
    return delta.toFixed(2);
};

export const notifyListeners = (eventId: string, data: Json = {}) => {
    attempts[data.id] = attempts[data.id] ?? 0;
    attempts[data.id]++;

    if (listeners.length === 0 && attempts[data.id] < 10) {
        setTimeout(() => notifyListeners(eventId, data), 500);
        return;
    } else {
        delete attempts[data.id];
    }

    listeners.forEach((listener) => {
        if (typeof listener === 'function') {
            listener(data as SystemEvent);
        }
    });
};

export const systemEvent = (eventId: string, data: Json = {}) => {
    if (oneTimeEventMap[eventId]) {
        return;
    }

    if (oneTimeEvents.includes(eventId)) {
        oneTimeEventMap[eventId] = true;
    }

    if (!data.id) {
        const id = index++;
        attempts[id] = (attempts[id] ?? 0) + 1;
        data.id = id;
        data.timestamp = ts();
        data.timestampText = deltaText();
        data.eventId = eventId;
    }

    notifyListeners(eventId, data);
};

export const $s = systemEvent;

export const listenToSystemEvents = (callback: LogCallback) => {
    const listener = (event: SystemEvent) => {
        callback(event);
    };

    listeners.push(listener);

    return () => {
        listeners = listeners.filter((item) => item !== listener);
    };
};

const oneTimeEvents = [
    'all routes',
    'main routes',
    '<Bootstrap /> ready',
    '<Bootstrap /> not ready',
];

const oneTimeEventMap: Record<string, boolean> = {};
