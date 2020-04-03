import React from 'react';
const ListView = () => {
    return (
        <div className="list-view">
            <div className="list-view-brand">
                <img src="https://i.pinimg.com/originals/14/e5/13/14e513e4b3f04be4a1a235417e290701.png"/>
                <h2 className="title-is-4">MINI PROJECT COVID-19</h2>
            </div>
            <div className="list-view-totla">
                <h2 className="title is-4">LOADING...</h2>
                <div className="columns">
                    <div className="column">
                        {/* <h6 className="title is-6">Case</h6> */}
                    </div>
                    <div className="column">
                        {/* <p className="is=6 has-text-right">1234</p> */}
                    </div>
                </div>
            </div>
            <div className="list-view-locations">
                <div className="columns">
                    <div className="column">
                        {/* <h6 className="title is-6">Country</h6> */}
                    </div>
                    <div className="column">
                        {/* <p className="is-6 has-text-right">1234</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ListView;