import React, { useState } from 'react';
const tatalKeyArray = ['confirmed', 'recovered', 'deaths'];
const ListView = (props) => {
    const [selectedStatus, setSelectesStatus] = useState(false);
    const { locationArray, selected, onSelected, onDeSelected, onSelectedKey } = props;
    const Click = (id) => {
        if (selected == null) {
            onSelected(id)
        }
        else if (selected.id !== id) {
            onSelected(id)
        }
        else {
            onDeSelected();
        }
    }
    const onSelectedKeyAll = (key) => {
        onSelectedKey(key)
        setSelectesStatus(state => !state);
    }
    const totalElements = tatalKeyArray.map((key, index) => {
        const sum = locationArray.reduce((sum, location) => {
            return sum + location.latest[key];
        }, 0)
        const ScssStyle = 'list-view-location'
        return (
            <div key={index} className={`${ScssStyle}`}>
                <div className="columns">
                    <div className="column" onClick={() => onSelectedKeyAll(key)}>
                        <h6 className="title is-6">{key === 'confirmed' && <p className="confirmed">CONFIRMED</p>}{key === 'recovered' && <p className="recovered">RECOVERED</p>}{key === 'deaths' && <p className="deaths">DEATHS</p>}</h6>
                    </div>
                    <div className="column">
                        <p className="is=6 has-text-right">{sum !== 0 ? `${sum} คน` : 'Api has problem'}</p>
                    </div>
                </div>
            </div>
        )
    })
    const locationElements = locationArray.map(location => {
        const {
            id, country_code,
            country, province,
            latest: { confirmed }
        } = location;
        let title = country;
        if (province !== '' && province !== country) {
            title = `${province}, ${country}`;
        }
        let locationClass = 'list-view-location';
        if (selected !== null) {
            if (location.id === selected.id) {
                locationClass += ' selected'
            }
        }
        return (
            <div key={`${id}-${country_code}`} onClick={() => Click(id)} className={locationClass}>
                <div className="columns">
                    <div className="column">
                        <h6 className="title is-6">{title}</h6>
                    </div>
                    <div className="column">
                        <p className="is-6 has-text-right">{`${confirmed} คน`}</p>
                    </div>
                </div>
            </div>
        );
    });
    return (
        <div className="list-view">
            <div className="list-view-brand">
                <img src="https://www.computing.psu.ac.th/th/wp-content/uploads/2018/03/PSU_CoC_ENG.png" width="300px" />
            </div>
            <div className="list-view-total">
                <h2 className="title is-4">STATUS</h2>
                {totalElements}
            </div>
            <div className="d-flex justify-content-between">
                <strong>Country</strong>
                <strong className="margin-r">Count</strong>
            </div>
            <div className="list-view-locations">
                {locationElements}
            </div>
        </div>
    )
}
export default ListView;