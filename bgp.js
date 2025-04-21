const vrData = {}

async function loadData(url, markAs) {
    const req = await fetch(url)
    const data = await req.json()
    for (const id of data) {
        vrData[id] = markAs
    }
    console.log(vrData)
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.req == 'check_support') {
        sendResponse(vrData[message.gameId])
    }
});

loadData("https://rbxvr.himaji.xyz/data/native-ids.json", "native")
loadData("https://rbxvr.himaji.xyz/data/nexus-ids.json", "nexus")
loadData("https://rbxvr.himaji.xyz/data/avatar-gestures-ids.json", "avatar-gestures")
