import React, {Component} from 'react';
import {connect} from 'react-redux';
import {I18n} from 'react-i18nify';
import Panel from '../../components/Panel/Panel';
import PanelHead from '../../components/Panel/PanelHead';
import PanelBody from '../../components/Panel/PanelBody';
import Glyphicon from '../../components/Glyphicon/Glyphicon';

import {getCalculatedData, getStatistics} from '../../state/selectors'

class ResultData extends Component {
    renderStats() {
        const {statistics} = this.props;
        return (
            <div id="stats" className="row space-below">
                <div className="col-md-12">
                    <p>
                        <span>
                            {I18n.t('division.wasteSumInMeters', { waste: statistics.wasteSumInMeters})}
                        </span>
                    </p>
                    <p>
                        <span>
                            {I18n.t('division.referenceElementsNeeded', {count: statistics.countSum})}
                        </span>
                    </p>
                    <p>
                        <span>
                            {I18n.t('division.materialSumInMeters', { material: statistics.materialSumInMeters})}
                        </span>
                    </p>
                </div>
            </div>
        );
    }

    renderResults() {
        const {calculatedData} = this.props;

        return (
            <div>
                {this.renderStats()}
                <div className="row space-below">
                    <div className="col-md-12">
                        <button className="btn btn-default" type="button">
                            <Glyphicon type="copy" />
                            <span>{I18n.t('division.copy')}</span>
                        </button>
                    </div>
                </div>
                <div className="row space-below">
                    <div className="col-md-12">
                        <table id="resultTable" className="table table-striped">
                            <thead>
                                <tr>
                                    <th>{I18n.t('division.pattern')}</th>
                                    <th>{I18n.t('division.amount')}</th>
                                    <th>{I18n.t('division.waste')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calculatedData.map((pattern, index) => {
                                    return (
                                        <tr key={`calculated-data-${index}`}>
                                            <td>{pattern.elements.join(', ')}</td>
                                            <td>{pattern.count}</td>
                                            <td>{`${pattern.waste} mm`}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {calculatedData} = this.props;

        return (
            <div className="row">
                <div className="col-md-12">
                    <Panel>
                        <PanelHead>
                            <Glyphicon type="log-out"/>&nbsp;
                            <span>{I18n.t('division.result')}</span> 
                        </PanelHead>
                        <PanelBody>
                            {calculatedData ? this.renderResults() : null}
                        </PanelBody>
                    </Panel>
                </div>
            </div> 
        )
    }
}

const mapStateToProps = (state) => ({
    calculatedData: getCalculatedData(state),
    statistics: getStatistics(state)
});

export default connect(mapStateToProps)(ResultData);

