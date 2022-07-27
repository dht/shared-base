export function downloadJson(
    data: Json,

    filename: string
) {
    const type: string = 'application/json';
    const dataString = JSON.stringify(data, null, 4);
    let blob = new Blob([dataString], { type });
    let url = window.URL.createObjectURL(blob);
    downloadURI(url, filename);
    window.URL.revokeObjectURL(url);
}

function downloadURI(uri: string, filename: string) {
    let link = document.createElement('a');
    link.download = filename;
    link.href = uri;
    link.click();
}
