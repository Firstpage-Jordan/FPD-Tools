const submitButton = document.querySelector(".submit-button");
const inputField = document.querySelector(".input--text-area");
const outputField = document.querySelector(".output--text-area");
const outputhtml = document.querySelector(".output-html");
const clearButton = document.querySelector(".clear-button");

const message = document.querySelector(".message");
const copyButton = document.querySelector(".copy-button");

submitButton.addEventListener("click", function () {
  let uncleanContent = inputField.value;

  // split content into lines
  splitContent = uncleanContent.split(/\r?\n/);

  const headers = ["H1", "H2", "H3", "H4", "H5"];

  let cleanedContent = splitContent.map((line) => {
    headers.some((header) => {
      if (line.includes(header)) {
        // if the line is a header but has <p> tag
        if (line.includes("<p>")) {
          line = line
            .replace(/<strong>/g, "") // remove all <strong>
            .replace(/<\/strong>/g, "") // remove all </strong>
            .replace(`${header} `, "") // remove H2, H3, H4, etc.
            .replace("<p>", `<${header.toLowerCase()}><strong>`)
            .replace("</p>", `</strong></${header.toLowerCase()}>`);
        } else {
          // if line is a header and already has header tag
          line = line
            .replace(/(<[a-z0-9]{1,}>)/g, "") // remove all <>
            .replace(/(<\/[a-z0-9]{1,}>)/g, "") // remove all </>
            .replace(`${header} `, "");
          line = `<${header.toLowerCase()}><strong>` + line;
          line += `</strong></${header.toLowerCase()}>`;
        }
      }
    });

    // output success message
    message.classList.remove("hide");

    return line;
  });

  cleanContentJoined = cleanedContent.join("\r\n");

  // output cleaned content
  outputField.value = cleanContentJoined;

  // output the HTML
  outputhtml.innerHTML = cleanContentJoined;
});

copyButton.addEventListener("click", () => {
  let cleanedContent = outputField.value;

  // copy output content to clipboard
  navigator.clipboard.writeText(cleanedContent);

  // edit button text
  copyButton.textContent = "Copied to clipboard!";
});

// focus on input field when window loads
window.addEventListener("load", () => {
  inputField.focus();
});

// clear input and output fields
clearButton.addEventListener("click", () => {
  inputField.value = "";
  outputField.value = "";
  message.classList.add("hide");
  outputhtml.innerHTML = "";
});
