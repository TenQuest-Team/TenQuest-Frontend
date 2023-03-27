export default function HomePage({ $target }){
    const $home = document.createElement('div');

    this.render = () => {
       $home.innerHTML = `
                <ul>
                    <li>
                      <a class="link" href="/login">login</a>
                    </li>
                    <li>
                      <a class="link" href="/templates">view templates</a>
                    </li>
                    <li>
                      <a class="link" href="/template/preset">view presets</a>
                    </li>
                    <li>
                      <a class="link" href="/createNewTemplate">create own template</a>
                    </li>
                    <li>
                      <a class="link" href="/template/a5728d0730284a949a9273140b858f96">view answers</a>
                    </li>
                    <li>
                      <a class="link" href="/findID">find ID</a>
                    </li>
                    <li>
                      <a class="link" href="/findPW">find PW</a>
                    </li>
                    <li>
                      <a class="link" href="/signUp">sign Up</a>
                    </li>
                </ul>
            `

            $target.appendChild($home);
        
    }
}

function clickE({href}) {
  return `location.href='${href}'`;
}