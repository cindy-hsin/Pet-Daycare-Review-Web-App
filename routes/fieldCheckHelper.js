
function checkEntryRequiredField(name, address, hasGrooming, hasBoarding) {
    const result = {pass: true, message: ""};
    if (!name || name.trim().length === 0) {
        result.pass = false;
        result.message += "Missing entry's name input."
    }
    if (!address || address.trim().length === 0) {
        result.pass = false;
        result.message += " Missing entry's address input.";
    }
    if (typeof(hasGrooming) === "undefined" || hasGrooming === null) {
        result.pass = false;
        result.message += " Missing entry's hasGrooming input.";
    }
    if (typeof(hasBoarding) === "undefined" || hasGrooming === null) {
        result.pass = false;
        result.message += " Missing entry's hasBoarding input.";
    }
    return result;   
}


function checkReviewRequiredField(content, rating) {
    const result = {pass: true, message: ""};
    console.log("In check, content: ", content, "rating: ", rating)
    if (!content || content.trim().length === 0) {
        result.pass = false;
        result.message += "Missing reivew's content input."
    }
    if (typeof(rating) === "undefined" || rating === null) { 
        result.pass = false;
        result.message += " Missing reivew's rating input.";
    }
    return result;   
}

module.exports = {
    checkEntryRequiredField,
    checkReviewRequiredField
}