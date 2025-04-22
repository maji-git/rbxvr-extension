console.log("Roblox VR Looker")

const pathName = location.pathname.replace(location.search, "").split("/")
const gameId = pathName[2]

// https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};


async function main() {
    await waitForElm(".game-stat-container")
    await delay(1000)

    const gameStatContainer = document.querySelector(".game-stat-container")

    chrome.runtime.sendMessage({
        req: "check_support",
        gameId
    }, (response) => {
        let vrSupportText = "No data"

        if (response == "native") {
            vrSupportText = "Supported"
        }
        if (response == "nexus") {
            vrSupportText = "Nexus VR"
        }
        if (response == "avatar-gestures") {
            vrSupportText = "Avatar Gestures"
        }

        if (response) {
            gameStatContainer.innerHTML += `
            <li class="game-stat"><p class="text-label text-overflow font-caption-header">VR Support</p><p class="text-lead font-caption-body">${vrSupportText}</p></li>
            `
        }
    })
}

main()