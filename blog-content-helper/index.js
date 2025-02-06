const submitButton = document.querySelector(".submit-button");
const inputField = document.querySelector(".input--text-area");
const outputField = document.querySelector(".output--text-area");
const outputhtml = document.querySelector(".output-html");
const clearButton = document.querySelector(".clear-button");
const message = document.querySelector(".message");
const copyButton = document.querySelector(".copy-button");
const copyPreviewButton = document.querySelector(".copy-preview-button");
const dhlButton = document.querySelector(".dhl-button");

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
    copyPreviewButton.classList.remove("hide");

    return line;
  });

  cleanContentJoined = cleanedContent.join("\r\n");

  // output cleaned content
  outputField.value = cleanContentJoined;

  // output the HTML
  outputhtml.innerHTML = cleanContentJoined;
});

// copy to clipboard button
copyButton.addEventListener("click", () => {
  let cleanedContent = outputField.value;

  // copy output content to clipboard
  navigator.clipboard.writeText(cleanedContent);

  // edit button text then change back to original text
  copyButton.textContent = "Copied to clipboard!";
  setTimeout(() => {
    copyButton.innerHTML =
      'Copy to clipboard <i class="fa fa-solid fa-copy"></i>';
  }, 2000);
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
  copyPreviewButton.classList.add("hide");
});

copyPreviewButton.addEventListener("click", () => {
  let r = document.createRange();
  r.selectNode(outputhtml);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand("copy");

  // edit button text
  copyPreviewButton.textContent = "Copied to clipboard!";

  // edit button text then change back to original text
  copyPreviewButton.textContent = "Copied to clipboard!";
  setTimeout(() => {
    copyPreviewButton.innerHTML =
      'Copy to clipboard <i class="fa fa-solid fa-copy"></i>';
  }, 2000);
});

// change links to red
dhlButton.addEventListener("click", () => {
  const changedOutput = outputField.value.replace(
    /<a href=/g,
    "<a style='color:#D40511 !important;' href="
  );

  outputField.value = changedOutput;

  // change the output HTML preview as well
  outputhtml.innerHTML = changedOutput;
});
