const galleryComp = React.createClass({
    render() {
        return <div id="gallery" className="fast">
            {_.map(this.props.images, image => <img src={image.low_resolution.url}/>)}
        </div>
    }
});
