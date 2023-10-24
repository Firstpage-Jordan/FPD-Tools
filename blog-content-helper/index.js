const submitButton = document.querySelector(".submit-button");
const inputField = document.querySelector(".input--text-area");
const outputField = document.querySelector(".output--text-area");
const outputHTML = document.querySelector(".output-html");
const clearButton = document.querySelector(".clear-button");
const scrollUpButton = document.querySelector(".scroll-up-button");
const copyPreviewButton = document.querySelector(".copy-preview-button");

const message = document.querySelector(".message");
const copyButton = document.querySelector(".copy-button");

submitButton.addEventListener("click", function () {
  let uncleanContent = inputField.value;
  // clean content
  splitContent = uncleanContent.split(/\r?\n/);
  // console.log(splitContent);

  const headers = ["H1", "H2", "H3", "H4", "H5"];

  let cleanedContent = splitContent.map((line) => {
    headers.some((header) => {
      if (line.includes(header)) {
        // console.log(`${line} contains ${header}`);
        line = line
          .replace(/<strong>/g, "")
          .replace(/<\/strong>/g, "")
          .replace(`${header} `, "")
          .replace("<p>", `<${header.toLowerCase()}><strong>`)
          .replace("</p>", `</strong></${header.toLowerCase()}>`);

        // console.log(line);
      }
    });

    // output success message
    message.classList.remove("hide");

    // show copy preview button
    copyPreviewButton.style.display = "block";

    return line;
  });

  // console.log(cleanedContent);

  cleanContentJoined = cleanedContent.join("\r\n");

  // output cleaned content
  outputField.value = cleanContentJoined;

  // output the HTML
  outputHTML.innerHTML = cleanContentJoined;
});

copyButton.addEventListener("click", () => {
  let cleanedContent = outputField.value;
  let originalButtonContent = copyButton.innerHTML;

  // copy output content to clipboard
  navigator.clipboard.writeText(cleanedContent);

  // edit button text
  copyButton.textContent = "Copied to clipboard!";

  // reset button text to original after 2 seconds
  setTimeout(() => {
    copyButton.innerHTML = originalButtonContent;
  }, 1500);
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
  outputHTML.innerHTML = "";
  // hide copy preview button
  copyPreviewButton.style.display = "none";
});

// scroll to top
scrollUpButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// show scroll button when user scrolls down
window.addEventListener("scroll", (e) => {
  scrollUpButton.style.display = window.scrollY > 20 ? "block" : "none";
});

// copy preview button
copyPreviewButton.addEventListener("click", () => {
  let previewContent = outputHTML.innerHTML;
  let originalButtonContent = copyPreviewButton.innerHTML;

  // copy output content to clipboard
  navigator.clipboard.writeText(previewContent);

  // edit button text
  copyPreviewButton.textContent = "Copied to clipboard!";

  // reset button text to original after 2 seconds
  setTimeout(() => {
    copyPreviewButton.innerHTML = originalButtonContent;
  }, 1500);
});
