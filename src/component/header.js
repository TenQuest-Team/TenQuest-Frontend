export default function Header({ $target }){
    const $header = document.createElement('div');
    $header.class = 'header'
    const $h1 = document.createElement("h1");
    $h1.id = "title";
    $h1.textContent = "Ten Quest";

    $header.appendChild($h1);

    this.render = () => {
        $target.appendChild($header);
    }

    this.render();
}

