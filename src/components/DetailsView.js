import React from 'react';
const tatalKeyArray = ['confirmed', 'recovered', 'deaths'];
const DetailsView = (props) => {
    const {
        location: { country, province, latest },
        onCLickClose
    } = props;
    let title = country.toUpperCase();
    if (province !== '' && province !== country) {
        title = `${province}, ${country}`;
        title = title.toUpperCase()
    }

    const totalElements = tatalKeyArray.map(key => {
        const count = latest[key];
        key = key.toUpperCase()
        return (
            <div key={key} className="list-view-location">
                <div className="columns">
                    <div className="column">
                        <h6 className="title is-6">{key}</h6>
                    </div>
                    <div className="column">
                        <p className="is=6 has-text-right">{count}</p>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div className="details-view">
            <div className="details-view-close" onClick={onCLickClose}>&times;</div>
            <div className="details-view-content">
                <h4 className="title is-4">{title}</h4>
                {totalElements}
            </div>
        </div>
    )
}
export default DetailsView;