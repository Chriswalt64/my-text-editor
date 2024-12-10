const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");

document.querySelector("textarea").addEventListener("keydown", (e) => {
  if (e.key == "Tab") {
    e.preventDefault();
    const textArea = e.currentTarget;
    textArea.setRangeText(
      "\t",
      textArea.selectionStart,
      textArea.selectionEnd,
      "end"
    );
  }
});

const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());

function saveFile() {
  const text = document.getElementById('textArea').value;
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'note.txt';
  link.click();
}

function openFile() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.txt';
  input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
          document.getElementById('textArea').value = reader.result;
      };
      reader.readAsText(file);
  };
  input.click();
}