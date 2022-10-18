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

export const getScreenshotData = (widget: Json) => {
    const data = {
        ...getScreenshot(widget),
        ...getScreenshotThumb(widget),
    };

    return {
        imageUrl: data.imageUrl,
        imageThumbUrl: data.thumbUrl,
        ratio: data.imageRatio,
    };
};

export const rawImageUrlToUrls = (
    rawImageUrl: string,
    folderName: string,
    imageId: string
) => {
    const parts = rawImageUrl.split(/\/|%2F/);
    parts.pop();
    parts.pop();
    parts.push(folderName);

    const base = parts.join('/') + encodeURIComponent('/');

    const imageUrl = [base, `${imageId}.webp?alt=media`].join('');
    const imageThumbUrl = [base, `${imageId}_thumb.webp?alt=media`].join('');

    return {
        imageUrl,
        imageThumbUrl,
    };
};
