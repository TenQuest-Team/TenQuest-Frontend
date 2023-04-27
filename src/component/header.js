export default function Header({ $target }){
    const $header = document.createElement('div');
    $header.className = 'header'

    const $beforeButton = document.createElement('button');
    $beforeButton.className = 'beforeButton';
    $beforeButton.innerText = '<'

    const $h1 = document.createElement("h1");
    $h1.className = "title";
    $h1.textContent = "Ten Quest";
    $header.appendChild($beforeButton);

    $header.appendChild($h1);
    
    this.render = () => {
        $target.appendChild($header);
    }

    this.render();

    $beforeButton.addEventListener('click', () => {
        history.back();
        return false;
    })
}

