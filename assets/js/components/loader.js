function loader() {
    window.addEventListener('load', function (){
        const loader = this.document.querySelector('.loader')
        loader.classList.add('loader__hidden')
    })
}

export default loader