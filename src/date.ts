import {
    getDayOfYear,
    startOfWeek as startOfWeekOriginal,
    addDays,
    setDayOfYear,
    getQuarter,
    getDay,
    setQuarter,
    getISOWeek,
    setISOWeek,
    format,
    format as formatOriginal,
    setYear,
    setWeek,
    setDay,
    addWeeks,
    addMinutes,
    getWeek,
    getYear,
    isToday,
    intervalToDuration,
    formatDuration,
} from 'date-fns';
import { enUS, he as defaultLocale } from 'date-fns/locale';

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

export const startOfWeek = (date: Date) => {
    return startOfWeekOriginal(date, { locale: defaultLocale });
};

export const weekAndDOWToInfo = (
    week: number,
    dayOfWeek: number
): Partial<DateInfo> => {
    const now = new Date();
    const dateWeek = setISOWeek(now, week);
    const dateWeekStart = startOfWeek(dateWeek);
    const date = addDays(dateWeekStart, dayOfWeek);

    return {
        dayOfWeek,
        dayOfYear: getDayOfYear(date),
        week: getISOWeek(date),
        quarter: getQuarter(date),
        dayOfWeekName: days[dayOfWeek],
        dateString: date.toString(),
    };
};

export const dayAbsoluteToInfo = (dayAbsolute: number) => {
    const now = new Date();
    const date = setDayOfYear(now, dayAbsolute);
    const dayOfWeek = getDay(date);

    return {
        dayOfWeek,
        dayOfYear: getDayOfYear(date),
        week: getISOWeek(date),
        quarter: getQuarter(date),
        dayOfWeekName: days[dayOfWeek],
        dateString: date.toString(),
    };
};

export const checkWhetherIsInPast = ({
    day = 0,
    week = 0,
    quarter = 0,
}: {
    day?: number;
    week?: number;
    quarter?: number;
}) => {
    const now = new Date();
    let date = new Date();

    if (quarter) {
        date = setQuarter(date, quarter);
    }

    if (week) {
        date = setISOWeek(date, week);
    }

    if (day) {
        date = setDayOfYear(date, day);
    }

    return date.getTime() <= now.getTime();
};

export const weekToDateText = (week: number) => {
    const date = setISOWeek(new Date(), week);
    const weekStart = startOfWeek(date);
    return format(weekStart, 'd.M');
};

export const dayAbsoluteToDateText = (dayAbsolute: number) => {
    const date = setDayOfYear(new Date(), dayAbsolute);
    return format(date, 'd.M');
};

export const timestamp = () => new Date().getTime();
export const ts = timestamp;

export const dateFilename = (suffix: string) => {
    return format(new Date(), 'yyyy-MM-dd-') + suffix;
};

export class SimpleDate {
    static fromWeek(weekPointer: WeekPointer, dayOfWeek: number = 0) {
        let now = new Date();
        now = setYear(now, weekPointer.year);
        now = setWeek(now, weekPointer.week, { locale: defaultLocale });
        now = setDay(now, dayOfWeek);
        return new SimpleDate(now);
    }

    constructor(private date: Date = new Date()) {}

    addWeeks(weeks: number) {
        this.date = addWeeks(this.date, weeks);
        return this;
    }

    addMinutes(minutes: number) {
        this.date = addMinutes(this.date, minutes);
        return this;
    }

    setDayOfWeek(dayOfWeek: number) {
        this.date = setDay(this.date, dayOfWeek);
        return this;
    }

    format(format: string, options: any = { locale: defaultLocale }) {
        return formatOriginal(this.date, format, options);
    }

    toInfo(): DateInfo {
        const dayOfWeekName = this.format('eeee', {
            locale: enUS,
        });
        const dayOfWeekShortName = this.format('eee', {
            locale: enUS,
        });
        const yearShort = this.format('yy');
        const week = getWeek(this.date, { locale: defaultLocale });
        const weekAndYear = `W${week}-${yearShort}`;

        return {
            dayOfWeek: getDay(this.date),
            dayOfYear: getDayOfYear(this.date),
            week,
            year: getYear(this.date),
            quarter: getQuarter(this.date),
            hour: this.format('HH:mm'),
            yearShort,
            dayOfWeekName,
            dayOfWeekShortName,
            weekAndYear,
            dateString: this.format('dd-MM'),
            dateShortString: formatOriginal(this.date, 'iiii, MMM do'),
            dateStringFull: this.date.toString(),
            isToday: isToday(this.date),
        };
    }

    isDayTime() {
        return parseInt(this.format('HH')) < 16;
    }

    toText() {
        return this.format('yyyy-MM-dd');
    }

    value() {
        return this.date;
    }
}

export const myUTC = () => {
    return -new Date().getTimezoneOffset() / 60;
};

export const calculateUTC = (deltaInMinutes: number) => {
    let utcPlus = Math.round(myUTC() + deltaInMinutes / 60);

    if (utcPlus < -11) {
        utcPlus += 24;
    }

    const sign = utcPlus >= 0 ? '+' : '-';
    const utc = `${sign}${Math.abs(utcPlus)}`;
    const cities = (timezones as any)[utc];
    const randomCity = cities[0];

    const cityImageUrl = `https://appofthebox.web.app/cities/${randomCity}.webp`;
    const radioUrl = (radio as any)[randomCity];

    return {
        alternativeUtc: `UTC${utc}`,
        alternativeCity: randomCity,
        alternativeCityImageUrl: cityImageUrl,
        alternativeRadioUrl: radioUrl,
    };
};

