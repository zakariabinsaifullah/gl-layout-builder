const gmapMap = props => {
    const { location, zoom, type, className } = props;
    const gmapurl = 'https://maps.google.com/maps';

    // Check if type is provided and valid, otherwise default to 'roadmap'
    const mapType = type && ['roadmap', 'satellite', 'terrain', 'hybrid'].includes(type) ? type : 'roadmap';

    // Map the type to the correct Google Maps parameter value
    const getMapTypeParam = type => {
        switch (type) {
            case 'satellite':
                return 'k'; // satellite view
            case 'terrain':
                return 'p'; // terrain view
            case 'hybrid':
                return 'h'; // hybrid view
            case 'roadmap':
            default:
                return 'roadmap'; // roadmap/standard view
        }
    };

    const params = new URLSearchParams({
        q: location,
        z: zoom || 1,
        t: getMapTypeParam(mapType),
        output: 'embed'
    });

    const src = gmapurl + '?' + params.toString();
    return <iframe src={src} className={className} title={location}></iframe>;
};

export default gmapMap;
