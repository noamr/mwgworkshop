(function() {
    function loadData()
    {
        return fetch('/gallery-data.json').then(res => res.json());
    }

    const isNaive = location.search === '?naive';

    const buildGallery = isNaive ? buildGalleryNaive : buildGalleryFast;

    function app()
    {
        loadData()
            .then(buildGallery)
            .then(element => ReactDOM.render(element, document.querySelector("#mainContainer")));
    }

    window.addEventListener('load', app);
})();


