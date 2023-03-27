export default function HomePage({ $target }){
    const $home = document.createElement('div');

    this.render = () => {
       $home.innerHTML = `
                <ul>
                    <li>
                      <a class="link" href="/login">login</a>
                    </li>
                    <li>
                      <button class="link" data-href="/login" }>login</button>
                </ul>
            `

            $target.appendChild($home);
        
    }
}

function clickE({href}) {
  return `location.href='${href}'`;
}