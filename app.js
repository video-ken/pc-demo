import phrases from "./data.js";

const fragment = document.createDocumentFragment();

Object.entries(phrases).forEach(([time, text], index) => {
    let word = document.createElement('span');
    word.classList.add("word");
    word.textContent = text;
    word.setAttribute("data-time", time);
    let dir = Math.max(0, 26 - text.length);
    word.setAttribute("data-dir", index % 2 === 0 ? dir : -1 * dir);
    word.style.left = Math.max((40 - text.length), 10) + '%';
    fragment.append(word);
});

preview.append(fragment);

let listener;

function movePreview(x) {
    let percentage = x/8;
    let left = x - 80;
    preview.style.transform = `translateX(${left}px)`;

    let words = preview.querySelectorAll(".word");

    for(let i=0; i<words.length; i++) {
        let word = words[i];
        let time = parseInt(word.getAttribute('data-time'));
        let dir = parseInt(word.getAttribute('data-dir'));
        console.log(dir);
        
        if(time > percentage - 10 && time < percentage + 10) {
            let difference = Math.abs(percentage - time);
            word.style.opacity = 1;
            word.style.transform = `translate(${dir}px, ${(percentage - time)*5}px) scale(${2 - difference/7})`;
        }
        else {
            word.style.opacity = 0;
        }
    }
}

timeline.addEventListener("pointerover", _ => {
    preview.style.opacity = 1;

    listener = timeline.addEventListener("pointermove", event => {
        let offset = parseInt(event.offsetX);

        requestAnimationFrame(() => {
            movePreview(offset);
        });
    });
});


timeline.addEventListener("pointerout", _ => {
    timeline.removeEventListener("pointermove", listener);
    preview.style.opacity = 0;
});