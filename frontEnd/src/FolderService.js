const getFolders = async () => {
    try {
        const response = await fetch(`http://localhost:8080/folder/all`, requestOptionsGet);
        const json = await response.json();
    } catch (err) {
        console.warn("Something went wrong fetching the API...", err);
    }
}
module.exports = {
  getFolders
};
