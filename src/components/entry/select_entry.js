import React from 'react';
import {Button, Col, Container, Row, Image, Tabs, Tab} from 'react-bootstrap'
import { FaHistory, FaAlignLeft, FaKey, FaFolderPlus, FaFolderOpen } from 'react-icons/fa'


import {open_wallet_util} from "../../utils/wallet_creation";
import {purchase_offer} from "../../utils/wallet_actions";

import {save_twm_file, open_twm_file} from "../../utils/twm_actions";
import copy from "copy-to-clipboard";
const os = window.require('os');
const fs = window.require('fs').promises;
const libPath = window.require('path');
const crypto = window.require('crypto');
var walley;
const WALLET_FILENAME = 'safexwallet.dat';
const DEFAULT_WALLET_PATH = libPath.resolve(os.homedir(), WALLET_FILENAME);


async function read_legacy_wallet(wallet_path) {
    try {
        return await fs.readFile(wallet_path);
    } catch (err) {
        let error = {};
        error.e = err;
        error.error = "error at loading the wallet file";
        return error;
    }
}

export default class SelectEntry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            legacy_wallet: '',
            legacy_detected: false
        };
    }

    async componentDidMount() {
        try {
            localStorage.clear();
            let wallet = await read_legacy_wallet(DEFAULT_WALLET_PATH);

            //if there is an error loading the file, perhaps it doesn't exist
            if (wallet.e) {
                console.log("legacy wallet was not found");
            } else {
                this.setState({legacy_wallet: wallet, legacy_detected: true});
            }
        } catch (err) {
            console.error(err);
            console.error("error at reading legacy wallet");
        }
    };



    open_existing = (e) => {
        e.preventDefault();
        this.props.history.push({pathname: '/open_wallet'});
    };

    create_new = (e) => {
        e.preventDefault();
        this.props.history.push({pathname: '/create_wallet'});
    };

    restore_keys = (e) => {
        e.preventDefault();
        this.props.history.push({pathname: '/recover_keys'});
    };

    seed_phrase = (e) => {
        e.preventDefault();
        this.props.history.push({pathname: '/recover_seed'});
    };

    restore_legacy = (e) => {
        e.preventDefault();
        this.props.history.push({pathname: '/', state: {legacy_wallet: this.state.legacy_wallet}});
    };

    render() {
        return (
            <div className="width100 height100 d-flex flex-column text-center">

                <Container className="height100 flex-column p-5 d-flex justify-content-center">
                    <Row className="row justify-content-md-center justify-content-center p-3">
                        <Image className="entry-image align-content-center mb-5" src={require("./../../img/safex-logo.png")}/>
                    </Row>
                    <Row className="row justify-content-md-center justify-content-center p-3">
                        <p>

                            This wallet is for testing Stagenet 3, December 11, 2020 ONLY USE THIS WALLET FOR TESTING
                        </p>
                        </Row>
                    <Row className="row justify-content-md-center justify-content-center p-3">
                        <Col sm={6}>
                            <Button onClick={this.open_existing} className="font-size-medium" variant="primary" size="lg" block>
                                <FaFolderOpen className="mr-3"/>
                                Open Existing
                            </Button>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center font-size-medium justify-content-center p-3">
                        <Col sm={6}>
                            <Button onClick={this.create_new} className="font-size-medium" variant="primary" size="lg" block>
                                <FaFolderPlus className="mr-3"/>
                                Create New
                            </Button>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center justify-content-center p-3">
                        <Col sm={6}>
                            <Button onClick={this.restore_keys} className="font-size-medium" variant="primary" size="lg" block>
                                <FaKey className="mr-3"/>
                                Recover From Keys
                            </Button>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center justify-content-center p-3">
                        <Col sm={6}>
                            <Button onClick={this.seed_phrase} className="font-size-medium" variant="primary" size="lg" block>
                                <FaAlignLeft className="mr-3"/>
                                Recover From Seed Phrase
                            </Button>
                        </Col>
                    </Row>

                    {this.state.legacy_detected ? (
                        <Row className="justify-content-md-center justify-content-center p-3">
                            <Col sm={5}>
                                <Button onClick={this.restore_legacy} className="font-size-medium" variant="warning" size="lg" block>
                                    <FaHistory className="mr-3"/>
                                    Open Legacy Wallet
                                </Button>
                            </Col>
                        </Row>) : (<div></div>)
                    }
                </Container>
            </div>);
    }
}
