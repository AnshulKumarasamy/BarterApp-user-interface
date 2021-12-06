import * as React from 'react';
import { StyleSheet, Modal, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      confirmPassword: '',
      isModalVisible: 'false',
      firstName: '',
      lastName: '',
      address: '',
      contact: '',
    }
  }

  userSignUp = (emailId, password, confirmPassword) => {

    if (password !== confirmPassword) {
      return Alert.alert("Password does not match\nCheck your password")
    } else {
      firebase.auth().createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection('users').add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            contact: this.state.contact,
            address: this.state.address,
            email_Id: this.state.emailId
          })
          return Alert.alert(
            "User added successfully",
            '',
            [
              { text: 'Ok', onPress: () => this.setState({ "isModalVisible": false }) }
            ]
          )
        })
        .catch((error) => {
          var errorcode = error.code;
          var errormessage = error.message;
          return Alert.alert(errormessage);
        })
    }
  }

  userLogin = (emailId, password) => {
    firebase.auth().signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate('DonateItem')
      })
      .catch(function (error) {
        var errorcode = error.code;
        var errormessage = error.message;
        return Alert.alert(errormessage);
      })
  }


  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={"First Name"}
                maxLength={12}
                onChangeText={(text) => {
                  this.setState({
                    firstName: text
                  })
                }}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={"Last Name"}
                maxLength={12}
                onChangeText={(text) => {
                  this.setState({
                    lastName: text
                  })
                }}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={"Contact"}
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({
                    contact: text
                  })
                }}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={"Address"}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    address: text
                  })
                }}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={"Email"}
                keyboardType={"email-address"}
                onChangeText={(text) => {
                  this.setState({
                    emailId: text
                  })
                }}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={"Password"}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text
                  })
                }}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={"Confirm Password"}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text
                  })
                }}
              />

              <View style={styles.modalBackButton}>
                <TouchableOpacity style={styles.registerButton}
                  onPress={() => {
                    this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                  }}>
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.modalBackButton}>
                <TouchableOpacity style={styles.cancelButton}
                  onPress={() => this.setState({ "isModalVisible": false })}>
                  <Text style={{ color: '#ff5722' }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>

        </View>
        {
          this.showModal()
        }
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.title}>Barter App</Text>
        </View>
        <View>
          <TextInput
            style={styles.loginBox}
            placeholder="abc@example.com"
            keyboardType='email-address'
            onChangeText={(text) => {
              this.setState({
                emailId: text
              })
            }}
          />

          <TextInput
            style={styles.loginBox}
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                password: text
              })
            }}
          />

          <TouchableOpacity
            style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
            onPress={() => {
              this.userLogin(this.state.emailId, this.state.password)
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ isModalVisible: true })}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8BE85',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(65),
    fontWeight: '300',
    paddingBottom: RFValue(30),
    color: '#ff3d00'
  },
  loginBox: {
    width: '80%',
    height: RFValue(40),
    borderBottomWidth: 1.5,
    borderColor: '#ff8a65',
    fontSize: RFValue(20),
    margin: RFValue(10),
    paddingLeft: RFValue(10)
  },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: RFValue(30),
    color: '#ff5722',
    margin: RFValue(50)
  },
  modalContainer: {
    flex: 1,
    borderRadius: RFValue(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffff",
    marginRight: RFValue(30),
    marginLeft: RFValue(30),
    marginTop: RFValue(80),
    marginBottom: RFValue(80),
  },
  formTextInput: {
    width: "75%",
    height: RFValue(35),
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: RFValue(10),
    borderWidth: RFValue(1),
    marginTop: RFValue(20),
    padding: RFValue(10)
  },
  registerButton: {
    width: '75%',
    height: RFValue(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    marginTop: RFValue(30)
  },
  registerButtonText: {
    color: '#ff5722',
    fontSize: RFValue(15),
    fontWeight: 'bold'
  },
  cancelButton: {
    width: '75%',
    height: RFValue(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(5),
  },

  button: {
    width: '80%',
    height: RFValue(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(25),
    backgroundColor: "#ff9800",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
    padding: RFValue(10)
  },
  buttonText: {
    color: '#ffff',
    fontWeight: '200',
    fontSize: RFValue(20)
  }
})