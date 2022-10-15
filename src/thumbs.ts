import { get } from 'lodash';

export const getScreenshotThumb = (widget: Json) => {
    const { screenshots } = widget || {};

    if (!screenshots) {
        return '';
    }

    const firstKey = Object.keys(screenshots).pop();

    const thumbUrl = get(
        widget,
        `screenshots.${firstKey}.desktop.thumb.url`,
        ''
    );

    const thumbRatio = get(
        widget,
        `screenshots.${firstKey}.desktop.thumb.ratio`,
        ''
    );

    return {
        thumbUrl,
        thumbRatio,
    };
};

export const getScreenshot = (widget: Json) => {
    const { screenshots } = widget || {};

    if (!screenshots) {
        return '';
    }

    const firstKey = Object.keys(screenshots).pop();

    const imageUrl = get(
        widget,
        `screenshots.${firstKey}.desktop.large.url`,
        ''
    );

    const imageRatio = get(
        widget,
        `screenshots.${firstKey}.desktop.large.ratio`,
        ''
    );

    return {
        imageUrl,
        imageRatio,
    };
};
