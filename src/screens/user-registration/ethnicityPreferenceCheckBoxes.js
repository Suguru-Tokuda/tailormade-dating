import React, { Component } from 'react';
import { Button } from 'react-native';
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Right, Left } from 'native-base';
import { setEthnicityPrefIDs } from './actions';
import { connect } from 'react-redux';

class EthnicityPreferencesCheckBoxes extends Component {
    state = {
        ethnicities: [],
        selectedEthnicityIDs: []
    };

    constructor(props) {
        super(props);
        const { selectedEthnicityIDs, ethnicities } = props.route.params;
        this.state.selectedEthnicityIDs = selectedEthnicityIDs;
        this.state.ethnicities = ethnicities;
        for (let i = 0, max = this.state.ethnicities.length; i < max; i++) {
            this.state.ethnicities[i].checked = selectedEthnicityIDs.indexOf(this.state.ethnicities[i].ethnicityID) !== -1;
        }
    }

    handleCheckboxChanged = (index) => {
        const { ethnicities } = this.state;
        ethnicities[index].checked = !ethnicities[index].checked;
        this.setState({ ethnicities });
    }

    handleDoneBtnPressed = () => {
        const ethnicityPrefIDs = [];
        const { ethnicities } = this.state;
        ethnicities.forEach(ethnicity => {
            if (ethnicity.checked === true)
                ethnicityPrefIDs.push(ethnicity.ethnicityID);
        });
        console.log(ethnicityPrefIDs);
        this.props.dispatch(setEthnicityPrefIDs(ethnicityPrefIDs));
        this.props.navigation.goBack();
    }

    getCheckBoxes() {
        const { ethnicities } = this.state;
        if (ethnicities.length > 0) {
            return ethnicities.map((ethnicity, i) => {
                return (
                    <ListItem key={ethnicity.ethnicityID} onPress={() => this.handleCheckboxChanged(i)}>
                        <CheckBox checked={ethnicity.checked} color='purple' />
                        <Body>
                            <Text>{ethnicity.label}</Text>
                        </Body>
                    </ListItem>
                );
            });
        }
        return null;
    }

    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button title="Cancel" onPress={() => navigation.goBack()} />
                    </Left>
                    <Right>
                        <Button title="Done" onPress={this.handleDoneBtnPressed}/>
                    </Right>
                </Header>
                <Content>
                    {this.getCheckBoxes()}
                </Content>
            </Container>
        );
    }
}

export default connect()(EthnicityPreferencesCheckBoxes);