console.log("Roblox VR Looker > mainpage.js")

async function main() {

    const extraStyle = document.createElement("style")
    extraStyle.innerHTML = `
    .game-card-thumb {
        position: relative;
    }

    .rbxvr-tag {
        background-color: rgba(0,0,0,0.8);
        display: inline;
        padding: 4px 8px;
        position: absolute;
        bottom: 4px;
        left: 4px;
        border-radius: 4px;
        font-size: 0.8em !important;
        z-index: 20;
    }
    `

    document.body.append(extraStyle)

    const checkVR = (gameCardLink) => {
        const url = new URL(gameCardLink.getAttribute("href"))
        const pathName = url.pathname.replace(url.search, "").split("/")
        const gameId = pathName[2]

        chrome.runtime.sendMessage({
            req: "check_support",
            gameId
        }, (response) => {
            let thumbEl = gameCardLink.querySelector(".game-card-thumb-container, .featured-game-icon-container")

            if (!thumbEl) {
                return
            }

            thumbEl.style.position = "relative"

            if (response) {
                const divAddon = document.createElement("div")
                divAddon.innerHTML = "VR"
                divAddon.classList.add("rbxvr-tag")
                thumbEl.append(divAddon)
            }
        })
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    node.querySelectorAll(".game-card-link").forEach((child) => {
                        checkVR(child)
                    });
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

main()