export type WeekPointer = {
    week: number;
    year: number;
    isCurrentWeek?: boolean;
    weekAndYear?: string;
};

type DateInfo = {
    dayOfWeek: number;
    dayOfYear: number;
    week: number;
    year: number;
    yearShort: string;
    quarter: number;
    hour: string;
    dayOfWeekName: string;
    dayOfWeekShortName: string;
    dateString: string;
    dateShortString: string;
    dateStringFull: string;
    weekAndYear: string;
    isToday?: boolean;
};

export const timezones = {
    '-12': ['Christchurch'],
    '-11': ['Pago Pago'],
    '-10': ['Honolulu'],
    '-9': ['French Polynesia'],
    '-8': ['San Francisco'],
    '-7': ['Whitehorse'],
    '-6': ['Austin'],
    '-5': ['New York'],
    '-4': ['Barbados'],
    '-3': ['Buenos Aires'],
    '-2': ['Itamaracá'],
    '-1': ['Santa Cruz'],
    '+0': ['London'],
    '+1': ['Amsterdam'],
    '+2': ['Cairo'],
    '+3': ['Tel-Aviv'],
    '+4': ['Tbilisi'],
    '+5': ['Maldives'],
    '+6': ['Mumbai'],
    '+7': ['Bankok'],
    '+8': ['Beijing'],
    '+9': ['Tokyo'],
    '+10': ['Melbourne'],
    '+11': ['Papa New Guinea'],
    '+12': ['Christchurch'],
};

export const radio = {
    'Pago Pago': 'http://radio.garden/listen/wvuv-103-1-fm/41xZzhTO',
    Honolulu: 'http://radio.garden/listen/radio-98-5-island-fm/Ol16IwzA',
    'French Polynesia': 'http://radio.garden/listen/ouest-fm/C95fTvwp',
    Vancouver: 'http://radio.garden/listen/cfox/kYd8MIrZ',
    'San Francisco': 'http://radio.garden/listen/kpoo-fm-89-5/ZhyqK6kK',
    Whitehorse: 'http://radio.garden/listen/khns/jEB86GY4',
    Denver: 'http://radio.garden/listen/radio-shadow-deep-tracks/zBIyMp55',
    Austin: 'http://radio.garden/listen/austin-blues-radio/_hQCemA1',
    'New York': 'http://radio.garden/listen/soul-cafe-radio/gHzbeiVp',
    Barbados: 'http://radio.garden/listen/y-103-3-fm/RthOQq4O',
    Cairo: 'http://radio.garden/listen/radio-90s-fm/CGj0W1yp',
    'Buenos Aires': 'http://radio.garden/listen/radio-arinfo/Q1MOv09g',
    Itamaracá: 'http://radio.garden/listen/radio-104-9-arraiana-fm/EcrZEliD',
    'Santa Cruz': 'http://radio.garden/listen/radio-union-tenerife/fg1phjAh',
    London: 'http://radio.garden/listen/bbc-radio-4/CO4JBP8X',
    Amsterdam: 'http://radio.garden/listen/musiq1/hyynosL8',
    'Tel-Aviv': 'http://radio.garden/listen/eco99fm/FnF2nzhL',
    Istanbul: 'http://radio.garden/listen/power-tuerk-en-iyiler/QJZitTi_',
    Tbilisi: 'http://radio.garden/listen/relaxwebradio/2CTNaBPB',
    Maldives: 'http://radio.garden/visit/khasab/suj4Lm1u',
    Mumbai: 'http://radio.garden/listen/radio-urja/7YVA8yrB',
    Bankok: 'http://radio.garden/listen/ployradio-thailand/KT4ofnbU',
    Beijing: 'http://radio.garden/listen/cnr-1-voice-of-china/zIDhCGMk',
    Tokyo: 'http://radio.garden/listen/ottava/rDch0y97',
    Melbourne: 'http://radio.garden/listen/gk-international/Ry9m7iE1',
    'Papa New Guinea': 'http://radio.garden/visit/tobelo/ee9bSQR7',
    Christchurch: 'http://radio.garden/listen/the-breeze-fm-93-4/Jp5DQhph',
};

export const timeAgo = (date: Date | string | number) => {
    try {
        if (typeof date === 'string' || typeof date === 'number') {
            date = new Date(date);
        }

        const now = new Date();

        const duration = intervalToDuration({
            start: date.getTime(),
            end: now.getTime(),
        });

        duration.seconds = 0;

        const output = formatDuration(duration);

        return output ? output + ' ago' : 'Just now';
    } catch (_err) {
        return '';
    }
};

export const shortDate = (date: Date | string | number) => {
    try {
        if (typeof date === 'string' || typeof date === 'number') {
            date = new Date(date);
        }

        const today = isToday(date);

        if (today) {
            return format(date, 'HH:mm');
        }

        return format(date, 'd-MM HH:mm');
    } catch (_err) {
        return '';
    }
};
