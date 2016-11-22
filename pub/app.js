(function() {
    function loadData()
    {
        return fetch('/gallery-data.json').then(res => res.json());
    }

    function app()
    {
        loadData()
            .then(buildGallery)
            .then(element => ReactDOM.render(element, document.querySelector("#mainContainer")));
    }

    window.addEventListener('load', app);
})();


