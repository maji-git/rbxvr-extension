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
    await delay(1000)
    console.log("delay passed")
    await waitForElm(".game-stat-container")
    console.log("stat found")

    const gameStatContainer = document.querySelector(".game-stat-container")

    console.log(gameStatContainer)

    chrome.runtime.sendMessage({
        req: "check_support",
        gameId
    }, (response) => {
        let vrSupportText = "No data"
        let vrSupportSubtext = "This game either does not have VR support or hasn't been checked for VR support yet."

        if (response == "native") {
            vrSupportText = "Supported"
            vrSupportSubtext = "This game supports VR out of the box."
        }
        if (response == "nexus") {
            vrSupportText = "Nexus VR"
            vrSupportSubtext = "This game supports VR via Nexus VR Character Model"
        }
        if (response == "avatar-gestures") {
            vrSupportText = "Avatar Gestures"
            vrSupportSubtext = "This game supports VR via Avatar Gestures"
        }

        gameStatContainer.innerHTML += `
            <li class="game-stat"><p class="text-label text-overflow font-caption-header">VR</p><p class="text-lead font-caption-body" title="${vrSupportSubtext}">${vrSupportText}</p></li>
            `
    })
}

main()