import React, {Component} from 'react';
import {I18n} from 'react-i18nify';
import {connect} from 'react-redux';
import {getReferenceLength} from '../../state/selectors';
import {changeReferenceLength} from '../../state/actions';

import Panel from '../../components/Panel/Panel';
import PanelHead from '../../components/Panel/PanelHead';
import PanelBody from '../../components/Panel/PanelBody';
import Glyphicon from '../../components/Glyphicon/Glyphicon';

class Configuration extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange({target}) {
        const newValue = Number(target.value);
        this.props.changeReferenceLength(newValue);
    }

    render() {
        const {referenceLength} = this.props;

        return (
            <div className="row">
                <div className="col-md-12">
                    <Panel>
                        <PanelHead>
                            <Glyphicon type="cog" />&nbsp;
                            <span>{I18n.t('division.configuration')}</span> 
                        </PanelHead>
                        <PanelBody>
                            <div className="form-inline">
                                <div className="form-group col-md-5">
                                    <label htmlFor="referenceLength" className="control-label">
                                        {I18n.t('division.referenceElementLength')}&nbsp;
                                    </label>
                                    <div className="input-group">
                                        <input id="referenceLength"
                                            onChange={this.onChange}
                                            value={referenceLength}
                                            className="form-control"
                                            type="number" 
                                            min="0" 
                                            step="100"/> 
                                        <span className="input-group-addon">mm</span>
                                    </div>
                                </div>
                            </div>
                        </PanelBody>
                    </Panel>
                </div>
            </div>
        );
    }
} 

const mapStateToProps = (state) => ({
    referenceLength: getReferenceLength(state)
});

const mapDispatchToProps = {
    changeReferenceLength
};

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);