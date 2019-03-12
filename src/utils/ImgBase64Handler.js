/**
 * Add base64 tag, like data:image/img;base64
 * @param responseData
 */
module.exports = function handleImgBase64Data(responseData) {
    let headers = responseData.headers || {};
    let contentType = (headers["content-type"] || headers["Content-Type"] || "")
        .toString().toLowerCase();
    if (contentType.indexOf("image") !== -1
        && responseData.responseText.indexOf("base64") === -1) {
        responseData.responseText = `data:${contentType};base64,` + responseData.responseText;
    }
}
