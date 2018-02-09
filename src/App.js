import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyC7C45DezVTeFNnC4YDa2_Luvs4i3jhmMU',
            authDomain: 'react-native-auth-a6180.firebaseapp.com',
            databaseURL: 'https://react-native-auth-a6180.firebaseio.com',
            projectId: 'react-native-auth-a6180',
            storageBucket: 'react-native-auth-a6180.appspot.com',
            messagingSenderId: '923900959359'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false});
            }
        });
    }

    renderContent() {
        switch( this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={ () => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                );
            case false:
                return <LoginForm />;
            default:
                return (
                    <CardSection>
                        <Spinner size='large' />
                    </CardSection>
                );
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                { this.renderContent() }
            </View>
        );
    }
}

export default App;
