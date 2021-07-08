import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn,signOut } from '../actions';

export class GoogleAuth extends Component {
    
    componentDidMount(){
        window.gapi.load('client:auth2',() =>{
            window.gapi.client.init({
                clientId : '419908297621-gg139qqmsd71f2t6cf18ajj9heihqvdg.apps.googleusercontent.com',
                scope : 'email',
            }).then(() =>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }
    onAuthChange(isSignedIn){
        if (isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId())
        }
        else{
            this.props.signOut()
        }
    }

    onSignInClick = () =>{
        this.auth.signIn()
    }

    onSignOutClick = () =>{
        this.auth.signOut()
    }

    renderAuthButton (){
        if (this.props.isSignedIn === null ) {
            return null
        } else if (this.props.isSignedIn){
            return (
                <button onClick={this.onSignOutClick} className='ui red button google'>
                    <i className='google icon' />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className='ui green button google'>
                    <i className='google icon' />
                    Sign In With Google
                </button>
            );
        }
    }
    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return { isSignedIn : state.auth.isSignedIn}
}

export default connect(mapStateToProps,{ signIn, signOut })(GoogleAuth);
