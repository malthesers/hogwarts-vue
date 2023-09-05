export default function curseHogwarts() {
  setTimeout(() => {
    document.querySelectorAll("p, input, img").forEach((element) => {
      element.addEventListener("click", (e) => {
        e.target.style.transitionDuration = "200ms";
        e.target.style.filter = "grayscale(75%)";
        e.target.style.transform = ["rotate(-15deg)", "rotate(-5deg)", "rotate(5deg)", "rotate(15deg)"][Math.floor(Math.random() * 4)];
        e.target.textContent = "ḭ̷̺̖͎̬̇̋̑͌́͂͋̌͋̎̓̊̊̽͜͠ ̴̧͍̼̪̋͂̊̑͊̏̓̈́̃̊͂̚̚͝͠w̶̬̪̾̆͘ä̵̠͎̗́̊̓̕ŗ̴̡̡̗̭̝̲̤͍̤͕̋ń̴̫͉͖̯̣͔͈̻͚̠̯͂̐̅́̎́̒̽͊̾̓̓͝e̴̡̢̫̫̗̗͎͎̠̥̥̫͕̱̹͐̈́̂̅͌ḑ̸͇̤͓̫̬̼̻̫͎͙͕͈̒̊͊̿̽̂̐́́̃̀̐́͝ͅ ̷͖̝̦̇͒̎̈́̃͐͛́͊̓̕͜͜͝y̴̧̡͓͍̾͗̀̂͜o̶̤͕̩̟̹͛̓̎̄̓͊̎̈͘̚͜͜͝͠ů̴̗̦̭̐̒̕";
      });
    });
  }, 200);
}
